import 'dart:convert';
import 'package:admin/env/api.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

class Member {
  final String id;
  final String name;
  final String avatarPath;

  Member({required this.id, required this.name, required this.avatarPath});

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
    notifyListeners();
  }

  void sendMessage(String text) {
    if (_selectedUserId == null) return;
    final newMsg = Message(senderId: 'me', text: text, time: DateTime.now());
    _messages.putIfAbsent(_selectedUserId!, () => []);
    _messages[_selectedUserId!]!.add(newMsg);
    notifyListeners();
  }

  void receiveMessage(String userId, String text) {
    final newMsg = Message(senderId: userId, text: text, time: DateTime.now());
    _messages.putIfAbsent(userId, () => []);
    _messages[userId]!.add(newMsg);
    notifyListeners();
  }

  Future<void> fetchMembers() async {
    try {
      final url = Uri.parse('$baseUrl/miembros/llamar');
      final response = await http.post(url).timeout(Duration(seconds: 10));

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        _members.clear();
        _members.addAll(data.map((d) => Member.fromList(d)).toList());
        notifyListeners();
      } else {
        throw Exception('Error cargando miembros: ${response.statusCode}');
      }
    } catch (e) {
      if (kDebugMode) print('Error en fetchMembers: $e');
      rethrow;
    }
  }
}

class Message {
  final String senderId;
  final String text;
  final DateTime time;

  Message({required this.senderId, required this.text, required this.time});
}
