import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

final String apiUrl = 'http://localhost:9090/api/tasks/';

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

  // Dummy data for user selection
  List<Map<String, dynamic>> users = [
    {'name': 'mohamed lachtar', 'image': 'https://via.placeholder.com/50'},
    {'name': 'oussema sebai', 'image': 'https://via.placeholder.com/50'},
    {'name': 'emna toujeni', 'image': 'https://via.placeholder.com/50'},
    {'name': 'taha majdoub', 'image': 'https://via.placeholder.com/50'},
  ];

  @override
  Widget build(BuildContext context) {
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
          items: users.map((user) {
            return DropdownMenuItem<String>(
              value: user['name'],
              child: Row(
                children: [
                  CircleAvatar(
                    backgroundImage: NetworkImage(user['image']),
                  ),
                  const SizedBox(width: 8),
                  Text(user['name']),
                ],
              ),
            );
          }).toList(),
          onChanged: (String? value) {
            setState(() {
              _selectedUser = value;
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
              });
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
