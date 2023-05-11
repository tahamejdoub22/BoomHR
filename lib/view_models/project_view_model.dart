import 'dart:developer';

import 'package:boomhr/constants/constants.dart';
import 'package:boomhr/models/project_model.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

List<String> projectManagerFullNames = [];

class ProjectViewModel {
  Future<List<ProjectModel>> getProjects() async {
    print("object");
    print("${kBaseUrl}project/all");
    final response = await http.get(Uri.parse("${kBaseUrl}project/all"),
        headers: <String, String>{
          'Content-Type': 'apllication/json; charset=UTF-8'
        });
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
