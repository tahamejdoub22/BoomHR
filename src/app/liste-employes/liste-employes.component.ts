import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';

import { EmployeService } from '../services/employe.service';
import { Employe } from '../models/employe';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEmployeComponent } from '../update-employe/update-employe.component';

@Component({
  selector: 'app-liste-employes',
  templateUrl: './liste-employes.component.html',
  styleUrls: ['./liste-employes.component.scss'],
  providers: [MatDialog]
})
export class ListeEmployesComponent implements OnInit {

  public employes: Employe[] = [];
  public res = Array<{fullname: string ,  qutite: number, total: number}>() ;
public selectedRes : { prenom: string; nom: string; cin: number; entreprise: string; direction: string;} | undefined;
  public selectedP!: Employe;
  employeid : number;
  constructor(public employeService: EmployeService, private route : ActivatedRoute,private router : Router,
     public matDialog: MatDialog, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {

    // this.SpinnerService.show();
    this.employeService.getALLEmploye().subscribe( data => {  
      console.log(data);
     this.employes =data;
     
     
    
     

     console.log(this.res);
     
          });

          // setTimeout(() => {
            
          //   this.SpinnerService.hide();
          // }, 1000);
  }
  updateEmploye(id : number){
    console.log(id)
    //  this.router.navigate(['updateemploye', id]);
    this.employeid= id;
    this.openDialog(id);
  }
  addEmploye(){

    this.router.navigate(['Dashboard/emp']);
  }

openDialog(n : number) {
  const dialogRef = this.matDialog.open(UpdateEmployeComponent, {
    width: '50%',
    height :'80%',
    data: { id: n }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
 
}
openDetails(n : number) {
  this.router.navigate(['Dashboard/prof', n]);
  
}
// navigateToUpdateEmploye() {
//   this.router.navigate(['Dashboard/updateemploye', this.employeid]);
  
// }

  deleteEmploye(id : number){
    this.employeService.deleteEmploye(id).subscribe(data => {
      console.log(data);
      this.employes = this.employes.filter(item => item._id != id);
      location.reload();
    })
    
  }
}
