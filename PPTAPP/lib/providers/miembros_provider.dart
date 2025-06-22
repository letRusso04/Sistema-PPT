import 'package:admin/env/api.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Miembro {
  String id;
  String nombre;
  String foto;
  String cedula;
  String rol;
  String estado;
  String ubicacion;
  String correo;
  String telefono;
  int verificado;

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
    int? verificado,
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
      verificado: json['verificado'],
    );
  }
}

class MiembrosProvider extends ChangeNotifier {
  List<Miembro> _miembros = [];

  List<Miembro> get miembros => [..._miembros];
  void marcarVerificado(String id) {
    final i = _miembros.indexWhere((m) => m.id == id);
    if (i != -1) {
      _miembros[i] = _miembros[i].copyWith(verificado: 1);
      print(_miembros[i].verificado);
      notifyListeners();
    }
  }

  Future<void> fetchMiembros() async {
    try {
      final url = Uri.parse('$baseUrl/miembros/llamar');
      final response =
          await http.post(url).timeout(const Duration(seconds: 15));

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);

        final List<Miembro> loaded = data.map<Miembro>((item) {
          if (item is List && item.length >= 10) {
            return Miembro(
              id: item[0].toString(),
              verificado: item[1],
              nombre: item[2].toString(),
              cedula: item[3].toString(),
              ubicacion: item[4].toString(),
              correo: item[5].toString(),
              telefono: item[6].toString(),
              estado: item[7].toString(),
              rol: item[8].toString(),
              foto: (item[9] != null && item[9].toString().isNotEmpty)
                  ? '$baseUrl/avatars/${item[9]}'
                  : 'false',
            );
          }

          // Placeholder si viene mal
          return Miembro(
            id: '0',
            nombre: 'Desconocido',
            foto: 'false',
            cedula: '',
            rol: '',
            estado: '',
            ubicacion: '',
            correo: '',
            telefono: '',
            verificado: 0,
          );
        }).toList();

        _miembros = loaded;
        notifyListeners();
      } else {
        throw Exception('Error al cargar miembros: ${response.statusCode}');
      }
    } catch (e) {
      if (kDebugMode) print('fetchMiembros error: $e');
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

  /// Actualiza en la BD y luego en la lista local
  Future<void> actualizarRemote(Miembro actualizado) async {
    final url = Uri.parse('$baseUrl/miembros/actualizar');
    final body = jsonEncode({
      'id': actualizado.id,
      'rol': actualizado.rol,
      'correo': actualizado.correo,
      'cedula': actualizado.cedula,
      'estado': actualizado.estado,
      'ubicacion': actualizado.ubicacion,
      'telefono': actualizado.telefono,
    });

    final resp = await http
        .post(url, headers: {'Content-Type': 'application/json'}, body: body)
        .timeout(const Duration(seconds: 10));

    if (resp.body == "SUCCESS_QUERY_RESPONSE") {
      final prefs = await SharedPreferences.getInstance();
      final _id = prefs.getInt('iduser');
      if (_id.toString() == actualizado.id) {
        prefs.setInt('cedula', int.parse(actualizado.cedula));
        prefs.setString('ubicacion', actualizado.ubicacion);
        prefs.setString('email', actualizado.correo);
        prefs.setInt('telefono', int.parse(actualizado.telefono));
        prefs.setString('estado', actualizado.estado);
        prefs.setInt('admin', int.parse(actualizado.rol));
      }
      actualizar(actualizado);
      notifyListeners();
    } else {
      throw Exception('Error ${resp.statusCode} al actualizar miembro');
    }
  }
}
