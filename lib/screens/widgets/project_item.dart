import 'package:flutter/material.dart';
import 'package:flutter_application_1/screens/widgets/task_screen.dart';
import 'package:intl/intl.dart';

import '../../models/project_model.dart';
import '../../view_models/add_task_view_model.dart';
import '../add_task.dart';

class ProjectItem extends StatelessWidget {
  const ProjectItem({
    Key? key,
    required this.project,
    this.projectOwner = '',
  }) : super(key: key);

  final ProjectModel project;
  final String projectOwner;

  @override
  Widget build(BuildContext context) {
    final AddTaskViewModel addTaskViewModel = AddTaskViewModel();
    void _openAddTaskDialog() {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Add Task'),
            content: SizedBox(
              width: MediaQuery.of(context).size.width * 0.9,
              child: AddTaskWidget(
                projectName: project.name,
                projectId: project.id,
              ),
            ),
          );
        },
      );
    }

    final dateFormat = DateFormat.yMMMMd();
    int daysRemaining = project.endDate!.difference(DateTime.now()).inDays;
    Color boxColor = Colors.red;

    if (daysRemaining > 30) {
      boxColor = Colors.green;
    } else if (daysRemaining >= 15 && daysRemaining <= 29) {
      boxColor = Color.fromARGB(255, 247, 143, 52);
    }
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: const BorderRadius.all(Radius.circular(10.0)),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.2),
            spreadRadius: 2,
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                project.name!,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),
              ),
              Container(
                padding: const EdgeInsets.all(8.0),
                // decoration: BoxDecoration(
                //   color: Colors.pinkAccent.withOpacity(.2),
                //   borderRadius: const BorderRadius.all(
                //     Radius.circular(10.0),
                //   ),
                // ),
                decoration: BoxDecoration(
                  color: boxColor,
                  borderRadius: BorderRadius.circular(10),
                ),
                // child: Text(
                //   project.projectManager!.toUpperCase(),
                //   style: TextStyle(
                //     color: Colors.pinkAccent,
                //     fontWeight: FontWeight.bold,
                //     fontSize: 12,
                //   ),
                child: Text(
                  'Remaining ${project.endDate!.difference(DateTime.now()).inDays} days',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                    color: Color.fromARGB(255, 247, 245, 245),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          // Text(
          //   project.name!,
          //   maxLines: 3,
          //   overflow: TextOverflow.ellipsis,
          //   style: const TextStyle(
          //     color: Colors.grey,
          //     fontSize: 14,
          //   ),
          // ),
          const SizedBox(height: 10),
          Row(
            children: [
              const Icon(
                Icons.account_circle,
                color: Colors.grey,
              ),
              const SizedBox(width: 5),
              Text(
                projectOwner,
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
              ),
              const SizedBox(width: 5),
              Text(
                'Due ${dateFormat.format(project.endDate!)}',
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => TaskListPage(project: project),
                    ),
                  );
                },
                child: const Text('View Tasks'),
              ),
              ElevatedButton(
                onPressed: () {
                  _openAddTaskDialog();
                },
                child: const Text('Add Task'),
              ),
            ],
          )
        ],
      ),
    );
  }
}
