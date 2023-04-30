import 'package:boomhr/models/employer_model.dart';
import 'package:boomhr/view_models/get_employe_view_model.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

import '../view_models/add_task_view_model.dart';

String owner = "";
String taskName = "";
DateTime deadline = DateTime.parse('2023-05-01');

class AddTaskWidget extends StatefulWidget {
  const AddTaskWidget({Key? key, required this.projectName}) : super(key: key);
  final String projectName;

  @override
  _AddTaskWidgetState createState() => _AddTaskWidgetState();
}

class _AddTaskWidgetState extends State<AddTaskWidget> {
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

  @override
  Widget build(BuildContext context) {
    taskName = _taskController.text;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          children: [
            Text(widget.projectName, style: TextStyle(fontSize: 18)),
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
          // onTap: () async {
          //   DateTime? pickedDate = await showDatePicker(
          //     context: context,
          //     initialDate: DateTime.now(),
          //     firstDate: DateTime.now(),
          //     lastDate: DateTime.now().add(const Duration(days: 365 * 5)),
          //   );
          //   if (pickedDate != null) {
          //     deadline = _selectedDate!;
          //     setState(() {
          //         // print("deadline is $");
          //      pickedDate  = _selectedDate;
          //     });
          //   }
          // },
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
                      : 'Deadline: ${_selectedDate!.year}-${_selectedDate!.month.toString().padLeft(2, '0')}-${_selectedDate!.day.toString().padLeft(2, '0')}',
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

Future<void> addTask() async {
  final AddTaskViewModel addTaskViewModel = AddTaskViewModel();

  await addTaskViewModel.addTask(
      owner, taskName, deadline, "644ed3580ff7174a4ccfc5de");
}
