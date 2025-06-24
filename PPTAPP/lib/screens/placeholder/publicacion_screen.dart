import 'dart:convert';
import 'dart:io';

import 'package:admin/env/api.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PublicacionScreen extends StatefulWidget {
  const PublicacionScreen({Key? key}) : super(key: key);

  @override
  State<PublicacionScreen> createState() => _PublicacionScreenState();
}

class _PublicacionScreenState extends State<PublicacionScreen> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _contentController = TextEditingController();
  File? _image;
  bool _isLoading = false;

  final ImagePicker _picker = ImagePicker();

  Future<void> _pickImage() async {
    final XFile? pickedFile =
        await _picker.pickImage(source: ImageSource.gallery, imageQuality: 80);

    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path);
      });
    }
  }

  Future<void> _submitPublication() async {
    final title = _titleController.text.trim();
    final content = _contentController.text.trim();

    if (title.isEmpty || content.isEmpty || _image == null) {
      ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Por favor completa todos los campos')));
      return;
    }

    setState(() => _isLoading = true);

    try {
      // Convertir la imagen a base64
      final bytes = await _image!.readAsBytes();
      final base64Image = base64Encode(bytes);
      final prefs = await SharedPreferences.getInstance();
      final currentUserId = prefs.getInt('iduser')?.toString() ?? '0';
      final response = await http.post(
        Uri.parse('$baseUrl/publicaciones/guardar'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'title': title,
          'content': content,
          'image_base64': base64Image,
          'iduser': currentUserId,
          'timestamp': DateTime.now().toIso8601String(),
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        if (response.body == 'BAD_QUERY_RESPONSE') {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
              content: Text(
                  'Error: Hubo un error en el guardado, intente más tarde.')));
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Publicación guardada con éxito')));
          _titleController.clear();
          _contentController.clear();
          setState(() => _image = null);
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Error: ${response.statusCode}')));
      }
    } catch (e) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Error: $e')));
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Crear Publicación')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: SingleChildScrollView(
          child: Column(
            children: [
              TextField(
                controller: _titleController,
                decoration: const InputDecoration(labelText: 'Título'),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _contentController,
                decoration: const InputDecoration(labelText: 'Contenido'),
                maxLines: 5,
              ),
              const SizedBox(height: 12),
              _image == null
                  ? TextButton.icon(
                      icon: const Icon(Icons.image),
                      label: const Text('Seleccionar Imagen'),
                      onPressed: _pickImage,
                    )
                  : Column(
                      children: [
                        Image.file(_image!, height: 200),
                        TextButton.icon(
                          icon: const Icon(Icons.edit),
                          label: const Text('Cambiar Imagen'),
                          onPressed: _pickImage,
                        ),
                      ],
                    ),
              const SizedBox(height: 24),
              _isLoading
                  ? const CircularProgressIndicator()
                  : ElevatedButton(
                      onPressed: _submitPublication,
                      child: const Text('Guardar Publicación'),
                    ),
            ],
          ),
        ),
      ),
    );
  }
}
