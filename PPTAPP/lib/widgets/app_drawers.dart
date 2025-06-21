import 'package:admin/providers/auth_providers.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class LeftDrawer extends StatelessWidget {
  const LeftDrawer({required this.onNavigate, Key? key}) : super(key: key);
  final void Function(String route) onNavigate;

  @override
  Widget build(BuildContext context) {
    TextStyle s = const TextStyle(fontSize: 14);

    ListTile tile(String t, String r) =>
        ListTile(title: Text(t, style: s), onTap: () => onNavigate(r));

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
          tile('Registro', '/registro'),
          tile('Grupos', '/grupos'),
          tile('Auditoría', '/auditoria'),
          tile('Eventos', '/eventos'),
          tile('Verificación', '/verificacion'),
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
