import 'package:flutter/material.dart';
import 'package:flutter_application_1/salarynet.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Profile extends StatefulWidget {
  const Profile({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  // Define the SharedPreferences object and variables to store the retrieved data
  late SharedPreferences _prefs;
  String? _id,
      _nom,
      _prenom,
      _avatar,
      _address,
      _city,
      _country,
      _hireDate,
      _job_title;
  int? _vacation, _sick;
  Color _color = Color.fromARGB(255, 7, 124, 219);

  // Define the menu items
  final List<Map<String, String>> _menuItems = const [
    {'title': 'Logout', 'icon': 'logout'},
    {'title': 'Download Salary', 'icon': 'download'},
  ];

  // Initialize the SharedPreferences object and retrieve the stored data
  void _initSharedPreferences() async {
    try {
      _prefs = await SharedPreferences.getInstance();
      _id = _prefs.getString('userId');
      _nom = _prefs.getString('nom');
      _prenom = _prefs.getString('prenom');
      _avatar = _prefs.getString('avatar');
      _address = _prefs.getString('address');
      _city = _prefs.getString('city');
      _country = _prefs.getString('country');
      _hireDate = _prefs.getString('hire_date');
      _vacation = _prefs.getInt('vacation');
      _sick = _prefs.getInt('sick');
      _job_title = _prefs.getString('job_title');

      setState(() {}); // Refresh the state to show the retrieved data
    } catch (e) {
      print('Error initializing SharedPreferences: $e');
    }
  }

  // Helper method to convert hex color string to Color object
  Color hexToColor(String hexString) {
    final buffer = StringBuffer();
    if (hexString.length == 6 || hexString.length == 7) buffer.write('ff');
    buffer.write(hexString.replaceFirst('#', ''));
    return Color(int.parse(buffer.toString(), radix: 16));
  }

  // Handle menu item click
  void _onMenuItemTap(String title) {
    switch (title) {
      case 'Logout':
        _logout();
        break;
      case 'Settings':
        _navigateToSettings();
        break;
      case 'Download Salary':
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => NetSalaryListScreen()),
        );
        break;
    }
  }

  // Handle logout button click
  void _logout() {
    Navigator.pushNamed(
      context,
      "/",
    );
    // TODO: Implement logout logic
  }

  // Navigate to the Settings page
  void _navigateToSettings() {
    // TODO: Navigate to the Settings page
  }

  // Download the salary report
  void _downloadSalary() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => NetSalaryListScreen()),
    );
  }

  @override
  void initState() {
    super.initState();
    _initSharedPreferences(); // Call the method to initialize the SharedPreferences object
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Container(
                height: 250,
                decoration: BoxDecoration(
                  color: _color,
                  borderRadius: const BorderRadius.only(
                    bottomLeft: Radius.circular(20),
                    bottomRight: Radius.circular(20),
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    CircleAvatar(
                      radius: 50,
                      backgroundImage: _avatar != null
                          ? NetworkImage(_avatar!)
                          : const AssetImage('assets/images/avatar.png')
                              as ImageProvider<Object>?,
                    ),
                    const SizedBox(height: 10),
                    Text(
                      '$_nom $_prenom',
                      style: const TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 5),
                    Text(
                      '$_address, $_city, $_country',
                      style: const TextStyle(
                        fontSize: 16,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 5),
                    Text(
                      'Hire Date: $_hireDate',
                      style: const TextStyle(
                        fontSize: 16,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              ListTile(
                leading: const Icon(Icons.schedule),
                title: Text('Vacation Days: ${_vacation ?? 0}'),
              ),
              ListTile(
                leading: const Icon(Icons.local_hospital),
                title: Text('Sick Days: ${_sick ?? 0}'),
              ),
              ListTile(
                leading: const Icon(Icons.face_4_rounded),
                title: Text('job title: ${_job_title ?? 0}'),
              ),
              const SizedBox(height: 20),
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _menuItems.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    leading: Image.asset(
                      'assets/icons/${_menuItems[index]['icon']}.png',
                      width: 24,
                      height: 24,
                    ),
                    title: Text(_menuItems[index]['title']!),
                    onTap: () => _onMenuItemTap(_menuItems[index]['title']!),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
