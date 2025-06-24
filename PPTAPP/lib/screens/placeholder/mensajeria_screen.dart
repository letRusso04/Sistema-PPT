import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart'; // <-- importar
import '../../providers/chat_provider.dart';

class MensajeriaScreen extends StatefulWidget {
  const MensajeriaScreen({Key? key}) : super(key: key);

  @override
  State<MensajeriaScreen> createState() => _MensajeriaScreenState();
}

class _MensajeriaScreenState extends State<MensajeriaScreen> {
  final ChatProvider chatProvider = ChatProvider();
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  bool _cargando = true;
  String? _currentUserId; // <--- ID usuario actual

  @override
  void initState() {
    super.initState();
    _initUserAndChat();
  }

  Future<void> _initUserAndChat() async {
    final prefs = await SharedPreferences.getInstance();
    final idUser = prefs.getInt('iduser')?.toString();

    if (idUser == null) {
      // Manejar error o redirigir a login
      print("Usuario no autenticado");
      return;
    }
    chatProvider.fetchMembers().whenComplete(() {
      if (mounted) setState(() => _cargando = false);
    });
    _currentUserId = idUser;
    await chatProvider.fetchMembers();
    if (mounted) setState(() => _cargando = false);
  }

  void _sendMessage() {
    final text = _controller.text.trim();
    if (text.isEmpty) return;
    chatProvider.sendMessage(text, senderId: _currentUserId!);
    _controller.clear();

    Future.delayed(const Duration(milliseconds: 100), () {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOut,
        );
      }
    });
  }

  Widget _buildMemberList(BuildContext context, bool isDrawer) {
    return Container(
      width: isDrawer ? null : 250,
      color: Colors.grey[900],
      child: _cargando
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              // Filtramos miembros para excluir al usuario actual
              itemCount: chatProvider.members
                  .where((m) => m.id != _currentUserId)
                  .length,
              itemBuilder: (context, index) {
                final filteredMembers = chatProvider.members
                    .where((m) => m.id != _currentUserId)
                    .toList();
                final member = filteredMembers[index];
                final selected = member.id == chatProvider.selectedUserId;
                final imgProvider = member.avatarPath.startsWith('http')
                    ? NetworkImage(member.avatarPath)
                    : AssetImage(member.avatarPath) as ImageProvider;

                return ListTile(
                  selected: selected,
                  selectedTileColor: Colors.blueGrey,
                  leading: CircleAvatar(backgroundImage: imgProvider),
                  title: Text(member.name,
                      style: const TextStyle(color: Colors.white)),
                  onTap: () {
                    chatProvider.selectUser(member.id);
                    if (isDrawer) Navigator.of(context).pop();
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
          final bool isLargeScreen = constraints.maxWidth >= 600;
          return Scaffold(
            appBar: AppBar(
              title: const Text('Mensajería Interna'),
              leading: !isLargeScreen
                  ? Builder(
                      builder: (context) => IconButton(
                        icon: const Icon(Icons.menu),
                        onPressed: () => Scaffold.of(context).openDrawer(),
                      ),
                    )
                  : IconButton(
                      icon: const Icon(Icons.arrow_back),
                      onPressed: () => Navigator.pop(context),
                    ),
              actions: [
                PopupMenuButton<String>(
                  onSelected: (value) {
                    if (value == 'Menu Principal') {
                      Navigator.pushReplacementNamed(context, '/');
                    }
                  },
                  itemBuilder: (context) => const [
                    PopupMenuItem(
                        value: 'Menu Principal', child: Text('Menu Principal')),
                  ],
                ),
              ],
            ),
            drawer: !isLargeScreen
                ? Drawer(child: _buildMemberList(context, true))
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
      builder: (_, provider, __) {
        if (provider.selectedUserId == null) {
          return const Center(
            child: Text(
              'Seleccione un usuario para comenzar a chatear',
              style: TextStyle(color: Colors.white, fontSize: 18),
            ),
          );
        }

        final member =
            provider.members.firstWhere((m) => m.id == provider.selectedUserId);
        final messages = provider.messagesForSelectedUser;

        final imgProvider = member.avatarPath.startsWith('http')
            ? NetworkImage(member.avatarPath)
            : AssetImage(member.avatarPath) as ImageProvider;

        return Column(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              color: Colors.grey[850],
              child: Row(
                children: [
                  CircleAvatar(backgroundImage: imgProvider),
                  const SizedBox(width: 12),
                  Text(member.name,
                      style:
                          const TextStyle(color: Colors.white, fontSize: 20)),
                ],
              ),
            ),
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                itemCount: messages.length,
                itemBuilder: (context, index) {
                  final msg = messages[index];
                  final isMe = msg.senderId == _currentUserId;
                  return Align(
                    alignment:
                        isMe ? Alignment.centerRight : Alignment.centerLeft,
                    child: Container(
                      margin: const EdgeInsets.symmetric(
                          vertical: 4, horizontal: 12),
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: isMe ? Colors.blueAccent : Colors.grey[700],
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(msg.text,
                          style: const TextStyle(color: Colors.white)),
                    ),
                  );
                },
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              color: Colors.grey[850],
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      decoration: InputDecoration(
                        hintText: 'Escribe un mensaje...',
                        hintStyle: const TextStyle(color: Colors.white54),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                          borderSide: BorderSide.none,
                        ),
                        filled: true,
                        fillColor: Colors.grey[700],
                      ),
                      style: const TextStyle(color: Colors.white),
                      onSubmitted: (_) => _sendMessage(),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.send, color: Colors.blueAccent),
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

  @override
  void dispose() {
    _controller.dispose();
    _scrollController.dispose();
    super.dispose();
  }
}
