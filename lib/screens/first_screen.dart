import 'package:boomhr/models/project_model.dart';
import 'package:boomhr/screens/add_task.dart';
import 'package:boomhr/screens/widgets/project_item.dart';
import 'package:boomhr/view_models/project_view_model.dart';
import 'package:flutter/material.dart';

class ToDoScreen extends StatefulWidget {
  const ToDoScreen({Key? key}) : super(key: key);

  @override
  State<ToDoScreen> createState() => _ToDoScreenState();
}

class _ToDoScreenState extends State<ToDoScreen> {
  late ProjectViewModel _projectViewModel;

  List<ProjectModel> _projects = [];

  @override
  void initState() {
    super.initState();
    _projectViewModel = ProjectViewModel();
    _getProjects();
  }

  Future<void> _getProjects() async {
    try {
      final projects = await _projectViewModel.getProjects();
      setState(() {
        _projects = projects;
      });
    } catch (e) {
      print('Failed to get projects: $e');
    }
  }

  String projectName = "";


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        centerTitle: true,
        title: const Text('BoomHR',
            style: TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.bold,
                fontSize: 24)),
        leading: IconButton(
          icon: const Icon(Icons.search, color: Colors.blue),
          onPressed: () {},
        ),
        // actions: [
        //   IconButton(
        //     icon: const Icon(Icons.person, color: Colors.blue),
        //     onPressed: () {},
        //   ),
        // ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 20),
          Padding(
            padding: const EdgeInsets.only(left: 20, bottom: 6),
            child: Text('Projects',
                style:
                    const TextStyle(fontWeight: FontWeight.bold, fontSize: 24)),
          ),
          Expanded(
            child: ListView.builder(
              itemBuilder: (BuildContext context, int index) {
                projectName = _projects[index].name;
                return ProjectItem(
                  project: _projects[index],
                  projectOwner: projectManagerFullNames[index],
                );
              },
              itemCount: _projects.length,
            ),
          ),
        ],
      ),
    );
  }
}
