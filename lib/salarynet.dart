import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class NetSalaryListScreen extends StatefulWidget {
  @override
  _NetSalaryListScreenState createState() => _NetSalaryListScreenState();
}

class _NetSalaryListScreenState extends State<NetSalaryListScreen> {
  List<dynamic> _netSalaries = [];
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadNetSalaries();
  }

  Future<void> _loadNetSalaries() async {
    setState(() {
      _isLoading = true;
    });
    final prefs = await SharedPreferences.getInstance();
    final userId = prefs.getString('userId');
    final response =
        await http.get(Uri.parse('http://10.0.2.2:8080/payroll/payroll'));
    if (response.statusCode == 200) {
      final netSalaries = json.decode(response.body) as List<dynamic>;
      final filteredSalaries = netSalaries
          .where((salary) =>
              salary['grossSalary_id']['employee_id']['_id'] == userId)
          .toList();
      setState(() {
        _netSalaries = filteredSalaries;
      });
    }
    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Net Salaries'),
      ),
      body: _isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : _netSalaries.isEmpty
              ? Center(
                  child: Text('No net salaries found'),
                )
              : ListView.builder(
                  itemCount: _netSalaries.length,
                  itemBuilder: (context, index) {
                    final netSalary = _netSalaries[index];
                    return Card(
                      child: ListTile(
                        title: Text(
                          'Net Salary: ${netSalary['netSalaryAmount']}',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            SizedBox(height: 5),
                            Text(
                              'Gross Salary: ${netSalary['grossSalary_id']['grossSalary']}',
                            ),
                            SizedBox(height: 5),
                            Text(
                              'Employee Name: ${netSalary['grossSalary_id']['employee_id']['first_name']} ${netSalary['grossSalary_id']['employee_id']['last_name']}',
                            ),
                            SizedBox(height: 5),
                            Text(
                              'Tax Rate: ${netSalary['incomeTax_id']['taxRate']}',
                            ),
                            SizedBox(height: 5),
                            Text(
                              'Tax Amount: ${netSalary['incomeTax_id']['taxAmount'].toStringAsFixed(2)}',
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
    );
  }
}
