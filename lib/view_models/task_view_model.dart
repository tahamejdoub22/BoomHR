import 'dart:developer';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'dart:convert';

import '../models/task_model.dart';

class TaskViewModel {
  final String apiUrl =
      Platform.isAndroid ? "10.0.2.2:8080/task/all" : "localhost:8080/task/all";
  Future<List<dynamic>> getTasks() async {
    final response = await http.get(Uri.parse(apiUrl),
        headers: <String, String>{
          'Content-Type': 'apllication/json; charset=UTF-8'
        });
    if (response.statusCode == 200) {
      final decodedResponse = json.decode(response.body);
      return (decodedResponse as List)
          .map((e) => TaskModel.fromJson(e))
          .toList();
    } else {
      throw Exception('Failed to get tasks');
    }
  }
}
