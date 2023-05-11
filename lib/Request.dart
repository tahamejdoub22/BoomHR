import 'package:flutter/material.dart';
import 'package:flutter_calendar_carousel/flutter_calendar_carousel.dart'
    show CalendarCarousel;

class CalendarPage extends StatefulWidget {
  @override
  _CalendarPageState createState() => _CalendarPageState();
}

class _CalendarPageState extends State<CalendarPage> {
  late DateTime _startDate;
  late DateTime _endDate;

  @override
  void initState() {
    super.initState();
    _startDate = DateTime.now();
    _endDate = DateTime.now();
  }

  @override
  Widget build(BuildContext context) {
    Object? congee = ModalRoute.of(context)?.settings.arguments;

    final Map<String, dynamic> args =
        ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;

    String vacation = args['vacation']!;
    String sick = args['sick']!;
    print(vacation);
    return Scaffold(
      body: ListView(
        children: <Widget>[
          Container(
              width: double.infinity,
              margin: const EdgeInsets.fromLTRB(10, 0, 0, 10),
              child: Row(
                children: [
                  IconButton(
                    icon: Icon(Icons.arrow_back),
                    onPressed: () {
                      Navigator.pushReplacementNamed(context, "/navigation");
                    },
                  ),
                  Text(" New Request",
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold))
                ],
              )),
          Container(
              width: double.infinity,
              margin: const EdgeInsets.fromLTRB(50, 10, 0, 10),
              child: Row(
                children: [
                  Text(" When will you be out ?",
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold))
                ],
              )),
          Container(
              width: double.infinity,
              margin: const EdgeInsets.fromLTRB(50, 10, 0, 10),
              child: Row(
                children: [
                  Text(" Tap or drag to select the day(s) you will be out ",
                      style: TextStyle(fontSize: 12, color: Colors.grey))
                ],
              )),
          Container(
            width: double.infinity,
            margin: const EdgeInsets.fromLTRB(30, 10, 30, 10),
            child: CalendarCarousel(
              onDayPressed: (DateTime date, List events) {
                setState(() {
                  _startDate = date;
                });
              },
              weekendTextStyle: TextStyle(
                color: Colors.red,
              ),
              thisMonthDayBorderColor: Colors.grey,
              weekFormat: false,
              height: 420.0,
              selectedDateTime: _startDate,
              showIconBehindDayText: true,
            ),
          ),
          Container(
            width: double.infinity,
            margin: const EdgeInsets.fromLTRB(30, 10, 30, 10),
            child: CalendarCarousel(
              onDayPressed: (DateTime date, List events) {
                setState(() {
                  _endDate = date;
                });
              },
              weekendTextStyle: TextStyle(
                color: Colors.red,
              ),
              thisMonthDayBorderColor: Colors.grey,
              weekFormat: false,
              height: 420.0,
              selectedDateTime: _endDate,
              showIconBehindDayText: true,
            ),
          ),
          SizedBox(height: 20.0),
          Container(
            width: double.infinity,
            margin: const EdgeInsets.fromLTRB(40, 10, 40, 10),
            child: ElevatedButton(
              onPressed: () {
                print('Start Date: $_startDate');
                // if(congee!=null) {
                //   Navigator.pushReplacementNamed(context, "/ValidateRequest"
                //     ,arguments: {'startDate': _startDate, 'endDate': _endDate,'congee':congee});
                // } else {
                print(vacation);
                Navigator.pushReplacementNamed(context, "/ValidateRequest",
                    arguments: {
                      'startDate': _startDate,
                      'endDate': _endDate,
                      'vacation': vacation,
                      'sick': sick
                    });
              },
              child: Text('Next'),
            ),
          ),
        ],
      ),
    );
  }
}
