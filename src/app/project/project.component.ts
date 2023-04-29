import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import { Employe } from '../models/employe';
import { EmployeService } from '../services/employe.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  

  constructor(private route:ActivatedRoute ,private messageService: MessageService,private projectservice : ProjectService,private employeservice : EmployeService) { }
  project = new Project();
  public projects: Project[] = [];
  emp :Employe[];
  manager : Employe;
  ngOnInit(): void {
    this.employeservice.getALLEmploye().subscribe( data => {  
      console.log(data);
     this.emp =data;
  
          });


    // this.manager=this.route.snapshot.params['man'];
    // this.project.projectManager=this.manager;
    console.log(this.manager);
    console.log(this.project);
  
 //   this.projectservice.getALLProject().subscribe( data => {  
  /*    console.log(data);
     this.projects =data;
     
    
     
  
     console.log(this.projects);
          });*/
    }
  


  saveProject(){
    console.log(this.project)
    this.projectservice.saveProject(this.project).subscribe(data=>{
    this.project = new Project();
    console.log(this.project);
    this.messageService.add({severity:'success', summary:'', detail:'Bien ajouté.'});
  },error =>{
    this.messageService.add({severity:'error', summary:'', detail:'Erreur dajout.'});
  });
  }

}