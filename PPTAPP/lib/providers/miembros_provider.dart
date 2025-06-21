import 'package:flutter/material.dart';

class Miembro {
  final String id;
  final String nombre;
  final String foto; // path local o URL
  final String rol;
  final String estado;
  final String ubicacion;
  final String correo;
  final String telefono;
  final bool verificado;

  Miembro({
    required this.id,
    required this.nombre,
    required this.foto,
    required this.rol,
    required this.estado,
    required this.ubicacion,
    required this.correo,
    required this.telefono,
    required this.verificado,
  });
}

class MiembrosProvider extends ChangeNotifier {
  notifyListeners();
  List<Miembro> _miembros = [
    Miembro(
      id: '1',
      nombre: 'Ana María Rivas',
      foto: 'assets/images/icon_main.png',
      rol: 'Moderadora',
      estado: 'Mérida',
      ubicacion: 'El Vigía',
      correo: 'ana.rivas@example.com',
      telefono: '0414-1234567',
      verificado: true,
    ),
    Miembro(
      id: '2',
      nombre: 'Carlos Hernández',
      foto: 'assets/images/icon_main.png',
      rol: 'Coordinador regional',
      estado: 'Zulia',
      ubicacion: 'Maracaibo',
      correo: 'carlos.hz@example.com',
      telefono: '0412-2345678',
      verificado: true,
    ),
    Miembro(
      id: '3',
      nombre: 'Laura Gómez',
      foto: 'assets/images/icon_main.png',
      rol: 'Voluntaria',
      estado: 'Carabobo',
      ubicacion: 'Valencia',
      correo: 'laura.gomez@example.com',
      telefono: '0416-3456789',
      verificado: false,
    ),
    Miembro(
      id: '4',
      nombre: 'José Castillo',
      foto: 'assets/images/icon_main.png',
      rol: 'Analista de Datos',
      estado: 'Distrito Capital',
      ubicacion: 'Caracas',
      correo: 'jose.castillo@example.com',
      telefono: '0424-4567890',
      verificado: false,
    ),
  ];

  List<Miembro> get miembros => [..._miembros];

  void eliminar(String id) {
    _miembros.removeWhere((m) => m.id == id);
    notifyListeners();
  }

  void actualizar(Miembro actualizado) {
    final i = _miembros.indexWhere((m) => m.id == actualizado.id);
    if (i != -1) {
      _miembros[i] = actualizado;
      notifyListeners();
    }
  }
}
