import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent  implements OnInit {
  
  id!: number;
  public project : Project = new Project();
  u1 : Project = new Project();
  constructor(private projectService : ProjectService, private route : ActivatedRoute,
    private router : Router, private messageService: MessageService,) { }

  ngOnInit(): void {

    this.id =this.route.snapshot.params['id'];
    // this.id =this.data._id;
    console.log('page update');
    console.log(this.id);
        this.projectService.getProject(this.id).subscribe(data => {
      this.project= data;
      console.log(this.project);
      
      
    },
    error => console.log(error) );
  }

  verif(){
    console.log("hhhhhhhhhhhh");
    console.log(this.project);
    
    if( !this.project._id || !this.project.name || !this.project.startDate || !this.project.endDate    ){
      this.messageService.add({ severity: 'error', summary: '', detail: 'données saisies invalides' });
     }
     else{
      this.onSubmit();
     }
  }
  onSubmit(){
    console.log(this.project);
    
    this.projectService.modifyProject(this.project._id, this.project).subscribe(data => {
     this.goToList();
    },
    error => console.log(error) );
  }

 
  goToList(){
    
    this.router.navigate(['Dashboard/lproj']);
    
  }
}

