import 'package:admin/env/api.dart';
import 'package:admin/providers/auth_providers.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:admin/widgets/network_image_keep_alive.dart';

class Post {
  final String imagen;
  final String titulo;
  final String texto;
  final DateTime fecha;

  const Post({
    required this.imagen,
    required this.titulo,
    required this.texto,
    required this.fecha,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    print("postimage $imagePostData/\${imagenes}");
    return Post(
      imagen: json['post_urlimage'] ?? '',
      titulo: json['post_title'] ?? '',
      texto: json['post_content'] ?? '',
      fecha: DateTime.parse(json['post_date']),
    );
  }
}

Future<List<Post>> fetchPublicaciones() async {
  final response = await http.post(
    Uri.parse('$baseUrl/publicaciones/llamar'),
    headers: {"Connection": "Keep-Alive", "Keep-Alive": "timeout=5, max=1000"},
  );
  print("respuesta \${json.decode(response.body)}");
  if (response.statusCode == 200) {
    List<dynamic> data = json.decode(response.body);
    return data.map((item) => Post.fromJson(item)).toList();
  } else {
    throw Exception('Error al cargar publicaciones');
  }
}

Future<bool> isImageReachable(String url) async {
  try {
    final response = await http.get(Uri.parse(url));
    return response.statusCode == 200;
  } catch (_) {
    return false;
  }
}

class PrincipalScreen extends StatefulWidget {
  @override
  _PrincipalScreenState createState() => _PrincipalScreenState();
}

class _PrincipalScreenState extends State<PrincipalScreen> {
  final _scaffoldKey = GlobalKey<ScaffoldState>();
  late Future<List<Post>> _futurePosts;

  @override
  void initState() {
    super.initState();
    _futurePosts = fetchPublicaciones();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      drawer: _LeftDrawer(onNavigate: _navigate),
      endDrawer: _RightDrawer(onLogout: _logout, onNavigate: _navigate),
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
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
        child: FutureBuilder<List<Post>>(
          future: _futurePosts,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError ||
                snapshot.data == null ||
                snapshot.data!.isEmpty) {
              return Card(
                elevation: 4,
                margin: const EdgeInsets.only(bottom: 24),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12)),
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.info_outline,
                          size: 48, color: Colors.grey),
                      const SizedBox(height: 12),
                      Text(
                        'No hay publicaciones disponibles.',
                        style: GoogleFonts.poppins(
                            fontSize: 16, color: Colors.grey[600]),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              );
            }

            final posts = snapshot.data!;
            return ListView(
              children: [
                Text('Últimas publicaciones',
                    style: GoogleFonts.poppins(
                        fontSize: 24, fontWeight: FontWeight.w600)),
                const SizedBox(height: 16),
                ...posts.map((p) => _PostCard(post: p)),
              ],
            );
          },
        ),
      ),
    );
  }

  void _navigate(String route) {
    Navigator.pop(context);
    if (ModalRoute.of(context)?.settings.name != route) {
      Navigator.pushNamed(context, route);
    }
  }

  void _logout() {
    context.read<AuthProvider>().logout();
    Navigator.pushNamedAndRemoveUntil(context, '/', (_) => false);
  }
}

class _LeftDrawer extends StatefulWidget {
  const _LeftDrawer({required this.onNavigate});

  final void Function(String route) onNavigate;

  @override
  State<_LeftDrawer> createState() => _LeftDrawerState();
}

class _LeftDrawerState extends State<_LeftDrawer> {
  int? _admin;

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
    TextStyle style = GoogleFonts.poppins(fontSize: 14);

    if (_admin == null) {
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
          _tile('Principal', '/', style),
          _tile('Verificacion', '/verificacion', style),
          if (_admin == 1) ...[
            _tile('Auditoría', '/auditoria', style),
            _tile('Publicacion', '/publicacion', style),
          ],
          _tile('Eventos', '/eventos', style),
        ],
      ),
    );
  }

  ListTile _tile(String title, String route, TextStyle s) => ListTile(
        title: Text(title, style: s),
        onTap: () => widget.onNavigate(route),
      );
}

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

class _PostCard extends StatelessWidget {
  final Post post;
  const _PostCard({required this.post});

  @override
  Widget build(BuildContext context) {
    final imageUrl = '$imagePostData/${post.imagen}';

    return Card(
      elevation: 6,
      margin: const EdgeInsets.only(bottom: 24),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
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
          if (post.imagen.isNotEmpty)
            FutureBuilder<bool>(
              future: isImageReachable(imageUrl),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const SizedBox(
                    height: 180,
                    child: Center(child: CircularProgressIndicator()),
                  );
                } else if (snapshot.hasData && snapshot.data == true) {
                  return ClipRRect(
                    borderRadius: const BorderRadius.vertical(top: Radius.zero),
                    child: NetworkImageWithKeepAlive(
                      imageUrl: '$imagePostData/${post.imagen}',
                    ),
                  );
                } else {
                  return const Padding(
                    padding: EdgeInsets.all(16),
                    child:
                        Icon(Icons.broken_image, size: 100, color: Colors.grey),
                  );
                }
              },
            ),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(post.titulo,
                    style: GoogleFonts.poppins(
                        fontSize: 16, fontWeight: FontWeight.w600)),
                const SizedBox(height: 6),
                Text(post.texto, style: GoogleFonts.poppins(fontSize: 14)),
              ],
            ),
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
