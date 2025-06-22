import 'package:admin/env/api.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

class Miembro {
  final String id;
  final String nombre;
  final String foto;
  final String cedula;
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
    required this.cedula,
    required this.ubicacion,
    required this.correo,
    required this.telefono,
    required this.verificado,
  });

  /// ─── Copia el objeto cambiando sólo los campos indicados ─────────
  Miembro copyWith({
    String? id,
    String? nombre,
    String? foto,
    String? cedula,
    String? rol,
    String? estado,
    String? ubicacion,
    String? correo,
    String? telefono,
    bool? verificado,
  }) {
    return Miembro(
      id: id ?? this.id,
      nombre: nombre ?? this.nombre,
      foto: foto ?? this.foto,
      cedula: cedula ?? this.cedula,
      rol: rol ?? this.rol,
      estado: estado ?? this.estado,
      ubicacion: ubicacion ?? this.ubicacion,
      correo: correo ?? this.correo,
      telefono: telefono ?? this.telefono,
      verificado: verificado ?? this.verificado,
    );
  }

  /// ─── Construye desde JSON ───────────────────────────────────────
  factory Miembro.fromJson(Map<String, dynamic> json) {
    return Miembro(
      id: json['id'].toString(),
      nombre: json['nombre'],
      foto: json['foto'],
      cedula: json['cedula'].toString(),
      rol: json['rol'],
      estado: json['estado'],
      ubicacion: json['ubicacion'],
      correo: json['correo'],
      telefono: json['telefono'].toString(),
      verificado: json['verificado'] == true || json['verificado'] == 1,
    );
  }
}

class MiembrosProvider extends ChangeNotifier {
  List<Miembro> _miembros = [];

  List<Miembro> get miembros => [..._miembros];

  // Nueva función para traer miembros de la API
  Future<void> fetchMiembros() async {
    try {
      final url = Uri.parse('$baseUrl/miembros/llamar');
      final response =
          await http.post(url).timeout(const Duration(seconds: 15));

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);

        // Mapea la lista de listas a la lista de Miembro
        final List<Miembro> loadedMiembros = data.map<Miembro>((item) {
          // Asegurarse que item es List y tiene suficientes elementos
          if (item is List && item.length >= 11) {
            print("movimiendo data ${item[2]}");
            return Miembro(
              id: item[0].toString(),
              rol: item[1].toString(),
              nombre: item[2].toString(),
              cedula: item[3].toString(),
              telefono: item[4].toString(),
              ubicacion: item[5].toString(),
              correo: item[6].toString(),
              estado: item[8].toString(),
              verificado: item[9] == 1,
              foto: item[10] != ""
                  ? '$baseUrl/avatars/${item[10]}' // Construye URL si foto existe
                  : 'false', // fallback imagen local
            );
          } else {
            // Si el formato no es correcto, retorna un miembro vacío o lanzar error
            return Miembro(
              id: '0',
              rol: '',
              nombre: 'Desconocido',
              cedula: '',
              telefono: '',
              ubicacion: '',
              correo: '',
              estado: '',
              verificado: false,
              foto: 'assets/images/icon_main.png',
            );
          }
        }).toList();

        _miembros = loadedMiembros;
        notifyListeners();
      } else {
        throw Exception('Error al cargar miembros: ${response.statusCode}');
      }
    } catch (e) {
      if (kDebugMode) {
        print('fetchMiembros error: $e');
      }
      rethrow;
    }
  }

  // Métodos eliminar y actualizar
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
