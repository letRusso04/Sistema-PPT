import 'dart:io';

import 'package:flutter/material.dart';
import "package:image_picker/image_picker.dart"; // Para tomar o elegir imagen

class MiCuentaScreen extends StatefulWidget {
  const MiCuentaScreen({Key? key}) : super(key: key);

  @override
  _MiCuentaScreenState createState() => _MiCuentaScreenState();
}

class _MiCuentaScreenState extends State<MiCuentaScreen> {
  // Simulando datos del usuario (en producción obtendría esto de la API o estado)
  String nombre = "Juan Pérez";
  String correo = "juan.perez@example.com";
  String cedula = "V-12345678";
  String ubicacion = "Caracas, Venezuela";

  String? imagePath; // Ruta local de la imagen seleccionada

  final _formKey = GlobalKey<FormState>();
  final _passwordController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  final ImagePicker _picker = ImagePicker();

  Future<void> _cambiarImagen() async {
    final XFile? image = await _picker.pickImage(source: ImageSource.gallery);
    if (image != null) {
      setState(() {
        imagePath = image.path;
      });
    }
  }

  void _cambiarContrasena() {
    if (_formKey.currentState!.validate()) {
      // Aquí colocar lógica para cambiar la contraseña en backend o estado
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Contraseña cambiada con éxito')),
      );
      _passwordController.clear();
      _newPasswordController.clear();
      _confirmPasswordController.clear();
    }
  }

  @override
  void dispose() {
    _passwordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mi Cuenta'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            // Foto de perfil
            CircleAvatar(
              radius: 60,
              backgroundImage: imagePath != null
                  ? FileImage(File(imagePath!))
                  : const AssetImage('assets/images/PPTLogo.png')
                      as ImageProvider,
            ),
            TextButton.icon(
              onPressed: _cambiarImagen,
              icon: const Icon(Icons.camera_alt),
              label: const Text('Cambiar foto'),
            ),
            const SizedBox(height: 20),

            // Datos personales
            Card(
              child: ListTile(
                title: const Text('Nombre'),
                subtitle: Text(nombre),
              ),
            ),
            Card(
              child: ListTile(
                title: const Text('Correo'),
                subtitle: Text(correo),
              ),
            ),
            Card(
              child: ListTile(
                title: const Text('Cédula'),
                subtitle: Text(cedula),
              ),
            ),
            Card(
              child: ListTile(
                title: const Text('Ubicación'),
                subtitle: Text(ubicacion),
              ),
            ),

            const SizedBox(height: 30),

            // Cambiar contraseña
            Form(
              key: _formKey,
              child: Column(
                children: [
                  TextFormField(
                    controller: _passwordController,
                    decoration: const InputDecoration(
                      labelText: 'Contraseña actual',
                      border: OutlineInputBorder(),
                    ),
                    obscureText: true,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Ingrese su contraseña actual';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 15),
                  TextFormField(
                    controller: _newPasswordController,
                    decoration: const InputDecoration(
                      labelText: 'Nueva contraseña',
                      border: OutlineInputBorder(),
                    ),
                    obscureText: true,
                    validator: (value) {
                      if (value == null || value.length < 6) {
                        return 'La nueva contraseña debe tener al menos 6 caracteres';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 15),
                  TextFormField(
                    controller: _confirmPasswordController,
                    decoration: const InputDecoration(
                      labelText: 'Confirmar nueva contraseña',
                      border: OutlineInputBorder(),
                    ),
                    obscureText: true,
                    validator: (value) {
                      if (value != _newPasswordController.text) {
                        return 'Las contraseñas no coinciden';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: _cambiarContrasena,
                    child: const Text('Cambiar contraseña'),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
