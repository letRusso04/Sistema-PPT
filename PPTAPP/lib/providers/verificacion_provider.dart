import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'miembros_provider.dart';

class VerificacionProvider extends ChangeNotifier {
  // Inyectamos MiembrosProvider para actualizar la lista local
  MiembrosProvider? _miembros;
  void attach(MiembrosProvider m) => _miembros = m;

  // URL base de tu API (ajusta IP/domino)
  static const _base = 'http://10.0.2.2:5000/api';

  bool _enProceso = false;
  bool get enProceso => _enProceso;

  Future<void> aprobar(String id) async {
    _setLoading(true);
    try {
      final url = Uri.parse('$_base/miembros/$id/aprobar');
      final resp = await http.post(url).timeout(const Duration(seconds: 10));

      if (resp.statusCode == 200) {
        // Actualiza al miembro como verificado dentro de MiembrosProvider
        final index = _miembros?.miembros.indexWhere((m) => m.id == id) ?? -1;
        if (index != -1) {
          final m = _miembros!.miembros[index].copyWith(verificado: true);
          _miembros!.actualizar(m);
        }
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
      final url = Uri.parse('$_base/miembros/$id/rechazar');
      final resp = await http.post(url).timeout(const Duration(seconds: 10));

      if (resp.statusCode == 200) {
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
