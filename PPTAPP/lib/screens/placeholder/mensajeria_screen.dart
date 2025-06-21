import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Member {
  final String id;
  final String name;
  final String avatarPath;

  Member({required this.id, required this.name, required this.avatarPath});
}

class Message {
  final String senderId;
  final String text;
  final DateTime time;

  Message({required this.senderId, required this.text, required this.time});
}

class ChatProvider extends ChangeNotifier {
  final List<Member> members;
  final Map<String, List<Message>> _messages = {};

  String? _selectedUserId;

  ChatProvider({required this.members});

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
}

class MensajeriaScreen extends StatefulWidget {
  const MensajeriaScreen({Key? key}) : super(key: key);

  @override
  State<MensajeriaScreen> createState() => _MensajeriaScreenState();
}

class _MensajeriaScreenState extends State<MensajeriaScreen> {
  late ChatProvider chatProvider;

  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  final List<Member> members = [
    Member(id: '1', name: 'Alice', avatarPath: 'assets/images/PPTLogo.png'),
    Member(id: '2', name: 'Bob', avatarPath: 'assets/images/PPTLogo.png'),
    Member(id: '3', name: 'Carol', avatarPath: 'assets/images/PPTLogo.png'),
  ];

  @override
  void initState() {
    super.initState();
    chatProvider = ChatProvider(members: members);
  }

  void _sendMessage() {
    final text = _controller.text.trim();
    if (text.isEmpty) return;
    chatProvider.sendMessage(text);
    _controller.clear();

    Future.delayed(Duration(milliseconds: 100), () {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: Duration(milliseconds: 200),
          curve: Curves.easeOut,
        );
      }
    });

    if (chatProvider.selectedUserId != null) {
      Future.delayed(Duration(seconds: 1, milliseconds: 500), () {
        chatProvider.receiveMessage(
            chatProvider.selectedUserId!, 'Ok, recibido!');
      });
    }
  }

  Widget _buildMemberList(BuildContext context, bool isDrawer) {
    return Container(
      width: isDrawer ? null : 250,
      color: Colors.grey[900],
      child: ListView.builder(
        itemCount: chatProvider.members.length,
        itemBuilder: (context, index) {
          final member = chatProvider.members[index];
          final selected = member.id == chatProvider.selectedUserId;
          return ListTile(
            selected: selected,
            selectedTileColor: Colors.blueGrey,
            leading: CircleAvatar(
              backgroundImage: AssetImage(member.avatarPath),
            ),
            title: Text(member.name, style: TextStyle(color: Colors.white)),
            onTap: () {
              chatProvider.selectUser(member.id);
              if (isDrawer) Navigator.of(context).pop(); // Cerrar drawer
            },
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<ChatProvider>.value(
      value: chatProvider,
      child: LayoutBuilder(
        builder: (context, constraints) {
          bool isLargeScreen = constraints.maxWidth >= 600;
          return Scaffold(
            appBar: AppBar(
              title: Text('Mensajería Interna'),
              leading: !isLargeScreen
                  ? Builder(
                      builder: (context) => IconButton(
                        icon: Icon(Icons.menu),
                        onPressed: () => Scaffold.of(context).openDrawer(),
                      ),
                    )
                  : IconButton(
                      icon: Icon(Icons.arrow_back),
                      onPressed: () {
                        Navigator.pop(context); // Regresa al menú principal
                      },
                    ),
              actions: [
                PopupMenuButton<String>(
                  onSelected: (value) {
                    switch (value) {
                      case 'Menu Principal':
                        Navigator.pushReplacementNamed(context, '/');
                        break;
                    }
                  },
                  itemBuilder: (context) => [
                    PopupMenuItem(
                        value: 'Menu Principal', child: Text('Menu Principal')),
                  ],
                  icon: Icon(Icons.more_vert),
                ),
              ],
            ),
            drawer: !isLargeScreen
                ? Drawer(
                    child: _buildMemberList(context, true),
                  )
                : null,
            body: isLargeScreen
                ? Row(
                    children: [
                      _buildMemberList(context, false),
                      Expanded(child: _buildChatArea()),
                    ],
                  )
                : _buildChatArea(),
          );
        },
      ),
    );
  }

  Widget _buildChatArea() {
    return Consumer<ChatProvider>(
      builder: (context, provider, _) {
        if (provider.selectedUserId == null) {
          return Center(
            child: Text('Seleccione un usuario para comenzar a chatear',
                style: TextStyle(color: Colors.white, fontSize: 18)),
          );
        }

        final member =
            provider.members.firstWhere((m) => m.id == provider.selectedUserId);
        final messages = provider.messagesForSelectedUser;

        return Column(
          children: [
            Container(
              padding: EdgeInsets.all(12),
              color: Colors.grey[850],
              child: Row(
                children: [
                  CircleAvatar(
                    backgroundImage: AssetImage(member.avatarPath),
                  ),
                  SizedBox(width: 12),
                  Text(member.name,
                      style: TextStyle(color: Colors.white, fontSize: 20)),
                ],
              ),
            ),
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                itemCount: messages.length,
                itemBuilder: (context, index) {
                  final msg = messages[index];
                  final isMe = msg.senderId == 'me';
                  return Align(
                    alignment:
                        isMe ? Alignment.centerRight : Alignment.centerLeft,
                    child: Container(
                      margin: EdgeInsets.symmetric(vertical: 4, horizontal: 12),
                      padding: EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: isMe ? Colors.blueAccent : Colors.grey[700],
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        msg.text,
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  );
                },
              ),
            ),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              color: Colors.grey[850],
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      decoration: InputDecoration(
                        hintText: 'Escribe un mensaje...',
                        hintStyle: TextStyle(color: Colors.white54),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                          borderSide: BorderSide.none,
                        ),
                        filled: true,
                        fillColor: Colors.grey[700],
                      ),
                      style: TextStyle(color: Colors.white),
                      onSubmitted: (_) => _sendMessage(),
                    ),
                  ),
                  IconButton(
                    icon: Icon(Icons.send, color: Colors.blueAccent),
                    onPressed: _sendMessage,
                  )
                ],
              ),
            ),
          ],
        );
      },
    );
  }
}
