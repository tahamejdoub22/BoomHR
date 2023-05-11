import 'dart:io';
import 'package:intl/intl.dart';
import 'package:flutter/services.dart';
import 'dart:typed_data';
import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:path_provider/path_provider.dart';
import 'package:open_file/open_file.dart';

import 'package:shared_preferences/shared_preferences.dart';

class NetSalaryListScreen extends StatefulWidget {
  @override
  _NetSalaryListScreenState createState() => _NetSalaryListScreenState();
}

class _NetSalaryListScreenState extends State<NetSalaryListScreen> {
  List<dynamic> _netSalaries = [];
  bool _isLoading = false;
  String getBaseUrl() {
    if (Platform.isAndroid) {
      return '10.0.2.2:8080';
    } else if (Platform.isIOS) {
      return 'localhost:8080';
    } else {
      throw UnsupportedError('Unsupported platform');
    }
  }

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
    String baseurl = getBaseUrl();

    final response =
        await http.get(Uri.parse('http://' + baseurl + '/payroll/payroll'));
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

  Future<Uint8List> loadFont() async {
    final fontData = await rootBundle.load("assets/fonts/NotoSans-Regular.ttf");
    return fontData.buffer.asUint8List();
  }

  Future<void> _generateSalaryPdf(dynamic netSalary) async {
    final pdf = pw.Document();
    final ByteData fontData =
        await rootBundle.load('assets/fonts/NotoSans-Regular.ttf');
    final ttfFont = pw.Font.ttf(fontData);

    pdf.addPage(
      pw.Page(
        build: (pw.Context context) {
          return pw.Column(
            crossAxisAlignment: pw.CrossAxisAlignment.start,
            children: [
              pw.Text('Net Salary: ${netSalary['netSalaryAmount'].toString()}',
                  style: pw.TextStyle(font: ttfFont)),
              pw.SizedBox(height: 5),
              pw.Text(
                  'Gross Salary: ${netSalary['grossSalary_id']['grossSalary'].toString()}',
                  style: pw.TextStyle(font: ttfFont)),
              pw.SizedBox(height: 5),
              pw.Text(
                  'Employee Name: ${netSalary['grossSalary_id']['employee_id']['first_name'].toString()} ${netSalary['grossSalary_id']['employee_id']['last_name'].toString()}',
                  style: pw.TextStyle(font: ttfFont)),
              pw.SizedBox(height: 5),
              pw.Text(
                  'Tax Rate: ${netSalary['incomeTax_id']['taxRate'].toString()}',
                  style: pw.TextStyle(font: ttfFont)),
              pw.SizedBox(height: 5),
              pw.Text(
                  'Tax Amount: ${netSalary['incomeTax_id']['taxAmount'].toStringAsFixed(2)}',
                  style: pw.TextStyle(font: ttfFont)),
            ],
          );
        },
      ),
    );

    // Rest of the code

    final output = await getTemporaryDirectory();
    final file = File('${output.path}/salary.pdf');
    final pdfBytes = await pdf.save();
    await file.writeAsBytes(pdfBytes.toList());
    await OpenFile.open(file.path);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: true,
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
              : Column(
                  children: [
                    SizedBox(height: 20),
                    Expanded(
                      child: ListView.builder(
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
                                  )
                                ],
                              ),
                              trailing: IconButton(
                                icon: Icon(Icons.picture_as_pdf,
                                    color: Colors.red),
                                onPressed: () => _generateSalaryPdf(netSalary),
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                    SizedBox(height: 20),
                  ],
                ),
    );
  }
}
