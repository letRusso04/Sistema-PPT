import 'dart:convert';
import 'package:admin/env/api.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'miembros_provider.dart';

class VerificacionProvider extends ChangeNotifier {
  // Inyectamos MiembrosProvider para actualizar la lista local
  MiembrosProvider? _miembros;
  void attach(MiembrosProvider m) => _miembros = m;

  bool _enProceso = false;
  bool get enProceso => _enProceso;

  Future<void> aprobar(String id) async {
    _setLoading(true);
    try {
      final url = Uri.parse('$baseUrl/miembros/aprobar');
      final resp = await http
          .post(
            url,
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode({
              'iduser': id,
            }),
          )
          .timeout(const Duration(seconds: 10));
      if (resp.body == "SUCCESS_QUERY_RESPONSE") {
        await _miembros?.fetchMiembros(); // refresca la lista completa
        notifyListeners();
      } else {
        throw Exception('Error (${resp.statusCode}) al aprobar');
      }
    } finally {
      _setLoading(false);
    }
  }

  Future<void> rechazar(String id) async {
    _setLoading(true);
    try {
      final url = Uri.parse('$baseUrl/miembros/eliminar');
      final resp = await http
          .post(
            url,
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode({
              'iduser': id,
            }),
          )
          .timeout(const Duration(seconds: 10));
      if (resp.body == "DELETE_QUERY_RESPONSE") {
        _miembros?.eliminar(id);
      } else {
        throw Exception('Error (${resp.statusCode}) al rechazar');
      }
    } finally {
      _setLoading(false);
    }
  }

  void _setLoading(bool v) {
    _enProceso = v;
    notifyListeners();
  }
}
