import 'package:flutter/material.dart';

import 'Home.dart';
import 'package:intl/intl.dart';


class CongeeInfo extends StatelessWidget {
  final Congee congee;


  CongeeInfo(this.congee);

  @override
  Widget build(BuildContext context) {
    String startDate = congee.date_debut;
    String endDate =congee.date_fin;
    DateTime StartDate = DateTime.parse(startDate);
    DateTime EndDate = DateTime.parse(endDate);
    String months = DateFormat('MMMM').format(StartDate);
    String monthe = DateFormat('MMMM').format(EndDate);
    return SizedBox(
      height: 120,
      child: Card(
        child: Column(
          children: [
            Expanded(child:
             Row(
              children: [
                Expanded(child:
                 Column(
                  children: [
                    Text(congee.etat,style: TextStyle(fontWeight: FontWeight.bold,color: Colors.amber,fontSize: 20)),
                  ],
                ),
                ),
                Expanded(child: SizedBox()),
                Column(
                  children: [
                    Text(congee.note)
                    ,
                    Expanded(child: SizedBox())
                  ],
                )
                
              ],
            ),
            ),

            Row(
              mainAxisAlignment:MainAxisAlignment.center,
              children: [
                Text(StartDate.day.toString()+" "+months,style: TextStyle(fontWeight: FontWeight.bold,color: Colors.blue,fontSize: 20)),
                SizedBox(width: 20,),
                Icon(Icons.arrow_right_alt),
                SizedBox(width: 20,),
                Text(EndDate.day.toString()+" "+monthe,style: TextStyle(fontWeight: FontWeight.bold,color: Colors.blue,fontSize: 20)),
                SizedBox(width: 70,),
                IconButton(
                  icon: Icon(Icons.edit),
                  onPressed: () {
                    Navigator.pushNamed(context, "/Request",arguments: congee);
                  },
                ),
              ],
            ),
            SizedBox(height: 30,)
          ],
        ),
      ),
    );
  }
}
