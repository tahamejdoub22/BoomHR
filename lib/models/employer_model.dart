// class EmployerModel {
//   String? id;
//   String? fullname;
//   String? picture;
//   String? email;
//   String? phone;
//   String? address;
//   String? role;
//   String? salary;
//   String? jobtitle;
//   String? jobtype;
//   String? departement;
//   String? firstday;
//   String? lastday;
//   String? dateofbirth;
//   int? iV;

//   EmployerModel(
//       {this.id,
//       this.fullname,
//       this.picture,
//       this.email,
//       this.phone,
//       this.address,
//       this.role,
//       this.salary,
//       this.jobtitle,
//       this.jobtype,
//       this.departement,
//       this.firstday,
//       this.lastday,
//       this.dateofbirth,
//       });

//   EmployerModel.fromJson(Map<String, dynamic> json) {
//     id = json['_id'];
//     fullname = json['fullname'];
//     picture = json['picture'];
//     email = json['email'];
//     phone = json['phone'];
//     address = json['address'];
//     role = json['role'];
//     salary = json['salary'];
//     jobtitle = json['jobtitle'];
//     jobtype = json['jobtype'];
//     departement = json['departement'];
//     firstday = json['firstday'];
//     lastday = json['lastday'];
//     dateofbirth = json['dateofbirth'];
//   }

//   Map<String, dynamic> toJson() {
//     final Map<String, dynamic> data = new Map<String, dynamic>();
//     data['_id'] = this.id;
//     data['fullname'] = this.fullname;
//     data['picture'] = this.picture;
//     data['email'] = this.email;
//     data['phone'] = this.phone;
//     data['address'] = this.address;
//     data['role'] = this.role;
//     data['salary'] = this.salary;
//     data['jobtitle'] = this.jobtitle;
//     data['jobtype'] = this.jobtype;
//     data['departement'] = this.departement;
//     data['firstday'] = this.firstday;
//     data['lastday'] = this.lastday;
//     data['dateofbirth'] = this.dateofbirth;

//     return data;
//   }
// }
class EmployerModel {
  String? id;
  String? email;
  String? first_name;
  String? last_name;
  String? password;
  int? vacation;
  int? sick;
  String? avatar;
  String? country;
  String? city;
  String? state;

  String? address;
  String? phone;

  DateTime? hire_date;
  String? job_title;

  EmployerModel({
    this.id,
    required this.first_name,
    required this.last_name,
    required this.email,
    required this.phone,
    required this.address,
    required this.state,
    required this.country,
    required this.job_title,
    required this.avatar,
    required this.city,
    required this.vacation,
    required this.sick,
    required this.hire_date,
  });

  EmployerModel.fromJson(Map<String, dynamic> json)
      : id = json['_id'],
        first_name = json['first_name'],
        last_name = json['last_name'],
        email = json['email'],
        phone = json['phone'],
        address = json['address'],
        state = json['state'],
        country = json['country'],
        job_title = json['job_title'],
        avatar = json['avatar'],
        sick = json['sick'],
        vacation = json['vacation'],
        city = json['city'],
        hire_date = json['hire_date'] != null
            ? DateTime.parse(json['hire_date'])
            : null;

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (id != null) {
      data['_id'] = id;
    }
    data['first_name'] = first_name;
    data['last_name'] = last_name;
    data['email'] = email;
    data['phone'] = phone;
    data['address'] = address;
    data['state'] = state;
    data['country'] = country;
    data['job_title'] = job_title;
    data['avatar'] = avatar;
    data['sick'] = sick;
    data['vacation'] = vacation;
    data['city'] = city;
    data['hire_date'] = hire_date?.toIso8601String();
    return data;
  }
}
// class ProjectModel {
//   final String id;
//   final String name;
//   final DateTime startDate;
//   final DateTime endDate;
//   final List<String> team;
//   final List<String> tasks;
//   final String projectManager;

//   ProjectModel({
//     required this.id,
//     required this.name,
//     required this.startDate,
//     required this.endDate,
//     required this.team,
//     required this.tasks,
//     required this.projectManager,
//   });

//   factory ProjectModel.fromJson(Map<String, dynamic> json) {
//     return ProjectModel(
//       id: json['_id'],
//       name: json['name'],
//       startDate: DateTime.parse(json['startDate']),
//       endDate: DateTime.parse(json['endDate']),
//       team: List<String>.from(json['team'].map((x) => x.toString())),
//       tasks: List<String>.from(json['tasks'].map((x) => x.toString())),
//       projectManager: json['projectManager'],
//     );
//   }

//   Map<String, dynamic> toJson() {
//     final Map<String, dynamic> data = new Map<String, dynamic>();
//     data['_id'] = this.id;
//     data['name'] = this.name;
//     data['startDate'] = this.startDate.toIso8601String();
//     data['endDate'] = this.endDate.toIso8601String();
//     data['team'] = this.team;
//     data['tasks'] = this.tasks;
//     data['projectManager'] = this.projectManager;
//     return data;
//   }
// }