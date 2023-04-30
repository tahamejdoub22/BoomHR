import { Component } from '@angular/core';
import { DepartementService } from '../services/departement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from '../models/departement';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  public departements: Departement[] = [];
  dataOne : number[] =[];
  dataTwo : String[] =[];
  public data : any;
  constructor(public departementService: DepartementService, private route : ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    // this.SpinnerService.show();
    this.departementService.getALLDepartement().subscribe( data => {  
      console.log(data);
     this.departements =data;
      

      for (var dep of this.departements) {
        this.dataTwo.push(dep.name);
        // this.dataOne.push(dep.employeId.length);
        console.log(dep.employeId.length);
        this.dataOne.push(dep.employeId.length);
             }    
             console.log('data1 nbre demp et dta 2 nom dep') 
             console.log(this.dataOne);
             console.log(this.dataTwo);
             this.data = {
              labels: this.dataTwo,
              datasets: [
                  {
                      data: this.dataOne,
                      backgroundColor: [
                          "#42A5F5",
                          "#66BB6A",
                          "#FFA726",
                          "#dc3545",
                          "#6f42c1",
                          "#343a40",
                          "#6c757d",
                          "#e83e8c",
                          "#20c997",
                          "#fd7e14",
                          "#20c997"
                      ],
                      hoverBackgroundColor: [
                        "#42A5F5",
                        "#66BB6A",
                        "#FFA726",
                        "#dc3545",
                        "#6f42c1",
                        "#343a40",
                        "#6c757d",
                        "#e83e8c",
                        "#20c997",
                        "#fd7e14",
                        "#20c997"
                      ]
                  }
              ]
          };
     
          });

           
  }


}
