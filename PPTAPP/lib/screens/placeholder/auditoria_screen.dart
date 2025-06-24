import 'dart:convert';

import 'package:admin/env/api.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class LogEntry {
  final String usuario;
  final int accion;
  final String detalle;
  final DateTime fecha;

  LogEntry({
    required this.usuario,
    required this.accion,
    required this.detalle,
    required this.fecha,
  });

  factory LogEntry.fromJson(Map<String, dynamic> json) {
    return LogEntry(
      usuario: json['usuario'].toString(),
      accion: json['accion'],
      detalle: json['detalle'].toString(),
      fecha: DateTime.parse(json['fecha']),
    );
  }
}

Future<List<LogEntry>> fetchLogs() async {
  final response = await http.post(Uri.parse('$baseUrl/auditoria/llamar'));
  print("respuesta ${response.body}");
  if (response.statusCode == 200) {
    final List<dynamic> jsonData = json.decode(response.body);
    return jsonData.map((item) => LogEntry.fromJson(item)).toList();
  } else {
    throw Exception('Error al cargar auditorías');
  }
}

class AuditoriaScreen extends StatefulWidget {
  const AuditoriaScreen({Key? key}) : super(key: key);

  @override
  State<AuditoriaScreen> createState() => _AuditoriaScreenState();
}

class _AuditoriaScreenState extends State<AuditoriaScreen> {
  late Future<List<LogEntry>> _futureLogs;

  @override
  void initState() {
    super.initState();
    _futureLogs = fetchLogs();
  }

  String _formatFecha(DateTime fecha) {
    return '${fecha.day}/${fecha.month}/${fecha.year} ${fecha.hour.toString().padLeft(2, '0')}:${fecha.minute.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Auditoría')),
      body: FutureBuilder<List<LogEntry>>(
        future: _futureLogs,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No hay registros de auditoría.'));
          }

          final logs = snapshot.data!;
          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: logs.length,
            itemBuilder: (context, index) {
              final log = logs[index];
              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: ListTile(
                  title: _accionWidget(log.accion),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('IDENTIFICADOR SQL USUARIO: ${log.usuario}'),
                      Text(log.detalle),
                      const SizedBox(height: 4),
                      Text(
                        _formatFecha(log.fecha),
                        style:
                            const TextStyle(fontSize: 12, color: Colors.grey),
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

Widget _accionWidget(int accion) {
  switch (accion) {
    case 1:
      return const Row(
        children: [
          Icon(Icons.post_add, color: Colors.blue),
          SizedBox(width: 8),
          Text('Nuevo'),
        ],
      );
    case 2:
      return const Row(
        children: [
          Icon(Icons.edit, color: Colors.orange),
          SizedBox(width: 8),
          Text('Actualización'),
        ],
      );
    case 3:
      return const Row(
        children: [
          Icon(Icons.delete_forever, color: Colors.red),
          SizedBox(width: 8),
          Text('Eliminación/Expulsión'),
        ],
      );
    case 4:
      return const Row(
        children: [
          Icon(Icons.check_circle, color: Colors.green),
          SizedBox(width: 8),
          Text('Aprobación'),
        ],
      );
    default:
      return const Row(
        children: [
          Icon(Icons.info_outline),
          SizedBox(width: 8),
          Text('Acción desconocida'),
        ],
      );
  }
}
