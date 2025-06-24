import 'dart:typed_data'; // necesario para Uint8List
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

// Este es el nuevo widget para cargar la imagen con keep-alive
class NetworkImageWithKeepAlive extends StatefulWidget {
  final String imageUrl;

  const NetworkImageWithKeepAlive({required this.imageUrl, Key? key})
      : super(key: key);

  @override
  _NetworkImageWithKeepAliveState createState() =>
      _NetworkImageWithKeepAliveState();
}

class _NetworkImageWithKeepAliveState extends State<NetworkImageWithKeepAlive> {
  Uint8List? _imageBytes;
  bool _loading = true;
  bool _error = false;

  @override
  void initState() {
    super.initState();
    _fetchImage();
  }

  Future<void> _fetchImage() async {
    try {
      final response = await http.get(
        Uri.parse(widget.imageUrl),
        headers: {'Connection': 'keep-alive'},
      );
      if (response.statusCode == 200) {
        setState(() {
          _imageBytes = response.bodyBytes;
          _loading = false;
        });
      } else {
        setState(() {
          _error = true;
          _loading = false;
        });
      }
    } catch (e) {
      setState(() {
        _error = true;
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Center(child: CircularProgressIndicator());
    }
    if (_error || _imageBytes == null) {
      return const Center(
        child: Icon(Icons.broken_image, size: 100, color: Colors.grey),
      );
    }
    return Image.memory(
      _imageBytes!,
      width: double.infinity,
      fit: BoxFit.cover,
    );
  }
}
