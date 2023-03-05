import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';

class DoubleCalendar extends StatefulWidget {
  @override
  _DoubleCalendarState createState() => _DoubleCalendarState();
}

class _DoubleCalendarState extends State<DoubleCalendar> {
  CalendarFormat _calendarFormat = CalendarFormat.month;
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;

  CalendarFormat _calendarFormat2 = CalendarFormat.month;
  DateTime _focusedDay2 = DateTime.now();
  DateTime? _selectedDay2;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Double Calendar'),
      ),
      body: Column(
        children: [
          TableCalendar(
            firstDay: DateTime.utc(2021, 01, 01),
            lastDay: DateTime.utc(2030, 12, 31),
            focusedDay: _focusedDay,
            calendarFormat: _calendarFormat,
            selectedDayPredicate: (day) {
              return isSameDay(_selectedDay, day);
            },
            onDaySelected: (selectedDay, focusedDay) {
              setState(() {
                _selectedDay = selectedDay;
                _focusedDay = focusedDay;
              });
            },
            onFormatChanged: (format) {
              setState(() {
                _calendarFormat = format;
              });
            },
            calendarStyle: CalendarStyle(
              todayDecoration: BoxDecoration(
                color: Colors.blue,
                shape: BoxShape.circle,
              ),
              selectedDecoration: BoxDecoration(
                color: Colors.green,
                shape: BoxShape.circle,
              ),
            ),
          ),
          TableCalendar(
            firstDay: DateTime.utc(2021, 01, 01),
            lastDay: DateTime.utc(2030, 12, 31),
            focusedDay: _focusedDay2,
            calendarFormat: _calendarFormat2,
            selectedDayPredicate: (day) {
              return isSameDay(_selectedDay2, day);
            },
            onDaySelected: (selectedDay, focusedDay) {
              setState(() {
                _selectedDay2 = selectedDay;
                _focusedDay2 = focusedDay;
              });
            },
            onFormatChanged: (format) {
              setState(() {
                _calendarFormat2 = format;
              });
            },
            calendarStyle: CalendarStyle(
              todayDecoration: BoxDecoration(
                color: Colors.blue,
                shape: BoxShape.circle,
              ),
              selectedDecoration: BoxDecoration(
                color: Colors.green,
                shape: BoxShape.circle,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
