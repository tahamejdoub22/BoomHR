
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
  List<ProjectModel> _searchResults = [];

  TextEditingController _searchController = TextEditingController();

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

  void _onSearchButtonPressed(String query) {
    setState(() {
      _searchResults = _projects
          .where((project) =>
              project.name.toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
  }

  void _onClearSearchPressed() {
    _searchController.clear();
    _searchResults.clear();
    setState(() {});
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
          onPressed: () {
            showDialog(
              context: context,
              builder: (BuildContext context) => AlertDialog(
                title: const Text('Search'),
                content: TextField(
                  decoration:
                      const InputDecoration(hintText: 'Enter project name'),
                  controller: _searchController,
                ),
                actions: [
                  TextButton(
                    child: const Text('Cancel'),
                    onPressed: () {
                      Navigator.pop(context);
                      _onClearSearchPressed();
                    },
                  ),
                  TextButton(
                    child: const Text('Search'),
                    onPressed: () {
                      Navigator.pop(context);
                      _onSearchButtonPressed(_searchController.text);
                    },
                  ),
                ],
              ),
            );
          },
        ),
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
                if (_searchResults.isNotEmpty) {
                  return ProjectItem(
                    project: _searchResults[index],
                    projectOwner: projectManagerFullNames[index],
                  );
                } else {
                  return ProjectItem(
                    project: _projects[index],
                    projectOwner: projectManagerFullNames[index],
                  );
                }
              },
              itemCount: _searchResults.isNotEmpty
                  ? _searchResults.length
                  : _projects.length,
            ),
          ),
        ],
      ),
    );
  }
}
