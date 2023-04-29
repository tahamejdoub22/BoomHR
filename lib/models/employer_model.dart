// // class EmployerModel {
// //   String? id;
// //   String? fullname;
// //   String? picture;
// //   String? email;
// //   String? phone;
// //   String? address;
// //   String? role;
// //   String? salary;
// //   String? jobtitle;
// //   String? jobtype;
// //   String? departement;
// //   String? firstday;
// //   String? lastday;
// //   String? dateofbirth;
// //   int? iV;

// //   EmployerModel(
// //       {this.id,
// //       this.fullname,
// //       this.picture,
// //       this.email,
// //       this.phone,
// //       this.address,
// //       this.role,
// //       this.salary,
// //       this.jobtitle,
// //       this.jobtype,
// //       this.departement,
// //       this.firstday,
// //       this.lastday,
// //       this.dateofbirth,
// //       });

// //   EmployerModel.fromJson(Map<String, dynamic> json) {
// //     id = json['_id'];
// //     fullname = json['fullname'];
// //     picture = json['picture'];
// //     email = json['email'];
// //     phone = json['phone'];
// //     address = json['address'];
// //     role = json['role'];
// //     salary = json['salary'];
// //     jobtitle = json['jobtitle'];
// //     jobtype = json['jobtype'];
// //     departement = json['departement'];
// //     firstday = json['firstday'];
// //     lastday = json['lastday'];
// //     dateofbirth = json['dateofbirth'];
// //   }

// //   Map<String, dynamic> toJson() {
// //     final Map<String, dynamic> data = new Map<String, dynamic>();
// //     data['_id'] = this.id;
// //     data['fullname'] = this.fullname;
// //     data['picture'] = this.picture;
// //     data['email'] = this.email;
// //     data['phone'] = this.phone;
// //     data['address'] = this.address;
// //     data['role'] = this.role;
// //     data['salary'] = this.salary;
// //     data['jobtitle'] = this.jobtitle;
// //     data['jobtype'] = this.jobtype;
// //     data['departement'] = this.departement;
// //     data['firstday'] = this.firstday;
// //     data['lastday'] = this.lastday;
// //     data['dateofbirth'] = this.dateofbirth;
    
// //     return data;
// //   }
// // }
// class EmployerModel {
//   String? id;
//   String? fullname;
//   String? picture;
//   String? email;
//   int? phone;
//   String? address;
//   String? role;
//   int? salary;
//   String? jobtitle;
//   String? jobtype;
//   String? departement;
//   DateTime? firstday;
//   DateTime? lastday;
//   DateTime? dateofbirth;

//   EmployerModel({
//     this.id,
//     required this.fullname,
//     required this.picture,
//     required this.email,
//     required this.phone,
//     required this.address,
//     required this.role,
//     required this.salary,
//     required this.jobtitle,
//     required this.jobtype,
//     this.departement,
//     required this.firstday,
//     required this.lastday,
//     required this.dateofbirth,
//   });

//   EmployerModel.fromJson(Map<String, dynamic> json)
//       : id = json['_id'],
//         fullname = json['fullname'],
//         picture = json['picture'],
//         email = json['email'],
//         phone = json['phone'],
//         address = json['address'],
//         role = json['role'],
//         salary = json['salary'],
//         jobtitle = json['jobtitle'],
//         jobtype = json['jobtype'],
//         departement = json['departement'],
//         firstday = json['firstday'] != null
//             ? DateTime.parse(json['firstday'])
//             : null,
//         lastday = json['lastday'] != null
//             ? DateTime.parse(json['lastday'])
//             : null,
//         dateofbirth = json['dateofbirth'] != null
//             ? DateTime.parse(json['dateofbirth'])
//             : null;

//   Map<String, dynamic> toJson() {
//     final Map<String, dynamic> data = <String, dynamic>{};
//     if (id != null) {
//       data['_id'] = id;
//     }
//     data['fullname'] = fullname;
//     data['picture'] = picture;
//     data['email'] = email;
//     data['phone'] = phone;
//     data['address'] = address;
//     data['role'] = role;
//     data['salary'] = salary;
//     data['jobtitle'] = jobtitle;
//     data['jobtype'] = jobtype;
//     data['departement'] = departement;
//     data['firstday'] = firstday?.toIso8601String();
//     data['lastday'] = lastday?.toIso8601String();
//     data['dateofbirth'] = dateofbirth?.toIso8601String();
//     return data;
//   }
// }
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