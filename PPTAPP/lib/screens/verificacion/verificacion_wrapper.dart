import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../widgets/app_drawers.dart';
import 'miembros_screen.dart';
import 'validar_screen.dart';

class VerificacionWrapper extends StatefulWidget {
  const VerificacionWrapper({Key? key}) : super(key: key);

  @override
  State<VerificacionWrapper> createState() => _VerificacionWrapperState();
}

class _VerificacionWrapperState extends State<VerificacionWrapper> {
  final _scaffoldKey = GlobalKey<ScaffoldState>();
  int _index = 0; // 0‑Miembros, 1‑Validar
  bool _isAdmin = false;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _checkAdmin();
  }

  Future<void> _checkAdmin() async {
    final prefs = await SharedPreferences.getInstance();
    final adminValue = prefs.getInt('admin') ?? 0;
    setState(() {
      _isAdmin = adminValue == 1;
      _loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    Widget body;
    if (_index == 0) {
      // Siempre mostrar Miembros
      body = const MiembrosScreen();
    } else {
      // Mostrar Verificación sólo si es admin, si no mostrar mensaje
      if (_isAdmin) {
        body = const ValidarScreen();
      } else {
        body = Center(
          child: Text(
            'Acceso denegado.\nSolo administradores pueden ver esta sección.',
            textAlign: TextAlign.center,
            style: GoogleFonts.poppins(fontSize: 16, color: Colors.redAccent),
          ),
        );
      }
    }

    return Scaffold(
      key: _scaffoldKey,
      drawer: LeftDrawer(onNavigate: (r) {
        Navigator.pop(context);
        if (ModalRoute.of(context)?.settings.name != r) {
          Navigator.pushNamed(context, r);
        }
      }),
      endDrawer: RightDrawer(onNavigate: (r) {
        Navigator.pop(context);
        if (ModalRoute.of(context)?.settings.name != r) {
          Navigator.pushNamed(context, r);
        }
      }),
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.black54,
        title: Text('Verificación',
            style: GoogleFonts.poppins(fontWeight: FontWeight.w500)),
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
      body: Row(
        children: [
          NavigationRail(
            selectedIndex: _index,
            onDestinationSelected: (i) {
              // Si no es admin y quiere entrar a Verificación (índice 1), bloqueamos la selección y mostramos mensaje
              if (i == 1 && !_isAdmin) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                      content: Text(
                          'Solo administradores pueden acceder a Verificación')),
                );
                return;
              }
              setState(() => _index = i);
            },
            labelType: NavigationRailLabelType.all,
            destinations: [
              const NavigationRailDestination(
                icon: Icon(Icons.group_outlined),
                selectedIcon: Icon(Icons.group),
                label: Text('Miembros'),
              ),
              NavigationRailDestination(
                icon: Icon(
                  Icons.verified_user_outlined,
                  color: _isAdmin ? null : Colors.grey,
                ),
                selectedIcon: Icon(
                  Icons.verified_user,
                  color: _isAdmin ? null : Colors.grey,
                ),
                label: Text(
                  'Verificación',
                  style: TextStyle(color: _isAdmin ? null : Colors.grey),
                ),
              ),
            ],
          ),
          const VerticalDivider(width: 1),
          Expanded(child: body),
        ],
      ),
    );
  }
}
