import 'dart:convert';
import 'package:admin/env/api.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Member {
  final String id;
  final String name;
  final String avatarPath;

  Member({
    required this.id,
    required this.name,
    required this.avatarPath,
  });

  factory Member.fromList(List<dynamic> data) {
    return Member(
      id: data[0].toString(),
      name: data[2].toString(),
      avatarPath: data[10] != null && data[10].toString().isNotEmpty
          ? '$imageUrlData/${data[10]}'
          : 'assets/images/PPTLogo.png',
    );
  }
}

class Message {
  final String senderId;
  final String text;
  final DateTime time;

  Message({
    required this.senderId,
    required this.text,
    required this.time,
  });
}

class ChatProvider extends ChangeNotifier {
  final List<Member> _members = [];
  final Map<String, List<Message>> _messages = {};
  String? _selectedUserId;

  List<Member> get members => _members;

  String? get selectedUserId => _selectedUserId;

  List<Message> get messagesForSelectedUser =>
      _selectedUserId != null ? _messages[_selectedUserId] ?? [] : [];

  void selectUser(String userId) {
    _selectedUserId = userId;
    _loadMessages(userId);
    notifyListeners();
  }

  Future<void> _loadMessages(String userId) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final myId = prefs.getInt('iduser')?.toString() ?? '0';

      final url = Uri.parse('$baseUrl/mensajes/buscar');
      final res = await http
          .post(
            url,
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode({'from_id': myId, 'to_id': userId}),
          )
          .timeout(const Duration(seconds: 10));

      if (res.statusCode != 200) {
        throw Exception('Error ${res.statusCode}');
      }

      final List<dynamic> data = jsonDecode(res.body);
      final msgs = data
          .map((msg) => Message(
                senderId: msg['sender_id'].toString(),
                text: msg['message'],
                time: DateTime.parse(msg['timestamp']),
              ))
          .toList();
      _messages[userId] = msgs;
      notifyListeners();
    } catch (e) {
      if (kDebugMode) print('Error al cargar mensajes: $e');
    }
  }

  Future<void> sendMessage(String text, {required String senderId}) async {
    if (_selectedUserId == null) return;

    final newMsg =
        Message(senderId: senderId, text: text, time: DateTime.now());

    _messages.putIfAbsent(_selectedUserId!, () => []);
    _messages[_selectedUserId!]!.add(newMsg);
    notifyListeners();

    final prefs = await SharedPreferences.getInstance();
    final currentUserId = prefs.getInt('iduser')?.toString() ?? '0';

    try {
      final url = Uri.parse('$baseUrl/mensajes/enviar');
      final response = await http
          .post(
            url,
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode({
              'by_id': currentUserId,
              'to_id': _selectedUserId,
              'message': text,
              'timestamp': DateTime.now().toIso8601String(),
            }),
          )
          .timeout(const Duration(seconds: 10));

      if (response.statusCode != 200) {
        throw Exception('Error al enviar mensaje: ${response.body}');
      }
    } catch (e) {
      if (kDebugMode) print('Error al enviar mensaje: $e');
    }
  }

  void receiveMessage(String senderId, String text) {
    final newMsg = Message(
      senderId: senderId,
      text: text,
      time: DateTime.now(),
    );

    _messages.putIfAbsent(senderId, () => []);
    _messages[senderId]!.add(newMsg);

    // Si estamos chateando con ese usuario, actualizar también la UI
    if (senderId == _selectedUserId) {
      notifyListeners();
    }
  }

  Future<void> fetchMembers() async {
    try {
      final url = Uri.parse('$baseUrl/miembros/llamar');
      final res = await http.post(url).timeout(const Duration(seconds: 10));

      if (res.statusCode != 200) {
        throw Exception('Status ${res.statusCode}');
      }

      final data = jsonDecode(res.body);
      if (data is! List) throw Exception('La API no devolvió una lista');

      _members
        ..clear()
        ..addAll(data.map<Member>((item) {
          if (item is Map<String, dynamic>) {
            return Member(
              id: item['id'].toString(),
              name: item['nombre'] ?? 'Sin nombre',
              avatarPath: _buildAvatarPath(item['foto']),
            );
          }

          if (item is List && item.length >= 3) {
            final int last = item.length - 1;
            final avatar = (item[last] ?? '').toString();
            return Member(
              id: item[0].toString(),
              name: item[2].toString(),
              avatarPath: _buildAvatarPath(avatar),
            );
          }

          if (kDebugMode) print('Item desconocido: $item');
          return Member(
            id: '0',
            name: 'Desconocido',
            avatarPath: 'assets/images/PPTLogo.png',
          );
        }).toList());

      notifyListeners();
    } catch (e) {
      if (kDebugMode) print('Error en fetchMembers: $e');
      rethrow;
    }
  }

  String _buildAvatarPath(String? avatar) {
    if (avatar != null && avatar.isNotEmpty && avatar != 'false') {
      return '$baseUrl/avatars/$avatar';
    }
    return 'assets/images/PPTLogo.png';
  }
}
