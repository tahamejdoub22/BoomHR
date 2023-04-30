import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Task } from '../models/task';
import { TaskService } from '../services/tasks.services';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-liste-tasks',
  templateUrl: './liste-tasks.component.html',
  styleUrls: ['./liste-tasks.component.scss']
})
export class ListeTasksComponent {
  id!: number;
  public task : Task = new Task();
  public projet : Project = new Project() ;
  u1 : Task = new Task();
  constructor(private taskService : TaskService, private route : ActivatedRoute,
    private router : Router, private messageService: MessageService,private projectService : ProjectService) { }

  ngOnInit(): void {

    this.id =this.route.snapshot.params['id'];
    // this.id =this.data._id;
    console.log('page update');
    console.log(this.id);
        this.taskService.getTaskByProject(this.id).subscribe(data => {
      this.task= data;
      console.log(this.task);
      
      
      
    },
    error => console.log(error) );

     
     this.projectService.getProject(this.id).subscribe(data => {
      this.projet = data;
      console.log(this.task);
      console.log(this.projet.name)
      
    },
    error => console.log(error) );
  }
}
