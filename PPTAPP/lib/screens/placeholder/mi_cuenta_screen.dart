import 'dart:io';
import 'package:admin/env/api.dart';
import 'package:admin/providers/profile_provider.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MiCuentaScreen extends StatefulWidget {
  const MiCuentaScreen({Key? key}) : super(key: key);

  @override
  State<MiCuentaScreen> createState() => _MiCuentaScreenState();
}

class _MiCuentaScreenState extends State<MiCuentaScreen> {
  String nombre = '';
  String correo = '';
  String cedula = '';
  String ubicacion = '';

  String? imagePathLocal; // ruta local tras seleccionar
  String? imageUrl; // url remota guardada

  final _formKey = GlobalKey<FormState>();
  final _passwordController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final ImagePicker _picker = ImagePicker();

  @override
  void initState() {
    super.initState();
    _cargarDatosUsuario();
  }

  Future<void> _cargarDatosUsuario() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      nombre = prefs.getString('nombre') ?? 'Invitado';
      correo = prefs.getString('email') ?? '';
      cedula = prefs.getInt('cedula')?.toString() ?? '';
      ubicacion = prefs.getString('ubicacion') ?? '';
      imageUrl = prefs.getString('imageUrl'); // ← nueva línea
    });
  }

  Future<void> _cambiarImagen() async {
    final XFile? picked = await _picker.pickImage(source: ImageSource.gallery);
    if (picked == null) return;

    setState(() => imagePathLocal = picked.path); // feedback inmediato

    try {
      await context.read<ProfileProvider>().updateAvatar(
            archivo: File(picked.path),
          );
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('Avatar actualizado'), backgroundColor: Colors.green),
      );

      // La API debió guardar y devolver nueva URL; recárgala:
      await _cargarDatosUsuario(); // refresca imageUrl
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
            content: Text('Fallo al subir imagen: $e'),
            backgroundColor: Colors.red),
      );
    }
  }

  Future<int> _cambiarContrasena() async {
    if (!_formKey.currentState!.validate()) return 0;
    setState(() {});
    // Verifica que la contrasena sea iguales validacion antes de enviar.
    final prefs = await SharedPreferences.getInstance();
    // envia los datos al servidor
    int iduserD = prefs.getInt('iduser') ?? 0;
    print("datalist");
    print(_newPasswordController);
    print(_confirmPasswordController);

    if (iduserD == 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text(
                'Verifica los datos de la contraseña, o intenta más tarde.')),
      );
      return 0;
    }
    try {
      String anuncio = '';
      final response = await context.read<ProfileProvider>().cambiarcontra(
          iduser: iduserD,
          passwordController: _passwordController.text,
          newPasswordController: _newPasswordController.text);
      switch (response) {
        case 0:
          anuncio = 'Hubo un error en la solicitud con el servidor.';
        case 1:
          anuncio = 'Contraseña cambiada con éxito';
        case 2:
          anuncio =
              'La contraseña que introduciste no es correcta, verifica los datos.';
      }
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(anuncio)),
      );
    } catch (e) {
      print(e);
    }
    _passwordController.clear();
    _newPasswordController.clear();
    _confirmPasswordController.clear();
    return 0;
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
    ImageProvider avatarProvider;
    if (imagePathLocal != null) {
      avatarProvider = FileImage(File(imagePathLocal!)); // recién elegida
    } else if (imageUrl != 'false') {
      avatarProvider = NetworkImage('$imageUrlData/$imageUrl'); // URL API
    } else {
      avatarProvider = const AssetImage('assets/images/PPTLogo.png');
    }
    return Scaffold(
      appBar: AppBar(title: const Text('Mi Cuenta')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            CircleAvatar(radius: 60, backgroundImage: avatarProvider),
            TextButton.icon(
              onPressed: _cambiarImagen,
              icon: const Icon(Icons.camera_alt),
              label: const Text('Cambiar foto'),
            ),
            const SizedBox(height: 20),

            _buildInfoCard('Nombre', nombre),
            _buildInfoCard('Correo', correo),
            _buildInfoCard('Cédula', cedula),
            _buildInfoCard('Ubicación', ubicacion),

            const SizedBox(height: 30),

            // … resto de la UI (formulario contraseña) …
            //   sin cambios respecto a tu versión anterior
            Form(
              key: _formKey,
              child: Column(
                children: [
                  _buildPasswordField('Contraseña actual', _passwordController),
                  const SizedBox(height: 15),
                  _buildPasswordField(
                      'Nueva contraseña', _newPasswordController),
                  const SizedBox(height: 15),
                  TextFormField(
                    controller: _confirmPasswordController,
                    obscureText: true,
                    decoration: const InputDecoration(
                      labelText: 'Confirmar nueva contraseña',
                      border: OutlineInputBorder(),
                    ),
                    validator: (v) => v != _newPasswordController.text
                        ? 'Las contraseñas no coinciden'
                        : null,
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: _cambiarContrasena,
                    child: const Text('Cambiar contraseña'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Helpers
  Widget _buildInfoCard(String title, String value) => Card(
        child: ListTile(title: Text(title), subtitle: Text(value)),
      );

  Widget _buildPasswordField(String label, TextEditingController c) =>
      TextFormField(
        controller: c,
        obscureText: true,
        decoration: InputDecoration(
            labelText: label, border: const OutlineInputBorder()),
        validator: (v) => (v == null || v.isEmpty) ? 'Campo requerido' : null,
      );
}
