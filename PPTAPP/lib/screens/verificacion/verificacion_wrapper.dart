import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
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

  @override
  Widget build(BuildContext context) {
    Widget body = _index == 0 ? const MiembrosScreen() : const ValidarScreen();

    return Scaffold(
      key: _scaffoldKey,

      // ─── drawers idénticos al home ─────────────────────────────
      drawer: LeftDrawer(onNavigate: (r) {
        Navigator.pop(context); // cierra drawer
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

      // ─── AppBar igual al PrincipalScreen ──────────────────────
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

      // ─── NavigationRail + contenido ───────────────────────────
      body: Row(
        children: [
          NavigationRail(
            selectedIndex: _index,
            onDestinationSelected: (i) => setState(() => _index = i),
            labelType: NavigationRailLabelType.all,
            destinations: const [
              NavigationRailDestination(
                icon: Icon(Icons.group_outlined),
                selectedIcon: Icon(Icons.group),
                label: Text('Miembros'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.verified_user_outlined),
                selectedIcon: Icon(Icons.verified_user),
                label: Text('Verificación'),
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
