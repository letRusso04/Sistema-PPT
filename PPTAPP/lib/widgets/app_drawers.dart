import 'package:admin/providers/auth_providers.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LeftDrawer extends StatefulWidget {
  const LeftDrawer({required this.onNavigate, Key? key}) : super(key: key);
  final void Function(String route) onNavigate;

  @override
  State<LeftDrawer> createState() => _LeftDrawerState();
}

class _LeftDrawerState extends State<LeftDrawer> {
  int? _admin; // null mientras carga

  @override
  void initState() {
    super.initState();
    _loadAdmin();
  }

  Future<void> _loadAdmin() async {
    final prefs = await SharedPreferences.getInstance();
    final adminValue = prefs.getInt('admin') ?? 0;
    setState(() {
      _admin = adminValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    TextStyle s = const TextStyle(fontSize: 14);

    ListTile tile(String t, String r) =>
        ListTile(title: Text(t, style: s), onTap: () => widget.onNavigate(r));

    if (_admin == null) {
      // Mientras carga, muestra un placeholder o nada
      return Drawer(
        child: Center(child: CircularProgressIndicator()),
      );
    }

    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          const DrawerHeader(
            decoration: BoxDecoration(color: Colors.black54),
            child: Text('Menú principal',
                style: TextStyle(fontSize: 18, color: Colors.white)),
          ),
          tile('Principal', '/'),
          tile('Verificacion', '/verificacion'),
          if (_admin == 1) ...[
            tile('Auditoría', '/auditoria'),
            tile('Publicacion', '/publicacion'),
          ],
          tile('Eventos', '/eventos'),
        ],
      ),
    );
  }
}

class RightDrawer extends StatelessWidget {
  const RightDrawer({required this.onNavigate, Key? key}) : super(key: key);
  final void Function(String route) onNavigate;

  @override
  Widget build(BuildContext context) {
    TextStyle s = const TextStyle(fontSize: 14);
    final auth = context.read<AuthProvider>();

    ListTile tile(String t, String r) =>
        ListTile(title: Text(t, style: s), onTap: () => onNavigate(r));

    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          const DrawerHeader(
            decoration: BoxDecoration(color: Colors.black54),
            child: Text('Opciones de usuario',
                style: TextStyle(fontSize: 18, color: Colors.white)),
          ),
          tile('Mi cuenta', '/miCuenta'),
          tile('Mensajería', '/mensajes'),
          ListTile(
            leading: const Icon(Icons.logout),
            title: Text('Desconectarse', style: s),
            onTap: () {
              auth.logout();
              Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
            },
          ),
        ],
      ),
    );
  }
}
