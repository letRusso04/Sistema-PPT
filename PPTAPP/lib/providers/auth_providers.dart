import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'dart:io'; // SocketException
import 'dart:async';
import 'package:admin/env/api.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:dio/dio.dart';

class AuthProvider extends ChangeNotifier {
  final _storage = const FlutterSecureStorage();

  bool _isAuthenticated = false;
  bool get isAuthenticated => _isAuthenticated;
  String? _token;

  /// LOGIN ───────────────────────────────────────────────────────────
  Future<int> login({
    required String email,
    required String password,
  }) async {
    final response = await http
        .post(
          Uri.parse('$baseUrl/inicio'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({'email': email, 'password': password}),
        )
        .timeout(const Duration(seconds: 10));
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      int verificacion = data[0][1];
      if (verificacion == 0) return 1;

      int _id = data[0][0];
      String _nombre = data[0][2];
      int _cedula = data[0][4];

      String _ubicacion = data[0][5];

      String _email = data[0][6];

      dynamic _telefono = data[0][7];
      String _estado = data[0][8];
      int _role = data[0][9];
      String _imageUrl = data[0][10];
      // 1. token

      await _storage.write(key: 'token', value: _email);

      // 2. datos usuario
      final prefs = await SharedPreferences.getInstance();
      prefs.setInt('admin', _role);
      prefs.setInt('iduser', _id);
      prefs.setString('nombre', _nombre);
      prefs.setInt('cedula', _cedula);
      prefs.setString('ubicacion', _ubicacion);
      prefs.setString('email', _email);
      prefs.setInt('telefono', _telefono);
      prefs.setString('estado', _estado);

      // Validacion de la imagen
      _imageUrl.length > 1
          ? prefs.setString('imageUrl', _imageUrl)
          : prefs.setString('imageUrl', 'false');
      print(_imageUrl);

      _isAuthenticated = true;
      notifyListeners();
      return 0;
    } else {
      throw Exception('Credenciales incorrectas');
    }
  }

  Future<void> register({
    required String email,
    required String nombre,
    required String password,
    required String cedula,
    required String telefono,
    required String ubicacion,
    required String estado,
  }) async {
    print("inicio de proceso");
    try {
      final dio = Dio();
      final response = await dio.post(
        '$baseUrl/registro',
        data: {
          'email': email,
          'name': nombre,
          'password': password,
          'cedula': cedula,
          'ubicacion': ubicacion,
          'estado': estado,
          'telefono': telefono,
        },
        options: Options(
          headers: {'Content-Type': 'application/json'},
          sendTimeout: const Duration(seconds: 3),
          receiveTimeout: const Duration(seconds: 3),
        ),
      );

      print(response.data);
      //print('status code: ${response.statusCode}');
      if (response.data == "SUCCESS_QUERY_RESPONSE") {
        _isAuthenticated = true;
        notifyListeners();
      } else {
        final err = jsonDecode(response.data)['error'] ??
            'Error inesperado del servidor';
        throw Exception(err);
      }
    } on SocketException {
      print('No se pudo conectar con el servidor');
    } on TimeoutException {
      print('Servidor sin respuesta (timeout)');
    } catch (e) {
      print('Servidor sin respuesta $e');
    }
  }

  /// ─── CARGA AUTOMÁTICA AL ARRANCAR ───────────────────────────────
  Future<void> tryAutoLogin() async {
    final storedToken = await _storage.read(key: 'token');
    if (storedToken == null) return;

    final prefs = await SharedPreferences.getInstance();
    final userJson = prefs.getString('email');
    if (userJson == null) return;

    _token = storedToken;
    _isAuthenticated = true;
    notifyListeners();
  }

  /// LOGOUT ───────────────────────────────────────────────────────────
  Future<void> logout() async {
    await _storage.delete(key: 'token');
    _isAuthenticated = false;
    notifyListeners();
  }

  /// Getter rápido de cabeceras autenticadas
  Map<String, String> get authHeaders =>
      {'Content-Type': 'application/json', 'Authorization': 'Bearer $_token'};
}
