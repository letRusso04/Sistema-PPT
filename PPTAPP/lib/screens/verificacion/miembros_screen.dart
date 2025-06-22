import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
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
    // Cargamos los miembros al entrar en la pantalla
    Future.microtask(() async {
      try {
        await context.read<MiembrosProvider>().fetchMiembros();
      } finally {
        if (mounted) setState(() => _cargando = false);
      }
    });
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

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: miembros.length,
      itemBuilder: (_, i) => _MiembroCard(miembro: miembros[i]),
    );
  }
}

// ───────────────────────── Card de cada miembro ───────────────────────────
class _MiembroCard extends StatelessWidget {
  final Miembro miembro;
  const _MiembroCard({required this.miembro});

  @override
  Widget build(BuildContext context) {
    final prov = context.read<MiembrosProvider>();

    return LayoutBuilder(
      builder: (ctx, c) {
        final bool vertical = c.maxWidth < 600;

        final info = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(miembro.nombre,
                style:
                    const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
            Text('Rol: ${miembro.rol}'),
            Text('Correo: ${miembro.correo}'),
            Text('Cédula: ${miembro.cedula}'),
            Text('Estado: ${miembro.estado}'),
            Text('Ubicacion: ${miembro.ubicacion}'),
            Text('Telefono: ${miembro.telefono}'),
          ],
        );

        ImageProvider avatar;
        if (miembro.foto.isNotEmpty && miembro.foto != 'false') {
          avatar = NetworkImage(miembro.foto); // URL devuelta por la API
        } else {
          avatar = const AssetImage('assets/images/PPTLogo.png');
        }

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
                Column(
                  crossAxisAlignment: vertical
                      ? CrossAxisAlignment.stretch
                      : CrossAxisAlignment.center,
                  children: [
                    ElevatedButton.icon(
                      icon: const Icon(Icons.edit),
                      label: const Text('Actualizar'),
                      onPressed: () {},
                    ),
                    const SizedBox(height: 8),
                    ElevatedButton.icon(
                      style:
                          ElevatedButton.styleFrom(backgroundColor: Colors.red),
                      icon: const Icon(Icons.delete),
                      label: const Text('Eliminar'),
                      onPressed: () => prov.eliminar(miembro.id),
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
}
