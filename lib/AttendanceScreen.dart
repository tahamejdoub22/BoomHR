import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:flutter_application_1/history_screen.dart';
import 'package:intl/intl.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter/material.dart';
import 'package:geocoding/geocoding.dart';
import 'package:http/http.dart' as http;
import 'package:geolocator/geolocator.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'notif_service.dart';

class AttendanceScreen extends StatefulWidget {
  const AttendanceScreen({Key? key}) : super(key: key);

  @override
  _AttendanceScreenState createState() => _AttendanceScreenState();
}

class _AttendanceScreenState extends State<AttendanceScreen> {
  FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
      FlutterLocalNotificationsPlugin();
  String? nom;
  String? prenom;

  String? _attendanceId;
  String? _checkInDate;
  String? _checkInTime;
  String? _checkOutDate;
  String? _checkOutTim;
  String? _checkOutTime;
  String? _currentLocation;
  Position? _currentPosition;
  bool _isCheckedIn = false;
  var _positionStream;

  @override
  void dispose() {
    if (_positionStream != null) {
      _positionStream!.cancel();
    }
    super.dispose();
  }

  @override
  void initState() {
    super.initState();

    _getCurrentLocation();
  }

// define a function to get the place name from coordinates
  Future<String> getPlaceNameFromCoordinates() async {
    Position position = await Geolocator.getCurrentPosition();

    List<Placemark> placemarks =
        await placemarkFromCoordinates(position.latitude, position.longitude);
    Placemark placemark = placemarks[0]; // choose the first result
    String address =
        placemark.name! + " " + placemark.country! + " " + placemark.locality!;

    return address;
  }

  Future<Object> _getCurrentLocation() async {
    bool serviceEnabled;
    LocationPermission permission;

    // Test if location services are enabled.
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      // Location services are not enabled don't continue
      // accessing the position and request users of the
      // App to enable the location services.
      return Future.error('Location services are disabled.');
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        // Permissions are denied, next time you could try
        // requesting permissions again (this is also where
        // Android's shouldShowRequestPermissionRationale
        // returned true. According to Android guidelines
        // your App should show an explanatory UI now.
        return Future.error('Location permissions are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      // Permissions are denied forever, handle appropriately.
      return Future.error(
          'Location permissions are permanently denied, we cannot request permissions.');
    }

    // When we reach here, permissions are granted and we can
    // continue accessing the position of the device.
    return await Geolocator.getCurrentPosition();
  }

