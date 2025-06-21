import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../providers/miembros_provider.dart';

class ValidarScreen extends StatelessWidget {
  const ValidarScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Filtramos solo no‑verificados
    final pendientes = context
        .watch<MiembrosProvider>()
        .miembros
        .where((m) => !m.verificado)
        .toList();

    if (pendientes.isEmpty) {
      return const Center(child: Text('No hay registros pendientes'));
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: pendientes.length,
      itemBuilder: (_, i) => _PendienteCard(miembro: pendientes[i]),
    );
  }
}

class _PendienteCard extends StatelessWidget {
  final Miembro miembro;
  const _PendienteCard({required this.miembro});

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
                    radius: 32, backgroundImage: AssetImage(miembro.foto)),
                SizedBox(width: vertical ? 0 : 16, height: vertical ? 12 : 0),
                vertical ? info : Expanded(child: info),
                SizedBox(width: vertical ? 0 : 16, height: vertical ? 12 : 0),
                Column(
                  crossAxisAlignment: vertical
                      ? CrossAxisAlignment.stretch
                      : CrossAxisAlignment.center,
                  children: [
                    ElevatedButton.icon(
                      icon: const Icon(Icons.check),
                      label: const Text('Aprobar'),
                      onPressed: () {
                        prov.actualizar(
                          Miembro(
                            id: miembro.id,
                            nombre: miembro.nombre,
                            foto: miembro.foto,
                            rol: miembro.rol,
                            estado: miembro.estado,
                            ubicacion: miembro.ubicacion,
                            correo: miembro.correo,
                            telefono: miembro.telefono,
                            verificado: true,
                          ),
                        );
                      },
                    ),
                    const SizedBox(height: 8),
                    ElevatedButton.icon(
                      style:
                          ElevatedButton.styleFrom(backgroundColor: Colors.red),
                      icon: const Icon(Icons.delete),
                      label: const Text('Rechazar'),
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
