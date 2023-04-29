import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Departement } from '../models/departement';
import { DepartementService } from '../services/departement.service';

@Component({
  selector: 'app-update-departement',
  templateUrl: './update-departement.component.html',
  styleUrls: ['./update-departement.component.scss']
})
export class UpdateDepartementComponent implements OnInit {
  
  id!: number;
  public departement : Departement = new Departement();
  u1 : Departement = new Departement();
  constructor(private departementService : DepartementService, private route : ActivatedRoute,
    private router : Router, private messageService: MessageService,) { }

  ngOnInit(): void {

    this.id =this.route.snapshot.params['id'];
    // this.id =this.data._id;
    console.log('page update');
    console.log(this.id);
        this.departementService.getDepartement(this.id).subscribe(data => {
      this.departement= data;
      console.log(this.departement);
      
      
    },
    error => console.log(error) );
  }

  verif(){
    console.log("hhhhhhhhhhhh");
    console.log(this.departement);
    
    if( !this.departement._id || !this.departement.name || !this.departement.description  ){
      this.messageService.add({ severity: 'error', summary: '', detail: 'données saisies invalides' });
     }
     else{
      this.onSubmit();
     }
  }
  onSubmit(){
    console.log(this.departement);
    
    this.departementService.modifyDepartement(this.departement._id , this.departement).subscribe(data => {
     this.goToList();
    },
    error => console.log(error) );
  }

 
  goToList(){
    
    this.router.navigate(['Dashboard/ldep']);
    
  }
}
