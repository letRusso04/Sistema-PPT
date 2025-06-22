import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../providers/miembros_provider.dart';
import '../../../providers/verificacion_provider.dart';

class ValidarScreen extends StatefulWidget {
  const ValidarScreen({Key? key}) : super(key: key);

  @override
  State<ValidarScreen> createState() => _ValidarScreenState();
}

class _ValidarScreenState extends State<ValidarScreen> {
  @override
  void initState() {
    super.initState();
    _verificarRol();
    // Carga miembros sólo una vez al abrir la pantalla
    Future.microtask(() => context.read<MiembrosProvider>().fetchMiembros());
  }

  bool _esAdmin = false;
  Future<void> _verificarRol() async {
    final prefs = await SharedPreferences.getInstance();
    final rolInt = prefs.getInt('admin') ?? 0;
    if (mounted) setState(() => _esAdmin = rolInt == 1);
  }

  @override
  Widget build(BuildContext context) {
    final pendientes = context
        .watch<MiembrosProvider>()
        .miembros
        .where((m) => m.verificado == 0 && m.rol != '1') // Filtra admin
        .toList();

    if (pendientes.isEmpty) {
      return const Center(child: Text('No hay registros pendientes'));
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: pendientes.length,
      itemBuilder: (_, i) => _PendienteCard(
        miembro: pendientes[i],
        esAdmin: _esAdmin,
      ),
    );
  }
}

// ───────────────────────── Card de cada miembro ───────────────────────────
class _PendienteCard extends StatelessWidget {
  final Miembro miembro;
  final bool esAdmin;
  const _PendienteCard({required this.miembro, required this.esAdmin});

  @override
  Widget build(BuildContext context) {
    final verifProv = context.read<VerificacionProvider>();

    ImageProvider avatarProvider = (miembro.foto != 'false')
        ? NetworkImage(miembro.foto)
        : const AssetImage('assets/images/PPTLogo.png');

    return LayoutBuilder(
      builder: (ctx, c) {
        final vertical = c.maxWidth < 600;

        final info = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(miembro.nombre,
                style:
                    const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
            const Text('Permisos: Sin verificación'),
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
                CircleAvatar(radius: 32, backgroundImage: avatarProvider),
                SizedBox(width: vertical ? 0 : 16, height: vertical ? 12 : 0),
                vertical ? info : Expanded(child: info),
                SizedBox(width: vertical ? 0 : 16, height: vertical ? 12 : 0),

                // Botones solo si es administrador
                if (esAdmin)
                  Column(
                    crossAxisAlignment: vertical
                        ? CrossAxisAlignment.stretch
                        : CrossAxisAlignment.center,
                    children: [
                      ElevatedButton.icon(
                        icon: const Icon(Icons.check),
                        label: const Text('Aprobar'),
                        onPressed: () async {
                          final ok = await _confirm(
                              context, '¿Aprobar a ${miembro.nombre}?');
                          if (ok) verifProv.aprobar(miembro.id);
                        },
                      ),
                      const SizedBox(height: 8),
                      ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.red),
                        icon: const Icon(Icons.delete),
                        label: const Text('Rechazar'),
                        onPressed: () async {
                          final ok = await _confirm(context,
                              '¿Rechazar a ${miembro.nombre}? Esta acción es irreversible.');
                          if (ok) verifProv.rechazar(miembro.id);
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

  // Dialogo de confirmación reutilizable
  Future<bool> _confirm(BuildContext context, String mensaje) {
    return showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Confirmar'),
        content: Text(mensaje),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(context, false),
              child: const Text('Cancelar')),
          ElevatedButton(
              onPressed: () => Navigator.pop(context, true),
              child: const Text('Sí')),
        ],
      ),
    ).then((v) => v ?? false);
  }
}
