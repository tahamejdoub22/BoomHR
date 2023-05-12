import 'dart:developer';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'dart:convert';

import '../models/employer_model.dart';

class GetEmployerViewModel {
  final String apiUrl = Platform.isAndroid
      ? "http://192.168.0.12:8081/employer/all"
      : "localhost:8080/employer/all";
  Future<List<EmployerModel>> getEmployer() async {
    final response = await http.get(Uri.parse(apiUrl),
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
