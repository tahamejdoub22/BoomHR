import { Component } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from '../models/employe';
import { EmployeService } from '../services/employe.service';
import { Console } from 'console';

@Component({
  selector: 'app-liste-project',
  templateUrl: './liste-project.component.html',
  styleUrls: ['./liste-project.component.scss']
})
export class ListeProjectComponent {

  public projects: Project[] = [];
  public res = Array<{name: string ,  startdate: Date, enddate: Date, projectManager: Employe}>() ;
public selectedRes : { name: string ,  startdate: Date, enddate: Date, projectManager: Employe} | undefined;
  public selectedP!: Project;
  public emp : any[];
  
  constructor(public projectService: ProjectService, private route : ActivatedRoute,private router : Router, public employeService :EmployeService) { }

  ngOnInit(): void {

    // this.SpinnerService.show();
    this.projectService.getALLProject().subscribe( data => {  
      console.log(data);
     this.projects =data;
     for ( var project of this.projects){
      console.log(project.projectManager);
     }

    //  for ( var project of this.projects){
     
    //  this.emp.push(this.employeService.getEmploye(project.projectManager));
    //  }
    
     

     console.log(this.projects);
     
          });

          // setTimeout(() => {
            
          //   this.SpinnerService.hide();
          // }, 1000);
  }
  updateProject(id : number){
    console.log(id)
    this.router.navigate(['Dashboard/updateproj', id]);
  }
  addProject(){

    this.router.navigate(['Dashboard/proj']);
  }
  deleteProject(id : number){
    this.projectService.deleteProject(id).subscribe(data => {
      console.log(data);
      this.projects = this.projects.filter(item => item._id != id);
      location.reload();
    })
    
  }

}
