import 'package:flutter/material.dart';

class EmployerModel {
  String? id;
  String? avatar;
  String? email;
  String? password;
  String? first_name;
  String? last_name;
  String? job_title;
  String? entreprise_id;
  String? departement;
  String? resetCode;
  String? address;
  String? city;
  String? state;
  String? country;
  DateTime? hire_date;
  String? phone;
  int? vacation;
  int? sick;
  String? fcmToken;
  String? salary;

  EmployerModel({
    this.id,
    required this.avatar,
    required this.email,
    required this.password,
    required this.first_name,
    required this.last_name,
    required this.job_title,
    required this.entreprise_id,
    this.departement,
    this.resetCode,
    required this.address,
    required this.city,
    required this.state,
    required this.country,
    required this.hire_date,
    required this.phone,
    required this.vacation,
    required this.sick,
    this.fcmToken,
    this.salary,
  });

  factory EmployerModel.fromJson(Map<String, dynamic> json) {
    return EmployerModel(
      id: json['_id'],
      avatar: json['avatar'],
      email: json['email'],
      password: json['password'],
      first_name: json['first_name'],
      last_name: json['last_name'],
      job_title: json['job_title'],
      entreprise_id: json['entreprise_id'],
      departement: json['departement'],
      resetCode: json['resetCode'],
      address: json['address'],
      city: json['city'],
      state: json['state'],
      country: json['country'],
      hire_date:
          json['hire_date'] != null ? DateTime.parse(json['hire_date']) : null,
      phone: json['phone'],
      vacation: json['vacation'],
      sick: json['sick'],
      fcmToken: json['fcmToken'],
      salary: json['salary'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'avatar': avatar,
      'email': email,
      'password': password,
      'first_name': first_name,
      'last_name': last_name,
      'job_title': job_title,
      'entreprise_id': entreprise_id,
      'departement': departement,
      'resetCode': resetCode,
      'address': address,
      'city': city,
      'state': state,
      'country': country,
      'hire_date': hire_date?.toIso8601String(),
      'phone': phone,
      'vacation': vacation,
      'sick': sick,
      'fcmToken': fcmToken,
      'salary': salary,
    };
  }
}