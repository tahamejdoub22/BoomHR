import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Employe } from '../models/employe';
import { EmployeService } from '../services/employe.service';

@Component({
  selector: 'app-profil-employe',
  templateUrl: './profil-employe.component.html',
  styleUrls: ['./profil-employe.component.scss']
})
export class ProfilEmployeComponent implements OnInit {
  id!: number;
  public employe : Employe = new Employe();
  u1 : Employe = new Employe();
  constructor(private employeService : EmployeService, private route : ActivatedRoute,
    private router : Router, private messageService: MessageService,) { }

  ngOnInit(): void {

    this.id =this.route.snapshot.params['id'];
    // this.id =this.data._id;
   
    console.log(this.id);
        this.employeService.getEmploye(this.id).subscribe(data => {
      this.employe= data;
      console.log(this.employe);
      
      
    },
    error => console.log(error) );
  }

  getShortName(fullName :string) { 
    return fullName.split(' ').map(n => n[0]).join('');
  }

}
