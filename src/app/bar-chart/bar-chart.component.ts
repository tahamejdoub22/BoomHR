import { Component } from '@angular/core';
import { EmployeService } from '../services/employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from '../models/employe';
import { from, groupBy, mergeMap, toArray } from 'rxjs';
import { ex } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {

  public basicData :    any;
  public employes: Employe[] = [];
  dataOne : number[] =[];
  dataTwo : String[] =[];
  public data : any;
  tot : any;
  dep : string;
  constructor(public employeService: EmployeService, private route : ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    // this.SpinnerService.show();
    this.employeService.getALLEmploye().subscribe( data => {  
      console.log(data);
     this.employes =data;
      

//emit each person
const source = from(this.employes);
//group by age
const example = source.pipe(
groupBy(emp => emp.departement),
// return each item in group as array
  mergeMap(group => group.pipe(toArray()))
  );
console.log("***************eexxaaaaamplee******************")
console.log(example)


example.forEach(value => {
  this.tot=0;
  console.log(value);
  for (let i = 0; i < value.length; i++) {
    this.tot+=Number(value[i].salary);
    this.dep=value[i].departement;
    
  }
  // console.log(this.tot);
  
  this.dataTwo.push(value[0].departement); 
  this.dataOne.push(this.tot/value.length);
        
});
   
             console.log('data1 salaire moyen et dta 2 nom dep') ;
             console.log(this.dataOne);
             console.log(this.dataTwo);
            

             this.basicData = {
              labels:this.dataTwo,
              datasets: [
                  {
                      label: 'Salaire moyen',
                      backgroundColor: [
                        '#EC407A',
                        '#AB47BC',
                        '#42A5F5',
                        '#7E57C2',
                        '#66BB6A',
                        '#FFCA28',
                        '#26A69A'
                    ],
                      data: this.dataOne
                  },
                  // {
                  //     label: 'My Second dataset',
                  //     backgroundColor: '#FFA726',
                  //     data: [28, 48, 40, 19, 86, 27, 90]
                  // }
              ]
            };


     
          });

           
  }




}