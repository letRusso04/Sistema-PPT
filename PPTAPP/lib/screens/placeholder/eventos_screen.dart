import 'package:flutter/material.dart';

class Evento {
  final String fecha;
  final String titulo;
  final String descripcion;
  final String? version;

  const Evento({
    required this.fecha,
    required this.titulo,
    required this.descripcion,
    this.version,
  });
}

const List<Evento> eventos = [
  Evento(
    fecha: '2025‑06‑14',
    titulo: 'Sistema de verificación agregado',
    descripcion:
        'Ahora puedes aprobar o rechazar registros de usuarios desde la nueva sección Verificación.',
    version: 'v1.2.0',
  ),
  Evento(
    fecha: '2025‑06‑10',
    titulo: 'Mejoras responsivas',
    descripcion:
        'La interfaz de Miembros y Verificación se adapta mejor a pantallas móviles.',
  ),
  Evento(
    fecha: '2025‑06‑05',
    titulo: 'Inicio del proyecto',
    descripcion: 'Estructura base del sistema, login, registro y navegación.',
    version: 'v1.0.0',
  ),
];

class EventosScreen extends StatelessWidget {
  const EventosScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Eventos / Actualizaciones'),
      ),
      body: Stack(
        children: [
          // Fondo de pantalla
          Positioned.fill(
            child: Image.asset(
              'assets/images/banner2des.png',
              fit: BoxFit.cover,
            ),
          ),
          // Contenido con fondo semitransparente para legibilidad
          Container(
            color: Colors.black.withOpacity(0.5),
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: eventos.length,
              itemBuilder: (context, index) {
                final e = eventos[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 16),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          e.fecha,
                          style: const TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 14),
                        ),
                        const SizedBox(height: 6),
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                e.titulo,
                                style: const TextStyle(
                                    fontSize: 16, fontWeight: FontWeight.w600),
                              ),
                            ),
                            if (e.version != null)
                              Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: const Color.fromARGB(255, 38, 0, 34),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Text(
                                  e.version!,
                                  style: const TextStyle(fontSize: 12),
                                ),
                              ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(e.descripcion),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
