import 'package:admin/providers/verificacion_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../providers/miembros_provider.dart';

class MiembrosScreen extends StatefulWidget {
  const MiembrosScreen({Key? key}) : super(key: key);

  @override
  State<MiembrosScreen> createState() => _MiembrosScreenState();
}

class _MiembrosScreenState extends State<MiembrosScreen> {
  bool _cargando = true;

  @override
  void initState() {
    super.initState();
    _verificarRol();
    // Cargamos los miembros al entrar en la pantalla
    Future.microtask(() async {
      try {
        await context.read<MiembrosProvider>().fetchMiembros();
      } finally {
        if (mounted) setState(() => _cargando = false);
      }
    });
  }

  bool _esAdmin = false;

  Future<void> _verificarRol() async {
    final prefs = await SharedPreferences.getInstance();
    final rolInt = prefs.getInt('admin') ?? 0;
    if (mounted) setState(() => _esAdmin = rolInt == 1);
  }

  @override
  Widget build(BuildContext context) {
    final miembros = context.watch<MiembrosProvider>().miembros;

    if (_cargando) {
      return const Center(child: CircularProgressIndicator());
    }
    if (miembros.isEmpty) {
      return const Center(child: Text('No hay miembros registrados'));
    }
    print("valor de: $_esAdmin");
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: miembros.length,
      itemBuilder: (_, i) =>
          _MiembroCard(miembro: miembros[i], esAdmin: _esAdmin),
    );
  }
}

class _MiembroCard extends StatelessWidget {
  final Miembro miembro;
  const _MiembroCard({required this.miembro, required this.esAdmin});
  final bool esAdmin; // ← nuevo parámetro

