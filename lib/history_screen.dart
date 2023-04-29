import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AttendanceHistoryScreen extends StatefulWidget {
  const AttendanceHistoryScreen({super.key});

  @override
  _AttendanceHistoryScreenState createState() =>
      _AttendanceHistoryScreenState();
}

class _AttendanceHistoryScreenState extends State<AttendanceHistoryScreen> {
  String? _employeeId;
  String? nom;
  String? prenom;

  List<Map<String, dynamic>> _attendanceRecords = [];
  bool _isLoading = false; // Initialize _isLoading to false
  DateTime? _filterDate; // Add filter date variable

  @override
  void initState() {
    super.initState();
    _getEmployeeId();
  }

  Future<void> _getEmployeeId() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _employeeId = prefs.getString('_id');
      nom = prefs.getString('nom') ?? '';
      prenom = prefs.getString('prenom') ?? '';
    });
    if (_employeeId != null) {
      _getAttendanceHistory();
    }
  }

  Future<void> _getAttendanceHistory() async {
    if (Platform.isAndroid) {
      final response = await http.get(
          Uri.parse('http://10.0.2.2:8080/attendance/employees/$_employeeId'));
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        List<Map<String, dynamic>> records =
            List<Map<String, dynamic>>.from(data['attendanceRecords']);
        // Filter records by date range
        if (_filterDate != null) {
          records = records.where((record) {
            final checkInTime = DateTime.parse(record['checkInTime']);
            return checkInTime.day == _filterDate!.day &&
                checkInTime.month == _filterDate!.month &&
                checkInTime.year == _filterDate!.year;
          }).toList();
        }
        setState(() {
          _attendanceRecords = records;
        });
      } else {
        throw Exception('Failed to retrieve attendance history');
      }
    } else {
      final response = await http.get(
          Uri.parse('http://localhost:8080/attendance/employees/$_employeeId'));
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        List<Map<String, dynamic>> records =
            List<Map<String, dynamic>>.from(data['attendanceRecords']);
        // Filter records by date range
        if (_filterDate != null) {
          records = records.where((record) {
            final checkInTime = DateTime.parse(record['checkInTime']);
            return checkInTime.day == _filterDate!.day &&
                checkInTime.month == _filterDate!.month &&
                checkInTime.year == _filterDate!.year;
          }).toList();
        }
        setState(() {
          _attendanceRecords = records;
        });
      } else {
        throw Exception('Failed to retrieve attendance history');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(
            '$nom $prenom',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
          ),
        ),
        body: Padding(
          padding: EdgeInsets.all(8.0),
          child: _isLoading
              ? Center(
                  child: CircularProgressIndicator(),
                )
              : Column(
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: ElevatedButton(
                            onPressed: () async {
                              final pickedDate = await showDatePicker(
                                context: context,
                                initialDate: DateTime.now(),
                                firstDate: DateTime(2022),
                                lastDate: DateTime.now(),
                              );
                              if (pickedDate != null) {
                                setState(() {
                                  _filterDate = pickedDate;
                                  _isLoading = true;
                                });
                                await _getAttendanceHistory();
                                setState(() {
                                  _isLoading = false;
                                });
                              }
                            },
                            child: Text('Filter by Date'),
                          ),
                        ),
                        SizedBox(width: 10),
                        Expanded(
                          child: ElevatedButton(
                            onPressed: () async {
                              setState(() {
                                _filterDate = null;
                                _isLoading = true;
                              });
                              await _getAttendanceHistory();
                              setState(() {
                                _isLoading = false;
                              });
                            },
                            child: Text('Clear Filter'),
                          ),
                        ),
                      ],
                    ),
                    Expanded(
                      child: ListView.builder(
                        itemCount: _attendanceRecords.length,
                        itemBuilder: (context, index) {
                          final checkInTime = DateTime.parse(
                              _attendanceRecords[index]['checkInTime']);

                          final checkOutTime = DateTime.parse(
                              _attendanceRecords[index]['checkOutTime']);
                          final duration = checkOutTime.difference(checkInTime);
                          final totalWorkTimeInHours = duration.inMinutes / 60;
                          return Card(
                            child: ListTile(
                              title: Text(
                                  'Checked in: ${checkInTime.toString().substring(0, 16)}'),
                              subtitle: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                      'Checked out: ${checkOutTime.toString().substring(0, 16)}'),
                                  Container(
                                    padding: EdgeInsets.symmetric(
                                        horizontal: 8.0, vertical: 4.0),
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(16.0),
                                      color: Colors.blue,
                                    ),
                                    child: Text(
                                      '${totalWorkTimeInHours.toStringAsFixed(2)} hours',
                                      style: TextStyle(color: Colors.white),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  ],
                ),
        ));
  }
}