  Future<void> _checkIn() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final employeeId = prefs.getString('userId');
      nom = prefs.getString('nom') ?? '';
      prenom = prefs.getString('prenom') ?? '';
      final currentLocation = await getPlaceNameFromCoordinates();
      if (Platform.isAndroid) {
        final response = await http.post(
          Uri.parse('http://10.0.2.2:8080/attendance/check-in'),
          headers: {'Content-Type': 'application/json'},
          body: json.encode({
            'employee_id': employeeId,
            'checkInTime': DateTime.now().toString(),
            'location': currentLocation // add location to request body
          }),
        );

        if (response.statusCode == 200) {
          final responseData =
              json.decode(response.body) as Map<String, dynamic>;
          final checkInDateTime =
              DateTime.parse(responseData['attendance']['checkInTime']);

          var locationemploye = responseData['attendance']['location'];
          final currentTime = DateTime.now();

          final checkInDateFormat = DateFormat('MMM dd, yyyy');
          final checkInTimeFormat = DateFormat('h:mm a');
          setState(() {
            _isCheckedIn = true;
            _attendanceId = responseData['attendance']['_id'];
            _checkInDate = checkInDateFormat.format(checkInDateTime);
            _checkInTime = checkInTimeFormat.format(checkInDateTime);
            locationemploye = _currentLocation;
            _currentLocation = currentLocation; // update current location
          });

          // Show a snackbar for successful check-in
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Check-in successful')),
          );
          NotificationService().showNotification(
            title: 'Checked In!',
            body: '$nom $prenom have successfully checked in at $_checkInTime.',
          );
        } else {
          // Send a notification for successful check-in

          // Handle non-200 response
          print('Error: ${response.statusCode}');
        }
      } else {
        final response = await http.post(
          Uri.parse('http://localhost:8080/attendance/check-in'),
          headers: {'Content-Type': 'application/json'},
          body: json.encode({
            'employee_id': employeeId,
            'checkInTime': DateTime.now().toString(),
            'location': currentLocation // add location to request body
          }),
        );

        if (response.statusCode == 200) {
          final responseData =
              json.decode(response.body) as Map<String, dynamic>;
          final checkInDateTime =
              DateTime.parse(responseData['attendance']['checkInTime']);

          var locationemploye = responseData['attendance']['location'];
          final currentTime = DateTime.now();

          final checkInDateFormat = DateFormat('MMM dd, yyyy');
          final checkInTimeFormat = DateFormat('h:mm a');
          setState(() {
            _isCheckedIn = true;
            _attendanceId = responseData['attendance']['_id'];
            _checkInDate = checkInDateFormat.format(checkInDateTime);
            _checkInTime = checkInTimeFormat.format(checkInDateTime);
            locationemploye = _currentLocation;
            _currentLocation = currentLocation; // update current location
          });

          // Show a snackbar for successful check-in
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Check-in successful')),
          );
          NotificationService().showNotification(
            title: 'Checked In!',
            body: '$nom $prenom have successfully checked in at $_checkInTime.',
          );
        } else {
          // Send a notification for successful check-in

          // Handle non-200 response
          print('Error: ${response.statusCode}');
        }
      }
    } catch (error) {
      print(error);
    }
  }

  Future<void> _checkOut() async {
    try {
      if (_positionStream != null) {
        await _positionStream!.cancel();
      }
      if (Platform.isAndroid) {
        final response = await http.patch(
          Uri.parse('http://10.0.2.2:8080/attendance/check-out/$_attendanceId'),
          headers: {'Content-Type': 'application/json'},
          body: json.encode({
            'checkOutTime': DateTime.now().toString(),
            'location': _currentLocation // add location to request body
          }),
        );

        if (response.statusCode == 200) {
          final responseData =
              json.decode(response.body) as Map<String, dynamic>;
          var locationemploye = responseData['attendance']['location'];
          final checkOutDateTime =
              DateTime.parse(responseData['attendance']['checkOutTime']);
          final checkoutDateFormat = DateFormat('MMM dd, yyyy');
          final checkoutTimeFormat = DateFormat('h:mm a');
          setState(() {
            _checkOutDate = checkoutDateFormat.format(checkOutDateTime);
            _checkOutTim = checkoutTimeFormat.format(checkOutDateTime);
            _isCheckedIn = false;
            _attendanceId = null;
            _checkOutTime = null;
            locationemploye = _currentLocation; // clear current location
          });
          NotificationService().showNotification(
            title: 'Checked out!',
            body:
                '$nom $prenom have successfully checked out at $_checkOutTime.',
          );
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Check-out successful')),
          );
        } else {
          // Handle non-200 response
          print('Error: ${response.statusCode}');
        }
      } else {
        final response = await http.patch(
          Uri.parse(
              'http://localhost:8080/attendance/check-out/$_attendanceId'),
          headers: {'Content-Type': 'application/json'},
          body: json.encode({
            'checkOutTime': DateTime.now().toString(),
            'location': _currentLocation // add location to request body
          }),
        );

        if (response.statusCode == 200) {
          final responseData =
              json.decode(response.body) as Map<String, dynamic>;
          var locationemploye = responseData['attendance']['location'];
          final checkOutDateTime =
              DateTime.parse(responseData['attendance']['checkOutTime']);
          final checkoutDateFormat = DateFormat('MMM dd, yyyy');
          final checkoutTimeFormat = DateFormat('h:mm a');
          setState(() {
            _checkOutDate = checkoutDateFormat.format(checkOutDateTime);
            _checkOutTim = checkoutTimeFormat.format(checkOutDateTime);
            _isCheckedIn = false;
            _attendanceId = null;
            _checkOutTime = null;
            locationemploye = _currentLocation; // clear current location
          });
          NotificationService().showNotification(
            title: 'Checked out!',
            body:
                '$nom $prenom have successfully checked out at $_checkOutTime.',
          );
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Check-out successful')),
          );
        } else {
          // Handle non-200 response
          print('Error: ${response.statusCode}');
        }
      }
    } catch (error) {
      print(error);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const SizedBox(height: 50),
                  Card(
                    child: ListTile(
                      subtitle: Text(
                        'As Employee, you must  complete your attendence every day ',
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.normal,
                        ),
                      ),
                      trailing: IconButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) =>
                                    AttendanceHistoryScreen()),
                          );
                        },
                        icon: const Icon(Icons.history),
                      ),
                    ),
                  ),
                  const SizedBox(height: 30),
                  Expanded(
                    child: SingleChildScrollView(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                _isCheckedIn
                                    ? 'You are checked in on $_checkInDate'
                                    : 'You are not checked in',
                                style: const TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.w400,
                                ),
                                textAlign: TextAlign.left,
                              ),
                              const SizedBox(height: 16),
                              Text(
                                _isCheckedIn ? '  $_checkInTime' : '',
                                style: const TextStyle(
                                  fontSize: 60,
                                  fontWeight: FontWeight.w900,
                                ),
                                textAlign: TextAlign.left,
                              ),
                              const SizedBox(height: 9),
                              if (!_isCheckedIn)
                                Container(
                                  width: 300,
                                  height: 300,
                                  decoration: const BoxDecoration(
                                    color: Colors.blue,
                                    shape: BoxShape.circle,
                                  ),
                                  child: InkWell(
                                    onTap: () async {
                                      await _checkIn();
                                    },
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        const Icon(
                                          Icons.access_time,
                                          color: Colors.white,
                                          size: 60,
                                        ),
                                        const SizedBox(height: 16),
                                        const Text(
                                          'Check In',
                                          style: TextStyle(
                                            color: Colors.white,
                                            fontSize: 24,
                                            fontWeight: FontWeight.bold,
                                          ),
                                          textAlign: TextAlign.center,
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              const SizedBox(height: 16),
                              if (_isCheckedIn)
                                Container(
                                  width: 300,
                                  height: 300,
                                  decoration: const BoxDecoration(
                                    color: Colors.red,
                                    shape: BoxShape.circle,
                                  ),
                                  child: InkWell(
                                    onTap: () async {
                                      await _getCurrentLocation();
                                      setState(() {
                                        _checkOutTime =
                                            DateTime.now().toString();
                                      });
                                      await _checkOut();
                                    },
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        const Icon(
                                          Icons.time_to_leave,
                                          color: Colors.white,
                                          size: 60,
                                        ),
                                        const SizedBox(height: 16),
                                        const Text(
                                          'Check Out',
                                          style: TextStyle(
                                            color: Colors.white,
                                            fontSize: 15,
                                            fontWeight: FontWeight.w900,
                                          ),
                                          textAlign: TextAlign.center,
                                        ),
                                        const SizedBox(height: 8),
                                        Text(
                                          '$_checkOutDate at $_checkOutTim',
                                          style: const TextStyle(
                                            color: Colors.white,
                                            fontSize: 12,
                                          ),
                                          textAlign: TextAlign.center,
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              const SizedBox(height: 16),
                              if (_isCheckedIn && _currentLocation != null)
                                FutureBuilder(
                                    future: getPlaceNameFromCoordinates(),
                                    builder: (BuildContext context,
                                        AsyncSnapshot<String> snapshot) {
                                      if (snapshot.hasData) {
                                        return _checkOutTime == null
                                            ? Text(
                                                snapshot.data.toString(),
                                                style: const TextStyle(
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.normal,
                                                ),
                                                textAlign: TextAlign.center,
                                              )
                                            : const SizedBox.shrink();
                                      } else {
                                        return const CircularProgressIndicator();
                                      }
                                    }),
                            ],
                          ),
                          const SizedBox(height: 16),
                        ],
                      ),
                    ),
                  )
                ])));
  }
}
