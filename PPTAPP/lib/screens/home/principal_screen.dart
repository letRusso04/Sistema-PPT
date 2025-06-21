import 'package:admin/providers/auth_providers.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

/// ───── MODELO DE DEMO ──────────────────────────────────────────────
class Post {
  final String imagen;
  final String texto;
  final DateTime fecha;
  const Post({required this.imagen, required this.texto, required this.fecha});
}

final _postsDemo = [
  Post(
    imagen: 'assets/images/banner4.jpg',
    texto:
        'El Partido Patria para Todos (PPT) presentará este lunes en rueda de prensa ocho precandidatos para las venideras elecciones de gobernadores del 25 de mayo, propuesta que será analizada y debatida en la reunión general que sostendrán con el Gran Polo Patriótico (GPP), instancia donde convergen todas las organizaciones políticas revolucionarias, anunció la secretaria general de la tolda azul, Ilenia Medina. Durante una entrevista concedida en el programa «Al Aire», que transmite Venezolana de Televisión, la diputada Medina afirmó que «desde el seno del PPT consideran que se requieren figuras que hayan estado toda su vida en el proceso revolucionario, con visiones muy contundentes para asumir cargos en el caso de los gobernadores, y de estos que serán presentados hay una mujer, el resto de las compañeras con mucha fuerza optaron para desarrollar los trabajos en los respectivos estados',
    fecha: DateTime(2025, 6, 14, 10, 30),
  ),
  Post(
    imagen: 'assets/images/banner5.jpg',
    texto:
        'El Consejo Nacional Electoral (CNE) proclamó oficialmente a los nuevos diputados de la Asamblea Nacional la victoria del partido oficialista, el Gran Polo Patriótico Simón Bolívar (GPPSB) con 253 escaños y 23 gobernaciones. La jornada electoral, con una participación del 43,18%, fue calificada por el CNE como una muestra de civismo y madurez democrática del pueblo venezolano.',
    fecha: DateTime(2025, 6, 13, 16, 15),
  ),
];

/// ───── PANTALLA PRINCIPAL ─────────────────────────────────────────
class PrincipalScreen extends StatelessWidget {
  PrincipalScreen({Key? key}) : super(key: key);

  final _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,

      // ‑‑‑‑‑ Drawers
      drawer: _LeftDrawer(onNavigate: (route) {
        Navigator.pop(context); // cierra drawer
        if (ModalRoute.of(context)?.settings.name != route) {
          Navigator.pushNamed(context, route);
        }
      }),
      endDrawer: _RightDrawer(onLogout: () {
        context.read<AuthProvider>().logout();
        Navigator.pushNamedAndRemoveUntil(context, '/', (_) => false);
      }, onNavigate: (route) {
        Navigator.pop(context);
        if (ModalRoute.of(context)?.settings.name != route) {
          Navigator.pushNamed(context, route);
        }
      }),

      // ‑‑‑‑‑ AppBar
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.black54,
        title: const Text('Principal'),
        leading: IconButton(
          icon: const Icon(Icons.menu),
          onPressed: () => _scaffoldKey.currentState?.openDrawer(),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.account_circle_outlined),
            onPressed: () => _scaffoldKey.currentState?.openEndDrawer(),
          ),
        ],
      ),

      // ‑‑‑‑‑ Contenido
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
        child: ListView(
          children: [
            Text('Últimas publicaciones',
                style: GoogleFonts.poppins(
                    fontSize: 24, fontWeight: FontWeight.w600)),
            const SizedBox(height: 16),
            ..._postsDemo.map((p) => _PostCard(post: p)),
          ],
        ),
      ),
    );
  }
}

/// ───── Drawer izquierdo ───────────────────────────────────────────
class _LeftDrawer extends StatelessWidget {
  const _LeftDrawer({required this.onNavigate});

  final void Function(String route) onNavigate;

  @override
  Widget build(BuildContext context) {
    TextStyle style = GoogleFonts.poppins(fontSize: 14);

    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          const DrawerHeader(
            decoration: BoxDecoration(color: Colors.black54),
            child: Text('Menú principal',
                style: TextStyle(fontSize: 18, color: Colors.white)),
          ),
          _tile('Principal', '/', style),
          _tile('Verificacion', '/verificacion', style),
          _tile('Grupos', '/grupos', style),
          _tile('Auditoría', '/auditoria', style),
          _tile('Eventos', '/eventos', style),
        ],
      ),
    );
  }

  ListTile _tile(String title, String route, TextStyle s) => ListTile(
        title: Text(title, style: s),
        onTap: () => onNavigate(route),
      );
}

/// ───── Drawer derecho ─────────────────────────────────────────────
class _RightDrawer extends StatelessWidget {
  const _RightDrawer({
    required this.onNavigate,
    required this.onLogout,
  });

  final void Function(String route) onNavigate;
  final VoidCallback onLogout;

  @override
  Widget build(BuildContext context) {
    TextStyle style = GoogleFonts.poppins(fontSize: 14);

    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          const DrawerHeader(
            decoration: BoxDecoration(color: Colors.black54),
            child: Text('Opciones de usuario',
                style: TextStyle(fontSize: 18, color: Colors.white)),
          ),
          _tile('Mi cuenta', '/miCuenta', style),
          _tile('Mensajería', '/mensajes', style),
          ListTile(
            leading: const Icon(Icons.logout),
            title: Text('Desconectarse', style: style),
            onTap: onLogout,
          ),
        ],
      ),
    );
  }

  ListTile _tile(String title, String route, TextStyle s) => ListTile(
        title: Text(title, style: s),
        onTap: () => onNavigate(route),
      );
}

/// ───── Card de publicación ────────────────────────────────────────
class _PostCard extends StatelessWidget {
  final Post post;
  const _PostCard({required this.post});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 6,
      margin: const EdgeInsets.only(bottom: 24),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Cabecera
          Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              children: [
                const CircleAvatar(
                  radius: 20,
                  backgroundImage: AssetImage('assets/images/PPTLogo.png'),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Desarrollador del sistema PPT',
                          style:
                              GoogleFonts.poppins(fontWeight: FontWeight.w600)),
                      Text(_fechaBonita(post.fecha),
                          style: GoogleFonts.poppins(fontSize: 12)),
                    ],
                  ),
                ),
              ],
            ),
          ),
          // Imagen
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.zero),
            child: Image.asset(post.imagen,
                width: double.infinity, fit: BoxFit.cover),
          ),
          // Texto
          Padding(
            padding: const EdgeInsets.all(12),
            child: Text(post.texto, style: GoogleFonts.poppins(fontSize: 14)),
          ),
        ],
      ),
    );
  }

  String _fechaBonita(DateTime f) {
    const meses = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ];
    return '${f.day.toString().padLeft(2, '0')} '
        '${meses[f.month - 1]} '
        '${f.year} – '
        '${f.hour.toString().padLeft(2, '0')}:${f.minute.toString().padLeft(2, '0')}';
  }
}
