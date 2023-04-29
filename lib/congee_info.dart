import 'package:flutter/material.dart';

import 'package:intl/intl.dart';

import 'Home2.dart';

class CongeeInfo extends StatelessWidget {
  final Congee congee;

  CongeeInfo(this.congee);

  @override
  Widget build(BuildContext context) {
    String startDate = congee.date_debut;
    String endDate = congee.date_fin;
    DateTime StartDate = DateTime.parse(startDate);
    DateTime EndDate = DateTime.parse(endDate);
    String months = DateFormat('MMMM').format(StartDate);
    String monthe = DateFormat('MMMM').format(EndDate);
    final duration = EndDate.difference(StartDate);
    final days = duration.inDays;
    return SizedBox(
      height: 150,
      child: Card(
        shape: RoundedRectangleBorder(
          side: BorderSide(
            // Définir la couleur de la bordure
            color: Colors.black12,
            width: 2, // Définir la largeur de la bordure
          ),
          borderRadius: BorderRadius.circular(10), // Définir le rayon des coins
        ),
        child: Column(
          children: [
            Expanded(
              child: Row(
                children: [
                  Expanded(
                      child: Column(
                    children: [
                      Text(
                        congee.etat,
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                          color: (() {
                            switch (congee.etat) {
                              case "en cours":
                                return Colors.amber;
                              case "approuvé":
                                return Colors.green;
                              case "rejeté":
                                return Colors.red;
                              default:
                                return Colors.black;
                            }
                          }()),
                        ),
                      ),
                    ],
                  )),
                  //Expanded(child: SizedBox()),
                  Column(
                    children: [
                      Text(congee.note),
                      SizedBox(
                        width: 20,
                      ),
                      // Expanded(child: SizedBox(
                      //   width: 20,
                      // ))
                    ],
                  )
                ],
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(StartDate.day.toString() + " " + months,
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.blue,
                        fontSize: 20)),
                SizedBox(
                  width: 20,
                ),
                Icon(Icons.arrow_right_alt),
                SizedBox(
                  width: 20,
                ),
                Text(EndDate.day.toString() + " " + monthe,
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.blue,
                        fontSize: 20)),
                SizedBox(
                  width: 70,
                ),
                Visibility(
                  visible:
                      congee.etat == "en cours", // Vérification de la condition
                  child: IconButton(
                    icon: Icon(Icons.edit),
                    onPressed: () {
                      Navigator.pushNamed(context, "/Request",
                          arguments: congee);
                    },
                  ),
                )
              ],
            ),
            SizedBox(
              height: 20,
            ),
            Text('le nombre total en jours est :$days',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
            SizedBox(
              height: 20,
            )
          ],
        ),
      ),
    );
  }
}
