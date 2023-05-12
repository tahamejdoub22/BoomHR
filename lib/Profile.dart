import 'package:flutter/material.dart';
import 'package:flutter_application_1/salarynet.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:intl/intl.dart';

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
  String? _vacation, _sick;
  Color _color = Color.fromARGB(255, 7, 124, 219);

  // Define the menu items
  final List<Map<String, String>> _menuItems = const [
    {'title': 'Download Salary', 'icon': 'download'},
    {'title': 'Logout', 'icon': 'logout'},
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
      _vacation = _prefs.getString('vacation');
      _sick = _prefs.getString('sick');
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

  String _formatHireDate(String? hireDate) {
    if (hireDate == null) return '';

    final hireDateTime = DateTime.parse(hireDate);
    final dateFormatter =
        DateFormat('MMM dd, yyyy'); // Change the format as needed
    final timeFormatter = DateFormat('hh:mm a'); // Change the format as needed

    final formattedDate = dateFormatter.format(hireDateTime);
    final formattedTime = timeFormatter.format(hireDateTime);

    return '$formattedDate at $formattedTime';
  }

  @override
  void initState() {
    super.initState();
    _initSharedPreferences(); // Call the method to initialize the SharedPreferences object
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF74B6FF), Color(0xFF1669F2)],
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 5,
            blurRadius: 7,
            offset: Offset(0, 3),
          ),
        ],
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(30),
          bottomRight: Radius.circular(30),
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Container(
            decoration: BoxDecoration(
              border: Border.all(
                color: Colors.white,
                width: 3,
              ),
              shape: BoxShape.circle,
            ),
            child: CircleAvatar(
              radius: 70,
              backgroundImage: _avatar != null
                  ? NetworkImage(_avatar!)
                  : const AssetImage('assets/iconq/logo.png')
                      as ImageProvider<Object>?,
            ),
          ),
          const SizedBox(height: 25),
          Text(
            '$_nom $_prenom',
            style: const TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 15),
          Text(
            '$_address, $_city, $_country',
            style: const TextStyle(
              fontSize: 20,
              color: Colors.white70,
            ),
          ),
          const SizedBox(height: 15),
          Text(
            'Hire Date: ${_formatHireDate(_hireDate)}',
            style: const TextStyle(
              fontSize: 20,
              color: Colors.white70,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildListItem(IconData icon, String title, Function onTap) {
    return InkWell(
      onTap: () => onTap(),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: ListTile(
          contentPadding: const EdgeInsets.symmetric(horizontal: 20),
          leading: Icon(icon, color: _color, size: 28),
          title: Text(
            title,
            style: const TextStyle(color: Colors.grey, fontSize: 18),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              _buildHeader(),
              const SizedBox(
                height: 32,
              ), // increase spacing between header and list
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.3),
                      spreadRadius: 2,
                      blurRadius: 5,
                      offset: const Offset(0, 3),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    const Text(
                      'Information',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey,
                      ),
                    ),
                    const SizedBox(height: 20),
                    _buildListItem(
                      Icons.schedule,
                      'Vacation Days: ${_vacation ?? 0}',
                      () => {},
                    ),
                    _buildListItem(
                      Icons.local_hospital,
                      'Sick Days: ${_sick ?? 0}',
                      () => {},
                    ),
                    _buildListItem(
                      Icons.face,
                      'Job Title: ${_job_title ?? 0}',
                      () => {},
                    ),
                  ],
                ),
              ),
              const SizedBox(
                height: 32,
              ), // add some spacing between information and settings
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.3),
                      spreadRadius: 2,
                      blurRadius: 5,
                      offset: const Offset(0, 3),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    const Text(
                      'Settings',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey,
                      ),
                    ),
                    const SizedBox(height: 20),
                    ListView.builder(
                      padding: EdgeInsets.zero,
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: _menuItems.length,
                      itemBuilder: (context, index) {
                        return _buildListItem(
                          Icons.circle,
                          _menuItems[index]['title']!,
                          () => _onMenuItemTap(_menuItems[index]['title']!),
                        );
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
