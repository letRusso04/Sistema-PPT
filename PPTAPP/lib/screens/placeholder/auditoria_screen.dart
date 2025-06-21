import 'package:flutter/material.dart';

class LogEntry {
  final String usuario;
  final String accion; // Ejemplo: 'Aprobó usuario', 'Eliminó publicación', etc.
  final String detalle;
  final DateTime fecha;

  LogEntry({
    required this.usuario,
    required this.accion,
    required this.detalle,
    required this.fecha,
  });
}

// Datos de prueba para mostrar
final List<LogEntry> logsEjemplo = [
  LogEntry(
    usuario: 'Desarrollador del sistema PPT',
    accion: 'Aprobó usuario',
    detalle: 'Usuario: Juan Pérez, C.I. 12345678',
    fecha: DateTime.now().subtract(const Duration(hours: 1)),
  ),
  LogEntry(
    usuario: 'Desarrollador del sistema PPT',
    accion: 'Eliminó publicación',
    detalle: 'Publicación ID: 3456',
    fecha: DateTime.now().subtract(const Duration(days: 1, hours: 3)),
  ),
  LogEntry(
    usuario: 'Administrador',
    accion: 'Actualizó usuario',
    detalle: 'Usuario: María Gómez, rol cambiado a Moderador',
    fecha: DateTime.now().subtract(const Duration(days: 2)),
  ),
  LogEntry(
    usuario: 'Desarrollador del sistema PPT',
    accion: 'Nueva publicación',
    detalle: 'Publicación: "Mejoras en sistema de verificación"',
    fecha: DateTime.now().subtract(const Duration(days: 3)),
  ),
];

class AuditoriaScreen extends StatelessWidget {
  const AuditoriaScreen({Key? key}) : super(key: key);

  String _formatFecha(DateTime fecha) {
    return '${fecha.day}/${fecha.month}/${fecha.year} ${fecha.hour.toString().padLeft(2, '0')}:${fecha.minute.toString().padLeft(2, '0')}';
  }

  Icon _iconForAction(String accion) {
    if (accion.toLowerCase().contains('aprobó')) {
      return const Icon(Icons.check_circle, color: Colors.green);
    } else if (accion.toLowerCase().contains('eliminó')) {
      return const Icon(Icons.delete_forever, color: Colors.red);
    } else if (accion.toLowerCase().contains('actualizó')) {
      return const Icon(Icons.edit, color: Colors.orange);
    } else if (accion.toLowerCase().contains('publicación')) {
      return const Icon(Icons.post_add, color: Colors.blue);
    }
    return const Icon(Icons.info_outline);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Auditoría'),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: logsEjemplo.length,
        itemBuilder: (context, index) {
          final log = logsEjemplo[index];
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: ListTile(
              leading: _iconForAction(log.accion),
              title: Text(log.accion),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Por: ${log.usuario}'),
                  Text(log.detalle),
                  const SizedBox(height: 4),
                  Text(
                    _formatFecha(log.fecha),
                    style: const TextStyle(fontSize: 12, color: Colors.grey),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
