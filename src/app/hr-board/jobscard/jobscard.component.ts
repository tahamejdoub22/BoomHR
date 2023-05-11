import { Component,OnInit } from '@angular/core';
import { JobService } from 'src/app/_services/job.service';
import { Job } from '../job';
import { Status } from '../status';

@Component({
  selector: 'app-jobscard',
  templateUrl: './jobscard.component.html',
  styleUrls: ['./jobscard.component.scss']
})
export class JobscardComponent implements OnInit {
  jobs: any[] = [];
//statusId = '645805bad4b73c9c28a83411';
  status : Status; 
  constructor(private jobService: JobService) {}

  ngOnInit() {
    // this.jobService.getJobsByStatus(this.statusId).subscribe((jobs) => {
    //   this.jobs = jobs;
    // });

    this.jobService.getStatusIdByName('opened')
    .subscribe((status: any) => { 
      console.log("ssssssssssssssssssss"+ status)// Specify that status is of type 'any'
      this.jobService.getJobsByStatus('645805bad4b73c9c28a83411')
        .subscribe(jobs => {
          this.jobs = jobs;
        });
    });
  }

  getJobsByOpenedStatus(){
    this.jobService.getStatusIdByName('opened')
    .subscribe((status: any) => { 
      console.log("ssssssssssssssssssss"+ status)// Specify that status is of type 'any'
      this.jobService.getJobsByStatus('645805bad4b73c9c28a83411')
        .subscribe(jobs => {
          this.jobs = jobs;
        });
    });
  }
  getJobsByClosedStatus(){
    this.jobService.getStatusIdByName('closed')
    .subscribe((status: any) => {
      this.jobService.getJobsByStatus('645805c2d4b73c9c28a83414')
        .subscribe(jobs => {
          this.jobs = jobs;
        });
    });
}
  }
