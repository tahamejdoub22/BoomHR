// class TaskModel {
//   final String id;
//   final String name;
//   final DateTime deadline;
//   final String owner;
//   final String project;
//   final String status;

//   TaskModel({
//     required this.id,
//     required this.name,
//     required this.deadline,
//     required this.owner,
//     required this.project,
//     required this.status,
//   });

// factory TaskModel.fromJson(Map<String, dynamic> json) {
//   return TaskModel(
//     id: json['_id'] ?? '',
//     name: json['name'] ?? '',
//     deadline: DateTime.parse(json['deadline'] ?? ''),
//     owner: json['owner'] ?? '',
//     project: json['project'] ?? '',
//     status: json['status'] ?? '',
//   );
// }
// }

// class TaskModel {
//   final String id;
//   final String name;
//   final String owner;
//   final String project;
//   final String status;

//   TaskModel({
//     required this.id,
//     required this.name,
//     required this.owner,
//     required this.project,
//     required this.status,
//   });

//   factory TaskModel.fromJson(Map<String, dynamic> json) {
//     return TaskModel(
//       id: json['_id'],
//       name: json['name'],
//       owner: json['owner'],
//       project: json['project'],
//       status: json['status'],
//     );
//   }
//    Map<String, dynamic> toJson() {
//     final Map<String, dynamic> data = new Map<String, dynamic>();
//     data['_id'] = this.id;
//     data['name'] = this.name;

//     data['owner'] = this.owner;
//     data['project'] = this.project;
//     data['status'] = this.status;
//     return data;
//   }
// }
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
      deadline: DateTime.parse(json['deadline']),
      owner: json['owner'],
      project: json['project'],
      status: json['status'],
    );
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.id;
    data['name'] = this.name;
    data['deadline'] = this.deadline.toIso8601String();
    data['owner'] = this.owner;
    data['project'] = this.project;
    data['status'] = this.status;
    return data;
  }
}