import 'package:admin/providers/verificacion_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../providers/miembros_provider.dart';
import 'package:provider/provider.dart';

class ValidarScreen extends StatefulWidget {
  const ValidarScreen({Key? key}) : super(key: key);

  @override
  State<ValidarScreen> createState() => _ValidarScreenState();
}

class _ValidarScreenState extends State<ValidarScreen> {
  @override
  void initState() {
    super.initState();
    // Carga miembros solo 1 vez al iniciar la pantalla
    Provider.of<MiembrosProvider>(context, listen: false).fetchMiembros();
  }

  @override
  Widget build(BuildContext context) {
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
    final verifProv = context.read<VerificacionProvider>();

    return LayoutBuilder(
      builder: (ctx, c) {
        final bool vertical = c.maxWidth < 600;

        final info = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(miembro.nombre,
                style:
                    const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
            Text('Permisos: Sin verificar'),
            Text('Correo: ${miembro.correo}'),
            Text('Cédula: ${miembro.cedula}'),
            Text('Estado: ${miembro.estado}'),
            Text('Ubicacion: ${miembro.ubicacion}'),
            Text('Telefono: ${miembro.telefono}'),
          ],
        );
        ImageProvider avatarProvider;
        print("datalist ${miembro.foto}");
        if (miembro.foto != 'false') {
          avatarProvider = NetworkImage('${miembro.foto}'); // URL API
        } else {
          avatarProvider = const AssetImage('assets/images/PPTLogo.png');
        }
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
                Column(
                  crossAxisAlignment: vertical
                      ? CrossAxisAlignment.stretch
                      : CrossAxisAlignment.center,
                  children: [
                    ElevatedButton.icon(
                      icon: const Icon(Icons.check),
                      label: const Text('Aprobar'),
                      onPressed: () => verifProv.aprobar(miembro.id),
                    ),
                    const SizedBox(height: 8),
                    ElevatedButton.icon(
                      style:
                          ElevatedButton.styleFrom(backgroundColor: Colors.red),
                      icon: const Icon(Icons.delete),
                      label: const Text('Rechazar'),
                      onPressed: () => verifProv.rechazar(miembro.id),
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
