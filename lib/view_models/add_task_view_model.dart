import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:intl/intl.dart';

class AddTaskViewModel {
  final String apiUrl = 'http://172.26.208.1:9090/api/tasks/';

  Future<void> addTask(
      String owner, String name, DateTime deadline, String project) async {
    final DateFormat formatter = DateFormat('yyyy-MM-dd');
    final String formattedDeadline = formatter.format(deadline);
    final Map<String, dynamic> taskData = {
      'owner': owner,
      'name': name,
      'deadline': formattedDeadline,
      'project': project,
    };
    // send the taskData map to the backend...

    final response = await http.post(
      Uri.parse(apiUrl),
      body: json.encode(taskData),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 201) {
      print('Task added successfully.');
    } else {
      print('Failed to add task.');
    }
  }
}
