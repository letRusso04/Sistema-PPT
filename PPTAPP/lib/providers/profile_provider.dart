import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

import '../env/api.dart'; // `baseUrl`

class ProfileProvider extends ChangeNotifier {
  /// ─── Carga desde SharedPrefs al arrancar ───────────────────────
  Future<void> loadCachedProfile() async {
    /* final prefs = await SharedPreferences.getInstance();
    int? _id = prefs.getInt('iduser');
    String? _nombre = prefs.getString('nombre');
    int? _cedula = prefs.getInt('cedula');
    String? _ubicacion = prefs.getString('ubicacion');
    String? _email = prefs.getString('email');
    dynamic? _telefono = prefs.getInt('telefono');
    String? _estado = prefs.getString('estado');
    int? _role = prefs.getInt('admin');
    String? _imageUrl = prefs.getString('imageUrl');*/
    notifyListeners();
  }

  /// ─── Actualizar avatar ─────────────────────────────────────────
  Future<void> updateAvatar({
    required File archivo,
  }) async {
    final url = Uri.parse('$baseUrl/avatar/change');
    final prefs = await SharedPreferences.getInstance();
    // envia los datos al servidor
    int iduserD = prefs.getInt('iduser') ?? 0;
    if (iduserD != 0) {
      final req = http.MultipartRequest('POST', url)
        ..fields['iduser'] = '$iduserD'
        ..files.add(await http.MultipartFile.fromPath(
          'avatar', // ← nombre del campo para el archivo
          archivo.path,
          filename: archivo.uri.pathSegments.last,
        ));
      final resp = await req.send().timeout(const Duration(seconds: 15));
      if (resp.statusCode == 200) {
        final body = jsonDecode(await resp.stream.bytesToString());
        final nuevaUrl = body['avatarUrl'] as String;
        if (nuevaUrl == 'BAD_QUERY_RESPONSE') {
          throw Exception('Error al subir la imagen');
        }
        final prefs = await SharedPreferences.getInstance();
        prefs.setString('imageUrl', nuevaUrl);
      }
    }
  }

  Future<int> cambiarcontra({
    required int iduser,
    required String passwordController,
    required String newPasswordController,
  }) async {
    final response = await http
        .post(
          Uri.parse('$baseUrl/cambiarcontra'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({
            'iduser': iduser,
            'contranueva': newPasswordController,
            'contravieja': passwordController
          }),
        )
        .timeout(const Duration(seconds: 10));
    if (response.body == 'SUCCESS_QUERY_RESPONSE') {
      notifyListeners();
      return 1;
    } else if (response.body == 'BAD_QUERY_RESPONSE') return 2;
    return 0;
  }
}
