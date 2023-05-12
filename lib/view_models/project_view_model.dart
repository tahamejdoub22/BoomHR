import 'dart:developer';
import 'dart:io';

import 'package:flutter_application_1/screens/constants/constants.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../models/project_model.dart';

List<String> projectManagerFullNames = [];
final String apiUrl = Platform.isAndroid
    ? "${kBaseUrl}project/alls"
    : "localhost:8080/project/alls";

class ProjectViewModel {
  Future<List<ProjectModel>> getProjects() async {
    final response = await http.get(Uri.parse(apiUrl),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8'
        });
    print("start here");
    if (response.statusCode == 200) {
      final decodedResponse = json.decode(response.body);
      print(decodedResponse.toString());
      for (final item in decodedResponse) {
        final projectManagerData = item["projectManagerData"];
        final projectManagerFullName = projectManagerData["first_name"];

        projectManagerFullNames.add(projectManagerFullName);
      }

      return (decodedResponse as List)
          .map((e) => ProjectModel.fromJson(e))
          .toList();
    } else {
      throw Exception('Failed to get tasks');
    }
  }
}
