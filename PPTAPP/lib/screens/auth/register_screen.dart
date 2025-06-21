// lib/screens/auth/register_screen.dart
import 'package:admin/providers/auth_providers.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({Key? key}) : super(key: key);

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailCtrl = TextEditingController();
  final _nombreCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  final _cedulaCtrl = TextEditingController();
  final _ubicCtrl = TextEditingController();
  String? _estadoSel;

  bool _loading = false;
  String? _error;

  final _estados = const [
    'Amazonas',
    'Anzoátegui',
    'Apure',
    'Aragua',
    'Barinas',
    'Bolívar',
    'Carabobo',
    'Cojedes',
    'Delta Amacuro',
    'Falcón',
    'Guárico',
    'La Guaira',
    'Lara',
    'Mérida',
    'Miranda',
    'Monagas',
    'Nueva Esparta',
    'Portuguesa',
    'Sucre',
    'Táchira',
    'Trujillo',
    'Yaracuy',
    'Zulia',
    'Distrito Capital'
  ];

  @override
  void dispose() {
    _emailCtrl.dispose();
    _nombreCtrl.dispose();
    _passCtrl.dispose();
    _cedulaCtrl.dispose();
    _ubicCtrl.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      await context.read<AuthProvider>().register(
            email: _emailCtrl.text.trim(),
            nombre: _nombreCtrl.text.trim(),
            password: _passCtrl.text,
            cedula: _cedulaCtrl.text.trim(),
            ubicacion: _ubicCtrl.text.trim(),
            estado: _estadoSel!,
          );
      // al registrarse, volverá a MainScreen gracias al auto‑login
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          Image.asset(
            'assets/images/banner3des.png',
            fit: BoxFit.cover,
          ),
          Container(color: Colors.black.withOpacity(0.5)),
          Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 480),
              child: Card(
                elevation: 12,
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12)),
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Form(
                    key: _formKey,
                    child: SingleChildScrollView(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text('Crear cuenta',
                              style: Theme.of(context).textTheme.headlineSmall),
                          const SizedBox(height: 24),

                          // Correo
                          TextFormField(
                            controller: _emailCtrl,
                            decoration: const InputDecoration(
                              prefixIcon: Icon(Icons.email_outlined),
                              labelText: 'Email',
                            ),
                            validator: (v) => (v == null || !v.contains('@'))
                                ? 'Email inválido'
                                : null,
                          ),
                          const SizedBox(height: 16),

                          // Nombre
                          TextFormField(
                            controller: _nombreCtrl,
                            decoration: const InputDecoration(
                              prefixIcon: Icon(Icons.person_outline),
                              labelText: 'Nombre completo',
                            ),
                            validator: (v) =>
                                (v == null || v.isEmpty) ? 'Requerido' : null,
                          ),
                          const SizedBox(height: 16),

                          // Contraseña
                          TextFormField(
                            controller: _passCtrl,
                            decoration: const InputDecoration(
                              prefixIcon: Icon(Icons.lock_outline),
                              labelText: 'Contraseña',
                            ),
                            obscureText: true,
                            validator: (v) => (v == null || v.length < 6)
                                ? 'Mínimo 6 caracteres'
                                : null,
                          ),
                          const SizedBox(height: 16),

                          // Cédula
                          TextFormField(
                            controller: _cedulaCtrl,
                            decoration: const InputDecoration(
                              prefixIcon: Icon(Icons.badge_outlined),
                              labelText: 'Cédula de identidad',
                            ),
                            keyboardType: TextInputType.number,
                            inputFormatters: [
                              FilteringTextInputFormatter.digitsOnly
                            ],
                            validator: (v) =>
                                (v == null || v.isEmpty) ? 'Requerido' : null,
                          ),
                          const SizedBox(height: 16),

                          // Ubicación
                          TextFormField(
                            controller: _ubicCtrl,
                            decoration: const InputDecoration(
                              prefixIcon: Icon(Icons.location_on_outlined),
                              labelText: 'Ubicación (dirección breve)',
                            ),
                            validator: (v) =>
                                (v == null || v.isEmpty) ? 'Requerido' : null,
                          ),
                          const SizedBox(height: 16),

                          // Dropdown estados
                          DropdownButtonFormField<String>(
                            value: _estadoSel,
                            decoration: const InputDecoration(
                              prefixIcon: Icon(Icons.map_outlined),
                              labelText: 'Estado',
                            ),
                            items: _estados
                                .map((e) =>
                                    DropdownMenuItem(value: e, child: Text(e)))
                                .toList(),
                            onChanged: (v) => setState(() => _estadoSel = v),
                            validator: (v) =>
                                v == null ? 'Selecciona un estado' : null,
                          ),

                          if (_error != null) ...[
                            const SizedBox(height: 12),
                            Text(_error!,
                                style: const TextStyle(color: Colors.red)),
                          ],
                          const SizedBox(height: 24),

                          SizedBox(
                            width: double.infinity,
                            height: 48,
                            child: ElevatedButton(
                              onPressed: _loading ? null : _submit,
                              child: _loading
                                  ? const CircularProgressIndicator()
                                  : const Text('Registrarme'),
                            ),
                          ),
                          const SizedBox(height: 12),

                          TextButton(
                            onPressed: () =>
                                Navigator.pop(context), // vuelve al login
                            child: const Text('Ya tengo una cuenta'),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