  @override
  Widget build(BuildContext context) {
    final prov = context.read<MiembrosProvider>();
    final verifProv = context.read<VerificacionProvider>();

    if (miembro.verificado == 0) return const SizedBox.shrink();

    String rangoUsuario = switch (miembro.rol) {
      '1' => 'Administrador',
      _ => 'Usuario',
    };

    final avatar = (miembro.foto.isNotEmpty && miembro.foto != 'false')
        ? NetworkImage(miembro.foto)
        : const AssetImage('assets/images/PPTLogo.png') as ImageProvider;

    return LayoutBuilder(
      builder: (ctx, c) {
        final vertical = c.maxWidth < 600;

        final info = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(miembro.nombre,
                style:
                    const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
            Text('Rol: $rangoUsuario'),
            Text('Correo: ${miembro.correo}'),
            Text('Cédula: ${miembro.cedula}'),
            Text('Estado: ${miembro.estado}'),
            Text('Ubicación: ${miembro.ubicacion}'),
            Text('Teléfono: ${miembro.telefono}'),
          ],
        );
        return Card(
          margin: const EdgeInsets.only(bottom: 16),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Flex(
              direction: vertical ? Axis.vertical : Axis.horizontal,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(radius: 32, backgroundImage: avatar),
                SizedBox(width: vertical ? 0 : 16, height: vertical ? 12 : 0),
                vertical ? info : Expanded(child: info),
                SizedBox(width: vertical ? 0 : 16, height: vertical ? 12 : 0),

                // ─── Botones solo si es administrador ───
                if (esAdmin)
                  Column(
                    crossAxisAlignment: vertical
                        ? CrossAxisAlignment.stretch
                        : CrossAxisAlignment.center,
                    children: [
                      ElevatedButton.icon(
                        icon: const Icon(Icons.edit),
                        label: const Text('Actualizar'),
                        onPressed: () => _editarMiembro(context, miembro, prov),
                      ),
                      const SizedBox(height: 8),
                      ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.red),
                        icon: const Icon(Icons.delete),
                        label: const Text('Eliminar'),
                        onPressed: () async {
                          final ok = await _confirm(context,
                              '¿Eliminar a ${miembro.nombre}? Esta acción no se puede deshacer.');
                          if (ok) {
                            await verifProv.rechazar(miembro.id);
                            prov.eliminar(miembro.id);
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                  content: Text('${miembro.nombre} eliminado')),
                            );
                          }
                        },
                      ),
                    ],
                  ),
              ],
            ),
          ),
        );
      },
    );
  }

  /* ───────────── DIÁLOGO DE EDICIÓN ───────────── */
  Future<void> _editarMiembro(
      BuildContext ctx, Miembro original, MiembrosProvider prov) async {
    final formKey = GlobalKey<FormState>();

    // Controllers
    final correoCtrl = TextEditingController(text: original.correo);
    final cedulaCtrl = TextEditingController(text: original.cedula);
    final ubicacionCtrl = TextEditingController(text: original.ubicacion);
    final telefonoCtrl = TextEditingController(text: original.telefono);

    String rolSeleccionado = original.rol; // '0' / '1'
    String estadoSeleccionado = original.estado.isNotEmpty
        ? original.estado
        : estadosVenezuela[0]; // valor inicial para estado

    final saved = await showDialog<bool>(
      context: ctx,
      builder: (_) => StatefulBuilder(
        builder: (context, setSB) => AlertDialog(
          title: Text('Editar ${original.nombre}'),
          content: Form(
            key: formKey,
            autovalidateMode: AutovalidateMode.onUserInteraction,
            child: SingleChildScrollView(
              child: Column(
                children: [
                  DropdownButtonFormField<String>(
                    value: rolSeleccionado,
                    decoration: const InputDecoration(
                        labelText: 'Rol', border: OutlineInputBorder()),
                    items: const [
                      DropdownMenuItem(value: '0', child: Text('Usuario')),
                      DropdownMenuItem(
                          value: '1', child: Text('Administrador')),
                    ],
                    onChanged: (v) => setSB(() => rolSeleccionado = v ?? '0'),
                  ),
                  const SizedBox(height: 8),
                  DropdownButtonFormField<String>(
                    value: estadoSeleccionado,
                    decoration: const InputDecoration(
                        labelText: 'Estado', border: OutlineInputBorder()),
                    items: estadosVenezuela
                        .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                        .toList(),
                    onChanged: (v) => setSB(
                        () => estadoSeleccionado = v ?? estadosVenezuela[0]),
                  ),
                  const SizedBox(height: 8),
                  _campo('Correo', correoCtrl,
                      validator: (v) =>
                          RegExp(r'^[\w-.]+@[\w-.]+\.[a-zA-Z]{2,4}$')
                                  .hasMatch(v ?? '')
                              ? null
                              : 'Correo inválido'),
                  _campo('Cédula', cedulaCtrl,
                      validator: (v) => RegExp(r'^[0-9]+$').hasMatch(v ?? '')
                          ? null
                          : 'Solo dígitos'),
                  _campo('Ubicación', ubicacionCtrl),
                  _campo('Teléfono', telefonoCtrl,
                      validator: (v) => RegExp(r'^[0-9]+$').hasMatch(v ?? '')
                          ? null
                          : 'Solo dígitos'),
                ],
              ),
            ),
          ),
          actions: [
            TextButton(
                onPressed: () => Navigator.pop(context, false),
                child: const Text('Cancelar')),
            ElevatedButton(
                onPressed: () {
                  if (formKey.currentState!.validate()) {
                    Navigator.pop(context, true);
                  } else {
                    setSB(() {});
                  }
                },
                child: const Text('Guardar')),
          ],
        ),
      ),
    );

    if (saved == true) {
      final actualizado = original.copyWith(
        rol: rolSeleccionado,
        correo: correoCtrl.text.trim(),
        cedula: cedulaCtrl.text.trim(),
        estado: estadoSeleccionado,
        ubicacion: ubicacionCtrl.text.trim(),
        telefono: telefonoCtrl.text.trim(),
      );

      try {
        await prov.actualizarRemote(actualizado);
        ScaffoldMessenger.of(ctx).showSnackBar(
          const SnackBar(content: Text('Datos actualizados')),
        );
      } catch (e) {
        ScaffoldMessenger.of(ctx).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: Colors.red),
        );
      }
    }
  }

  Widget _campo(String label, TextEditingController c,
      {String? Function(String?)? validator}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: TextFormField(
        controller: c,
        decoration: InputDecoration(
            labelText: label, border: const OutlineInputBorder()),
        validator: validator,
      ),
    );
  }

// Lista de estados de Venezuela
  static List<String> estadosVenezuela = [
    'Amazonas',
    'Anzoátegui',
    'Apure',
    'Aragua',
    'Barinas',
    'Bolívar',
    'Carabobo',
    'Cojedes',
    'Delta Amacuro',
    'Falcón',
    'Guárico',
    'Lara',
    'Mérida',
    'Miranda',
    'Monagas',
    'Nueva Esparta',
    'Portuguesa',
    'Sucre',
    'Táchira',
    'Trujillo',
    'Vargas',
    'Yaracuy',
    'Zulia',
    'Distrito Capital',
  ];

  /* ───────────── DIÁLOGO CONFIRMACIÓN ───────────── */
  Future<bool> _confirm(BuildContext context, String msg) async {
    return showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Confirmar'),
        content: Text(msg),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(_, false),
              child: const Text('Cancelar')),
          ElevatedButton(
              onPressed: () => Navigator.pop(_, true), child: const Text('Sí')),
        ],
      ),
    ).then((v) => v ?? false);
  }
}
