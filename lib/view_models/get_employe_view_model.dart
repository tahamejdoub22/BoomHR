import 'dart:developer';

import 'package:boomhr/models/project_model.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../models/employer_model.dart';

class GetEmployerViewModel {
  Future<List<EmployerModel>> getEmployer() async {
    final response = await http.get(
        Uri.parse('http://172.26.208.1:9090/api/auth/emp/'),
        headers: <String, String>{
          'Content-Type': 'apllication/json; charset=UTF-8'
        });
    if (response.statusCode == 200) {
      final decodedResponse = json.decode(response.body);

      print("here " + decodedResponse.toString());
      return (decodedResponse as List)
          .map((e) => EmployerModel.fromJson(e))
          .toList();
    } else {
      throw Exception('Failed to get tasks');
    }
  }
}
