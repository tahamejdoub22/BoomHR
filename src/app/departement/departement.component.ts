import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Departement } from '../models/departement';
import { DepartementService } from '../services/departement.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {

  
  constructor(private route:ActivatedRoute ,private departementService : DepartementService,private messageService: MessageService) { }
  departement = new Departement();
  public departements: Departement[] = [];
  ngOnInit(): void {

    
  //   this.route.paramMap.subscribe(param=> { 
  //     if (param.get('id')) {
  //       if(param.get('id') )
  //       this.idDepartement = +param.get('id');
  //       if(this.idDepartement)
  //   this.departementService.getDepartement(this.idDepartement).subscribe(data => { this.departement = data;});
  // }
  
  // }); 

  }

  saveDepartement(){
    this.departementService.saveDepartement(this.departement).subscribe(data=>{
    this.departement = new Departement();
    this.messageService.add({severity:'success', summary:'', detail:'Departement ajouté.'});
  },error =>{
    this.messageService.add({severity:'error', summary:'', detail:'Departement non ajouté.'});
  });
  }

}

