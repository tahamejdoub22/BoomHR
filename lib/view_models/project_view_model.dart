import 'dart:developer';

import 'package:boomhr/models/project_model.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
List<String> projectManagerFullNames = [];
class ProjectViewModel {
  Future<List<ProjectModel>> getProjects() async {
    final response = await http.get(
        Uri.parse('http://192.168.10.100:9090/api/project/all'),
        headers: <String, String>{
          'Content-Type': 'apllication/json; charset=UTF-8'
        });
    if (response.statusCode == 200) {
      log(response.body);
      final decodedResponse = json.decode(response.body);
     
      // print("here " + decodedResponse.toString());
 for (final item in decodedResponse) {
      final projectManagerData = item["projectManagerData"];
      final projectManagerFullName = projectManagerData["fullname"];
      // print("Project Manager Full Name: " + projectManagerFullName);
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
