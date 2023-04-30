import 'package:boomhr/constants/constants.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'dart:convert';

import '../../models/project_model.dart';
import '../../models/task_model.dart';

class TaskListPage extends StatefulWidget {
  final ProjectModel project;

  TaskListPage({Key? key, required this.project}) : super(key: key);

  @override
  _TaskListPageState createState() => _TaskListPageState();
}

class _TaskListPageState extends State<TaskListPage> {
  List<TaskModel> _tasks = [];
  String _filter = 'All';
  bool _isLoading = true;

  Future<void> _fetchTasks() async {
    setState(() {
      _isLoading = true;
    });

    try {
      final response = await http.get(
        Uri.parse('${kBaseUrl}api/projects/${widget.project.id}/tasks/'),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body) as List<dynamic>;
        final tasks = data.map((e) => TaskModel.fromJson(e)).toList();
        setState(() {
          _tasks = tasks;
          _isLoading = false;
        });
      } else {
        // Handle error
        setState(() {
          _isLoading = false;
        });
      }
    } catch (error) {
      // Handle error
      setState(() {
        _isLoading = false;
      });
    }
  }

  Widget _buildTaskCard(TaskModel task) {
    final now = DateTime.now();
    //final daysRemaining = task.deadline.difference(now).inDays;
    int daysRemaining = task.deadline!.difference(DateTime.now()).inDays;
    Color color;
    if (daysRemaining < 0) {
      print('The task is over.');
      color = Color.fromARGB(0, 93, 93, 93);
    } else if (daysRemaining >= 5) {
      color = Colors.green;
    } else if (daysRemaining >= 2) {
      color = Colors.orange;
    } else {
      color = Colors.red;
    }

    return Card(
      elevation: 2.0,
      margin: EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Align(
              alignment: Alignment.center,
              child: Text(
                task.status,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
                ),
              ),
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                CircleAvatar(
                  child: Text(task.status.substring(0, 1)),
                  backgroundColor: _getColorForStatus(task.status),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    task.name,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                const Icon(
                  Icons.account_circle,
                  color: Colors.grey,
                  size: 18,
                ),
                const SizedBox(width: 5),
                Text(
                  task.owner,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 5),
            Row(
              children: [
                const Icon(
                  Icons.date_range,
                  color: Colors.grey,
                  size: 18,
                ),
                const SizedBox(width: 5),
                Text(
                  'Due in ${daysRemaining.toString()} days',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                    color: color,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Color _getColorForStatus(String status) {
    switch (status) {
      case 'in progress':
        return Colors.yellow;
      case 'completed':
        return Colors.green;
      case 'to do':
        return Colors.red;
      default:
        return Colors.green;
    }
  }

  List<TaskModel> _getFilteredTasks() {
    if (_filter == 'All') {
      return _tasks;
    } else if (_filter == 'In Progress') {
      return _tasks.where((task) => task.status == 'in progress').toList();
    } else if (_filter == 'Completed') {
      return _tasks.where((task) => task.status == 'completed').toList();
    } else if (_filter == 'to do') {
      return _tasks.where((task) => task.status == 'to do').toList();
    }
    return [];
  }

  void _handleFilterChange(String value) {
    setState(() {
      _filter = value;
      _isLoading = true;
    });
    _fetchTasks();
  }

  List<PopupMenuEntry<String>> _buildFilterMenuItems() {
    return [
      PopupMenuItem<String>(
        value: 'All',
        child: Text('All'),
      ),
      PopupMenuItem<String>(
        value: 'In Progress',
        child: Text('In Progress'),
      ),
      PopupMenuItem<String>(
        value: 'Completed',
        child: Text('Completed'),
      ),
      PopupMenuItem<String>(
        value: 'to do',
        child: Text('to do'),
      ),
    ];
  }

  @override
  void initState() {
    super.initState();
    _fetchTasks();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${widget.project.name} Tasks'),
        actions: [
          PopupMenuButton<String>(
            itemBuilder: (context) => _buildFilterMenuItems(),
            onSelected: _handleFilterChange,
            icon: Icon(Icons.filter_list),
            offset: Offset(0, 40),
          ),
        ],
      ),
      body: _isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : ListView.builder(
              itemCount: _getFilteredTasks().length,
              itemBuilder: (context, index) {
                final task = _getFilteredTasks()[index];
                return _buildTaskCard(task);
              },
            ),
    );
  }
}
