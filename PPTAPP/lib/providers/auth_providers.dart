import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

class AuthProvider extends ChangeNotifier {
  final _storage = const FlutterSecureStorage();

  bool _isAuthenticated = false;
  bool get isAuthenticated => _isAuthenticated;

  /// LOGIN ───────────────────────────────────────────────────────────
  Future<void> login({
    required String email,
    required String password,
  }) async {
    final response = await http.post(
      Uri.parse('https://tu-api.com/auth/login'),
      body: {'email': email, 'password': password},
    );

    if (response.statusCode == 200) {
      final token = jsonDecode(response.body)['token'] as String;
      await _storage.write(key: 'token', value: token);
      _isAuthenticated = true;
      notifyListeners();
    } else {
      throw Exception('Credenciales incorrectas');
    }
  }

  /// REGISTRO ─────────────────────────────────────────────────────────
  Future<void> register({
    required String email,
    required String nombre,
    required String password,
    required String cedula,
    required String ubicacion,
    required String estado,
  }) async {
    final response = await http.post(
      Uri.parse('https://tu-api.com/auth/register'),
      body: {
        'email': email,
        'nombre': nombre,
        'password': password,
        'cedula': cedula,
        'ubicacion': ubicacion,
        'estado': estado,
      },
    );

    if (response.statusCode == 201) {
      // ­Auto‑login tras registro exitoso
      final token = jsonDecode(response.body)['token'] as String;
      await _storage.write(key: 'token', value: token);
      _isAuthenticated = true;
      notifyListeners();
    } else {
      throw Exception('Error al registrar: ${response.body}');
    }
  }

  /// LOGOUT ───────────────────────────────────────────────────────────
  Future<void> logout() async {
    await _storage.delete(key: 'token');
    _isAuthenticated = false;
    notifyListeners();
  }
}
