import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../services/employe.service';
import { MessageService } from 'primeng/api';
import { Employe } from '../models/employe';
import { Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';





@Component({
  selector: 'app-update-employe',
  templateUrl: './update-employe.component.html',
  styleUrls: ['./update-employe.component.scss']
})
export class UpdateEmployeComponent implements OnInit  {
  id!: number;
  public employe : Employe = new Employe();
  u1 : Employe = new Employe();
  constructor(private employeService : EmployeService,  private route : ActivatedRoute,private router : Router,
     private messageService: MessageService, @Inject(MAT_DIALOG_DATA) public data: any,
     public dialogRef: MatDialogRef<UpdateEmployeComponent>) { }

  ngOnInit(): void {

    // this.id =this.route.snapshot.params['id'];
    this.id =this.data.id;
    console.log('page update');
    console.log(this.id);
        this.employeService.getEmploye(this.id).subscribe(data => {
      this.employe= data;
      // console.log(this.employe);
      
      
    },
    error => console.log(error) );
  }

  verif(){
    console.log("hhhhhhhhhhhh");
    console.log(this.employe);
    
    if( !this.employe._id || !this.employe.fullname || !this.employe.address || !this.employe.email ){
      this.messageService.add({ severity: 'error', summary: '', detail: 'données saisies invalides' });
     }
     else{
      this.onSubmit();
     }
  }
  onSubmit(){
   
    console.log('mooooodiiiiif')
     console.log(this.employe);
    this.employeService.modifyEmploye(this.employe._id ,this.employe).subscribe(data => {
      console.log('c bon')
     this.goToList();
     
     
    },
    error => console.log(error) );
  }

 
  goToList(){
   console.log('redirrrrrrr')
    this.router.navigate(['Dashboard/lemp']);
    location.reload();
  }
}
