// main.dart
import 'package:admin/controllers/menu_app_controller.dart';
import 'package:admin/providers/auth_providers.dart';
import 'package:admin/providers/miembros_provider.dart';
import 'package:admin/screens/verificacion/verificacion_wrapper.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';

// ‑‑‑ TUS PROPIOS IMPORTS ‑‑‑

import 'screens/auth/login_screen.dart';
import 'screens/auth/register_screen.dart';
import 'screens/home/principal_screen.dart'; // la pantalla solicitada
//  (los siguientes son “stubs”; cámbialos por tus implementaciones reales)
import 'screens/placeholder/grupos_screen.dart';
import 'screens/placeholder/auditoria_screen.dart';
import 'screens/placeholder/eventos_screen.dart';
import 'screens/placeholder/mi_cuenta_screen.dart';
import 'screens/placeholder/mensajeria_screen.dart';

// Colores que ya usabas
const bgColor = Color(0xFF1E1E2C);
const secondaryColor = Color(0xFF2D2D44);

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => MenuAppController()),
        ChangeNotifierProvider(create: (_) => MiembrosProvider()),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Admin Panel',
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: bgColor,
        textTheme: GoogleFonts.poppinsTextTheme(
          Theme.of(context).textTheme,
        ).apply(bodyColor: Colors.white),
        canvasColor: secondaryColor,
      ),

      // ───── RUTAS GLOBALES ─────────────────────────────────────────
      initialRoute: '/',
      routes: {
        // HOME: si el usuario está logueado → PrincipalScreen,
        //       de lo contrario → LoginScreen
        '/': (context) => Consumer<AuthProvider>(
            /* builder: (ctx, auth, _) => auth.isAuthenticated
                  ? const PrincipalScreen()
                  : const LoginScreen(),*/
            builder: (ctx, auth, _) => PrincipalScreen()),

        // Auth
        '/login': (context) => const LoginScreen(),
        '/registro': (context) => const RegisterScreen(),

        // Navegador izquierdo
        '/grupos': (context) => const GruposScreen(),
        '/auditoria': (context) => const AuditoriaScreen(),
        '/eventos': (context) => const EventosScreen(),
        '/verificacion': (context) => const VerificacionWrapper(),

        // Navegador derecho
        '/miCuenta': (context) => const MiCuentaScreen(),
        '/mensajes': (context) => const MensajeriaScreen(),
      },
    );
  }
}
