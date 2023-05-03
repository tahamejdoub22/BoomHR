import 'package:boomhr/models/employer_model.dart';
import 'package:boomhr/view_models/get_employe_view_model.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

import '../view_models/add_task_view_model.dart';

String owner = "";
String taskName = "";
DateTime deadline = DateTime.parse('2023-05-01');

class AddTaskWidget extends StatefulWidget {
  const AddTaskWidget(
      {Key? key, required this.projectName, required this.projectId})
      : super(key: key);
  final String projectName;
  final String projectId;

  @override
  AddTaskWidgetState createState() => AddTaskWidgetState();
}

class AddTaskWidgetState extends State<AddTaskWidget> {
  TextEditingController _taskController = TextEditingController();
  String? _selectedUser;
  DateTime? _selectedDate;
  List<EmployerModel> employees = [];

  final getEmployerViewModel = GetEmployerViewModel();

  @override
  void initState() {
    super.initState();
    getEmployees();
  }

  void getEmployees() async {
    final List<EmployerModel> result = await getEmployerViewModel.getEmployer();
    setState(() {
      employees = result;
    });
  }

  Future<void> addTask() async {
    final AddTaskViewModel addTaskViewModel = AddTaskViewModel();

    await addTaskViewModel.addTask(owner, taskName, deadline, widget.projectId);
  }

  @override
  Widget build(BuildContext context) {
    taskName = _taskController.text;
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: [
              Text(widget.projectName, style: const TextStyle(fontSize: 18)),
              const SizedBox(width: 10),
            ],
          ),
          const SizedBox(height: 12),
          const Text('Task Name \n', style: TextStyle(fontSize: 18)),
          TextField(
            controller: _taskController,
            decoration: InputDecoration(
              hintText: 'task name',
              filled: true,
              fillColor: const Color.fromARGB(255, 244, 244, 244),
              border: OutlineInputBorder(
                borderSide: BorderSide.none,
                borderRadius: BorderRadius.circular(30),
              ),
            ),
          ),
          const SizedBox(height: 12),
          const Text('Assigned To\n', style: TextStyle(fontSize: 18)),
          DropdownButtonFormField<String>(
            decoration: InputDecoration(
              filled: true,
              fillColor: const Color.fromARGB(255, 244, 244, 244),
              border: OutlineInputBorder(
                borderSide: BorderSide.none,
                borderRadius: BorderRadius.circular(30),
              ),
            ),
            hint: const Text('Select a user'),
            value: _selectedUser,
            items: employees.map((employee) {
              return DropdownMenuItem<String>(
                value: employee.fullname,
                child: Row(
                  children: [
                    // CircleAvatar(
                    //   backgroundImage: NetworkImage(employee['image']),
                    // ),
                    const SizedBox(width: 8),
                    Text(employee.fullname!),
                  ],
                ),
              );
            }).toList(),
            onChanged: (String? value) {
              setState(() {
                _selectedUser = value;

                int selectedIndex = employees
                    .map((employee) => employee.fullname)
                    .toList()
                    .indexOf(_selectedUser);
                owner = employees[selectedIndex].id!;
              });
            },
          ),
          const SizedBox(height: 12),
          const Text('Deadline\n', style: TextStyle(fontSize: 18)),
          InkWell(
            onTap: () async {
              DateTime? pickedDate = await showDatePicker(
                context: context,
                initialDate: DateTime.now(),
                firstDate: DateTime.now(),
                lastDate: DateTime.now().add(const Duration(days: 365 * 5)),
              );
              if (pickedDate != null) {
                setState(() {
                  _selectedDate = pickedDate;
                  // Format the selected date as a string in the format "yyyy-mm-dd"
                  String formattedDate =
                      DateFormat('yyyy-MM-dd').format(pickedDate);
                  deadline =
                      DateTime.parse(formattedDate); // save the selected date
                });
                print("Selected date is: ${_selectedDate.toString()}");
              }
            },
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 12),
              decoration: BoxDecoration(
                color: const Color.fromARGB(255, 244, 244, 244),
                borderRadius: BorderRadius.circular(30),
              ),
              child: Row(
                children: [
                  const SizedBox(width: 8),
                  const Icon(Icons.calendar_today, color: Colors.black),
                  const SizedBox(width: 8),
                  Text(
                    _selectedDate == null
                        ? 'Choose a deadline'
                        : 'Deadline: ${DateFormat('yyyy-MM-dd').format(_selectedDate!)}',
                  ),
                ],
              ),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text('Cancel'),
              ),
              TextButton(
                onPressed: () async {
                  await addTask();
                  Navigator.of(context).pop();
                },
                child: const Text('Add'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
