import 'dart:developer';

import 'package:boomhr/models/task_model.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class TaskViewModel {
  Future<List<dynamic>> getTasks() async {
    final response = await http.get(
        Uri.parse('http://localhost:9090/api/tasks/all'),
        headers: <String, String>{
          'Content-Type': 'apllication/json; charset=UTF-8'
        });
    if (response.statusCode == 200) {
      log(response.body);
      final decodedResponse = json.decode(response.body);
      return (decodedResponse as List)
          .map((e) => TaskModel.fromJson(e))
          .toList();
    } else {
      throw Exception('Failed to get tasks');
    }
  }
}
