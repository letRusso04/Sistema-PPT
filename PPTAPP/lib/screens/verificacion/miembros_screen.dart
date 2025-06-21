import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../providers/miembros_provider.dart';

class MiembrosScreen extends StatelessWidget {
  const MiembrosScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final miembros = context.watch<MiembrosProvider>().miembros;

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: miembros.length,
      itemBuilder: (_, i) {
        print(miembros[i]);
        return _MiembroCard(miembro: miembros[i]);
      },
    );
  }
}

class _MiembroCard extends StatelessWidget {
  final Miembro miembro;
  const _MiembroCard({required this.miembro});

  @override
  Widget build(BuildContext context) {
    final prov = context.read<MiembrosProvider>();

    return LayoutBuilder(
      builder: (ctx, c) {
        final bool vertical = c.maxWidth < 600;

        // ---- info widget sin Expanded por defecto
        final info = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(miembro.nombre,
                style:
                    const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
            Text('Rol: ${miembro.rol}'),
            Text('Estado: ${miembro.estado}'),
            Text('Ubicación: ${miembro.ubicacion}'),
            Text('Correo: ${miembro.correo}'),
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
                CircleAvatar(
                  radius: 32,
                  backgroundImage: AssetImage(miembro.foto),
                ),
                SizedBox(width: vertical ? 0 : 16, height: vertical ? 12 : 0),

                // 👉 solo expandimos en horizontal
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
                      onPressed: () {
                        /* TODO: diálogo de edición */
                      },
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
