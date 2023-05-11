class ProjectModel {
  final String id;
  final String name;
  final DateTime startDate;
  final DateTime endDate;
  final List<String> team;
  final List<String> tasks;
  final String projectManager;

  ProjectModel({
    required this.id,
    required this.name,
    required this.startDate,
    required this.endDate,
    required this.team,
    required this.tasks,
    required this.projectManager,
  });

  factory ProjectModel.fromJson(Map<String, dynamic> json) {
    return ProjectModel(
      id: json['_id'],
      name: json['name'],
      startDate: DateTime.parse(json['startDate']),
      endDate: DateTime.parse(json['endDate']),
      team: List<String>.from(json['team'].map((x) => x.toString())),
      tasks: List<String>.from(json['tasks'].map((x) => x.toString())),
      projectManager: json['projectManager'],
    );
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.id;
    data['name'] = this.name;
    data['startDate'] = this.startDate.toIso8601String();
    data['endDate'] = this.endDate.toIso8601String();
    data['team'] = this.team;
    data['tasks'] = this.tasks;
    data['projectManager'] = this.projectManager;
    return data;
  }
}
