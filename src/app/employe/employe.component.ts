import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

import { EmployeService } from '../services/employe.service';
import { Employe } from '../models/employe';
import { DepartementService } from '../services/departement.service';
import { Departement } from '../models/departement';


@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {
  

  constructor(private route:ActivatedRoute ,private messageService: MessageService,private employeservice : EmployeService , private departementservice : DepartementService) { }
  employe = new Employe();
  public employes: Employe[] = [];
  dep :Departement[];
  ngOnInit(): void {

 //   this.employeservice.getALLEmploye().subscribe( data => {  
  /*    console.log(data);
     this.employes =data;
     
    
     
  
     console.log(this.employes);
          });*/

          this.departementservice.getALLDepartement().subscribe( data => {  
            console.log(data);
           this.dep =data;
        
                });
    }
  


  saveEmploye(){

    this.employeservice.saveEmploye(this.employe).subscribe(data=>{
    this.employe = new Employe();
    console.log(this.employe);
    this.messageService.add({severity:'success', summary:'', detail:'Bien ajouté.'});
  },error =>{
    this.messageService.add({severity:'error', summary:'', detail:'Erreur dajout.'});
  });
  }

}