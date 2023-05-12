
import 'package:intl/intl.dart';

class TaskModel {
  final String id;
  final String name;
  final DateTime deadline;
  final String owner;
  final String project;
  final String status;

  TaskModel({
    required this.id,
    required this.name,
    required this.deadline,
    required this.owner,
    required this.project,
    required this.status,
  });

  factory TaskModel.fromJson(Map<String, dynamic> json) {
    return TaskModel(
      id: json['_id'],
      name: json['name'],
      deadline:
          DateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(json['deadline']),
      owner: json['owner'],
      project: json['project'],
      status: json['status'],
    );
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.id;
    data['name'] = this.name;
    data['deadline'] = DateFormat('yyyy-MM-dd').format(this.deadline);
    data['owner'] = this.owner;
    data['project'] = this.project;
    data['status'] = this.status;
    return data;
  }
}
