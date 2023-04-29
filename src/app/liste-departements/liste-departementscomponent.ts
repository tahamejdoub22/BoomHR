import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';

import { DepartementService } from '../services/departement.service';
import { Departement } from '../models/departement';


@Component({
  selector: 'app-liste-departements',
  templateUrl: './liste-departements.component.html',
  styleUrls: ['./liste-departements.component.scss']
})
export class ListeDepartementsComponent implements OnInit {
  public departements: Departement[] = [];
  public res = Array<{name: string; description: string;  }>() ;
public selectedRes : { name: string; description: string; } | undefined;
  public selectedP!: Departement;
  constructor(public departementService: DepartementService, private route : ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    // this.SpinnerService.show();
    this.departementService.getALLDepartement().subscribe( data => {  
      console.log(data);
     this.departements =data;
     
    
     

     console.log(this.res);
          });

          // setTimeout(() => {
            
          //   this.SpinnerService.hide();
          // }, 1000);
  }



  updateDepartement(id : string){
    this.router.navigate(['Dashboard/updatedep', id]);
  }

  addDepartment(){

    this.router.navigate(['Dashboard/depart']);
  }

  deleteDepartement(id : string){
    this.departementService.deleteDepartement(id).subscribe(data => {
      console.log(data);
      this.departements = this.departements.filter(item => item.name != id);
      location.reload();
    })
    
  }

}
