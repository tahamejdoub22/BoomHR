import { Component,OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { Customer, Representative } from './customer';
import { CustomerService } from './customerservice';
import { JobService } from 'src/app/_services/job.service';
import { CandidateService } from 'src/app/_services/candidate.service';

import { Job } from '../job';
import { join } from 'path';
import { PrimeNGConfig } from 'primeng/api';
import { Candidate } from '../candidate';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { cA } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-jobs-dashboard',
  templateUrl: './jobs-dashboard.component.html',
  styleUrls: ['./jobs-dashboard.component.scss'],
  providers: [MessageService]

})
export class JobsDashboardComponent implements OnInit {
  jobs: Job[] = [];
  candidates: any;
  topCandidates = [];
  pdfDownloaded = false;
  
  selectedCandidate: any; // new property to keep track of the selected candidate on the card
  acceptButtonDisabled: boolean;
  disabledCandidates: any[] = [];
  disabledCandidatess: any[] = [];

  visibleSidebar: boolean ;
  visibleSidebar2: boolean ;
  isStatuslDisabled: boolean;
  visibleSidebar10: boolean;
  customers: Customer[];

  representatives: Representative[];

  statuses: any[];

  //loading: boolean = true;



  newdCandidate: Candidate = {
    _id:'',
  
      name: '',
      email:'',
      phone : '',
      address: '',
      skills:'',
      status:''
    
  };
  selectedCJob: Job;
  isNamelDisabled:boolean;
  isEmailDisabled: boolean
  selectedDate: string;
  job:Job;
  selectedJobs:Job[];

  newdJob: Job = {
    _id:'',
  
    jobTitle: '',
    jobDomain:'',
    address : '',
    hiringLead: '',
    postedDate:new Date(),
    department:'',
    jobStatus:'',
    applicants:0,
    vacancies:0,
    verified: false,
  };

  activityValues: number[] = [0, 100];

  constructor(private jobService: JobService, private candidateService:CandidateService, private customerService: CustomerService,
    private confirmationService: ConfirmationService,private messageService: MessageService,
    private primengConfig: PrimeNGConfig) {}
  submitted: boolean;
  isEditing:boolean;
  displayModal: boolean;

    displayBasic: boolean;

    displayBasic2: boolean;

    displayMaximizable: boolean;

    displayPosition: boolean;

    position: string;

    showModalDialog() {
        this.displayModal = true;
    }

    showBasicDialog() {
        this.displayBasic = true;
    }

    showBasicDialog2() {
        this.displayBasic2 = true;
    }

    showMaximizableDialog() {
        this.displayMaximizable = true;
    }

    showPositionDialog(position: string) {
        this.position = position;
        this.displayPosition = true;
    }
  ngOnInit() {

    // this.jobService.getJobs().subscribe(jobs => {
    //   console.log(Object.values(jobs));
    //   this.jobs = Object.values(jobs);
    // });
    this.primengConfig.ripple = true;


    this.jobService.getJobs().subscribe(
      (data: Job[]) => {
        //console.log(data)
                this.jobs = data;
      },
      (error) => {
        console.log(error);
      }
    );
  

    // this.customerService.getCustomersLarge().then(customers => {
    //   this.customers = customers;
    //   this.loading = false;

    //   this.customers.forEach(
    //     customer => (customer.date = new Date(customer.date))
    //   );
    // });

    // this.representatives = [
    //   { name: "Amy Elsner", image: "amyelsner.png" },
    //   { name: "Anna Fali", image: "annafali.png" },
    //   { name: "Asiya Javayant", image: "asiyajavayant.png" },
    //   { name: "Bernardo Dominic", image: "bernardodominic.png" },
    //   { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    //   { name: "Ioni Bowcher", image: "ionibowcher.png" },
    //   { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    //   { name: "Onyama Limba", image: "onyamalimba.png" },
    //   { name: "Stephen Shaw", image: "stephenshaw.png" },
    //   { name: "XuXue Feng", image: "xuxuefeng.png" }
    // ];

    //  this.statuses = [
    //   { label: "Unqualified", value: "unqualified" },
    //   { label: "Qualified", value: "qualified" },
    //   { label: "New", value: "new" },
    //   { label: "Negotiation", value: "negotiation" },
    //   { label: "Renewal", value: "renewal" },
    //   { label: "Proposal", value: "proposal" }
    // ];
  }

  openNew(){
    this.job = {};
    this.submitted = false;
    this.showMaximizableDialog();
  }



editJob(job: Job){
  this.isEditing = true;
this.newdJob = { ...job };
this.displayMaximizable = true;
this.isEmailDisabled=true;
console.log("hi");
console.log("hi"+this.newdJob );


}

submitJob(jobForm: any){
  if (this.isEditing){
    console.log(this.job); // Add this line to log the value of the user object
  //let user= this.newdUser
  //let user= this.newdUser = { ...userForm };


    // console.log("User edited before " + this.user.username);
    // Call the edit user service with the updated user data
    this.jobService.updateJob(this.newdJob._id,this.newdJob).subscribe((updatedUser)=> {
      // this.users.push(data);
      console.log(updatedUser)
      console.log("job edited successfully");
      const index = this.jobs.indexOf(this.selectedCJob);
      this.jobs[index] = updatedUser;
      // this.candidateDialog = false;
      this.messageService.add({severity:'success', summary:'Job Updated', detail:'Job has been updated.'});
      window.location.reload();
      
      jobForm.resetForm();
      this.newdJob = {
        _id:'',
        jobTitle: '',
    jobDomain:'',
    address : '',
    hiringLead: '',
    postedDate:new Date(),
    department:'',
    jobStatus:'',
    applicants:0,
    vacancies:0,
    verified: false,
      };
    }, () => {
      console.error("Error editing user");
    });
  }
  else {
    this.isStatuslDisabled=true;
    console.log("submit in")
  // window.location.reload();

  // candidateForm.resetForm();
console.log(this.newdJob);
  this.jobService.addJob(this.newdJob).subscribe(data => {
    this.jobs.push(data);
    window.location.reload();

    console.log("server in")

    this.messageService.add({severity:'success', summary:'User Created', detail:'New User has been created.'});
    jobForm.resetForm();
  this.newdJob = {
    _id:'',

    jobTitle: '',
    jobDomain:'',
    address : '',
    hiringLead: '',
    postedDate:new Date(),
    department:'',
    jobStatus:'',
    applicants:0,
    vacancies:0,
    verified: false,
  };
  this.displayMaximizable = false;
  });
}
  }

  deleteSelectedJobs() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected job(s)?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

    this.selectedJobs.forEach(job => {
      this.jobService.deleteJob(job._id).subscribe(response => {
        console.log(response)
        // Handle successful deletion
        console.log("Deleted user with ID: " + job._id);
      });
    });
  
    this.jobs = this.jobs.filter((val) => !this.selectedJobs.includes(val));
    this.selectedJobs = null;

  }
});}

deleteJob(job: Job) {
  console.log("aaaaa"+ this.confirmationService);
  this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected users?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
  this.jobService.deleteJob(job._id).subscribe(response => {
    // Handle successful deletion
    console.log("deleted")
  });
 window.location.reload();
  console.log("vvvvvv"+ this.confirmationService);

}
});

}


getCanForthatJob(job: Job){
  this.visibleSidebar = true;

this.jobService.getCanJob(job._id).subscribe((respon)=> {
  console.log(job._id);
  console.log(respon);
  this.candidates = respon;

  console.log("job edited successfully");
 
  
}, () => {
  console.error("Error editing user");
});


}




getTOPCanForthatJob(job: Job){
  this.visibleSidebar2 = true;
this.jobService.getTOPCanJob(job._id).subscribe((respon: any[])=> {
  console.log(job._id);
  console.log(respon);
  this.topCandidates = respon;

  console.log("job edited successfully");
 
  
}, () => {
  console.error("Error editing user");
});


}



downloadExcel() {
  const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.querySelector('table'));
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, 'top_candidates.xlsx');
}

saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], {type: 'application/octet-stream'});
  const url: string = window.URL.createObjectURL(data);
  const link: HTMLAnchorElement = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
    link.remove();
  }, 100);
}

public downloadPdf() {
  // Select the table element
  const data = document.querySelector('table') as HTMLElement;

  // Use html2canvas to capture the table as an image
  html2canvas(data).then(canvas => {
    // Set the image width and height (in mm)
    const imgWidth = 200;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    // Convert the canvas to a data URL
    const imgData = canvas.toDataURL('image/png');

    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Add the image to the PDF document
    pdf.addImage(imgData, 'PNG', 5, 5, imgWidth - 10, imgHeight - 10);

    // Download the PDF file
    pdf.save('candidates.pdf');
  });
}



getTOPCanForthatJobRecruitement(job: Job){
  this.visibleSidebar10 = true;
this.selectedCJob=job;
if (this.selectedCJob.vacancies === 0) {

    this.acceptButtonDisabled = true;
    this.messageService.add({severity:'error', summary:'No Available Positions', detail:'We regret to inform you that all positions for this job have been filled.'});

  
   }

  

this.jobService.getTOPCanJob(job._id).subscribe((respon: any[])=> {
  console.log(job._id);
  console.log(respon);
  this.topCandidates = respon;

  console.log("get");
 
  
}, () => {
  console.error("Error editing user");
});


}

acceptCan(candidate: Candidate){
  this.selectedCandidate = candidate; // set the selected candidate
console.log("this.selectedCandidate"+this.selectedCandidate)
console.log("candidate" + candidate)

//  this.newdCandidate = { ...candidate };
 console.log("candidate" + this.newdCandidate)

    this.confirmationService.confirm({
      message: 'Are you sure you want to send this email?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.jobService.updateJob(this.selectedCJob._id, this.selectedCJob).subscribe(
          response => {



                console.log("this.selectedCandidate.status" + this.selectedCandidate.status)
                // Do something with the response
                 if (this.selectedCandidate.status === 'accepted') {
                  this.selectedCJob.vacancies = this.selectedCJob.vacancies ;
                  console.log("vaacanciiiiies fo already accepted can = " + this.selectedCJob.vacancies )
                }
                else if (this.selectedCandidate.status!== 'accepted')
                  {                
                    if (this.selectedCJob.vacancies > 0)
                   { this.selectedCJob.vacancies -= 1  ;
                    console.log("vaacanciiiiies for can = " + this.selectedCJob.vacancies )
                  }
                  else if (this.selectedCJob.vacancies <= 0){
                    // this.messageService.add({severity:'error', summary:'No Available Positions', detail:'We regret to inform you that all positions for this job have been filled.'});

                    // this.selectedCJob.jobStatus = 'closed';
                    // this.jobService.updateJobStatusToClosed(this.selectedCJob._id).subscribe(
                    //   response => {
                      
                    //     console.log('Job updated:', response);
                    //   },
                    //   error => {
                    //     console.error('Failed to update job:', error);
                    //   }
                    // );
// Bloquer l'utilisateur sur la page actuelle

document.body.style.pointerEvents = 'none';
// Rediriger l'utilisateur vers la page précédente après 3 secondes
setTimeout(() => {
    window.history.back();
  //  this.visibleSidebar10 = false;

},0);

return;
                    



                  }

                  }
                 
                  console.log("vaacanciiiiies outside result  = " + this.selectedCJob.vacancies )

          
          
          },
          error => {
            console.error('Failed to update job:', error);
          }
        
        
          );
        this.candidateService.updateCanStatusToAccepted(this.selectedCandidate._id).subscribe(
          response => {
            this.disabledCandidatess.push(candidate);

              this.candidateService.sendEmailAccept(this.selectedCandidate._id,this.selectedCandidate).subscribe((updatedUser) => {
      
                this.messageService.add({ severity:'success', summary:'Email sent', detail:'Email has been sent.' });
                  console.log("aaaaa");
                console.log(updatedUser);
                console.log("email sent successfully");
                this.selectedCandidate.status= "accepted"
      
      
                if (this.selectedCandidate.status === 'accepted'){
                  this.disabledCandidates.push(candidate);
                }
               
              //  this.selectedCJob.vacancies -= 1;
                  this.jobService.updateJob(this.selectedCJob._id, this.selectedCJob).subscribe(
                    () => {
                                if (this.selectedCJob.vacancies === 0) {
      
      
                  this.selectedCJob.jobStatus = 'closed';
                  this.jobService.updateJobStatusToClosed(this.selectedCJob._id).subscribe(
                    response => {
                      if (this.selectedCandidate.status === 'accepted'){
                        this.disabledCandidates.push(candidate);
                      }
                      console.log('Job updated:', response);
                    },
                    error => {
                      console.error('Failed to update job:', error);
                    }
                  );
                    }
                },
                () => console.error('Error updating job')
              )
                 
                
      
                //const index = this.candidates.indexOf(this.selectedCandidate);
               // this.candidates[index] = updatedUser;
                //this.candidateDialog10 = false;
              }, (error) => {
                console.error(error);
              });
                },
          error => {
            // Gérer l'erreur
                      console.error('Failed to update job:', error);
      
          }
        );
      }
    });


   // Find the job in the candidate's "jobs" list with the matching ID
  // const job = this.selectedCandidate.selectedJobs.find(job => job._id === this.selectedCJob._id);
  //  const job = this.selectedCandidate.jobs[0]; // get the first job of the candidate

   // Update the job's "vacancies" property
   /*this.selectedCJob.vacancies -= 1;
   this.jobService.updateJob(this.selectedCJob._id, this.selectedCJob).subscribe(
     () => {
       console.log('Job updated successfully');
       if (this.selectedCJob.vacancies === 0) {
         this.selectedCJob.jobStatus = 'closed';
         this.jobService.updateJob(this.selectedCJob._id, this.selectedCJob).subscribe(
           () => console.log('Job status updated to closed'),
           () => console.error('Error updating job status')
         );
       }
     },
     () => console.error('Error updating job')
   );*/




// if (this.selectedCJob.vacancies >= 0) {
//   this.jobService.updateJob(this.selectedCJob._id, this.selectedCJob).subscribe(
//     () => {
//       console.log('Job updated successfully');
//     },
//     () => console.error('Error updating job')
//   );
// }
 
   

   }


  
  

rejectCan(candidate: Candidate){
  this.selectedCandidate = candidate; // set the selected candidate

  this.confirmationService.confirm({
    message: 'Are you sure you want to send this email?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.disabledCandidatess.push(candidate);

    //  if (this.selectedCandidate.status === 'accepted'){
        this.disabledCandidatess.push(candidate);
        this.selectedCJob.vacancies += 1;
        console.log("vaacanciiiiies" + this.selectedCJob.vacancies )
        this.jobService.updateJob(this.selectedCJob._id, this.selectedCJob).subscribe(
          response => {
            // Faire quelque chose avec la réponse
            if (this.selectedCandidate.status === 'accepted'){
              this.disabledCandidatess.push(candidate);
              this.selectedCJob.vacancies += 1;
              console.log("vaacanciiiiies" + this.selectedCJob.vacancies )
            }
          },
          error => {
            // Gérer l'erreur
      
          }
        );
    //  }
      this.candidateService.sendEmailReject(this.selectedCandidate._id,this.selectedCandidate).subscribe((updatedUser) => {

        this.messageService.add({ severity:'success', summary:'Email sent', detail:'Email has been sent.' });
          console.log("aaaaa");
        console.log(updatedUser);
        console.log("email sent successfully");
      
       
        this.selectedCandidate.status= "rejected"

       
      }, (error) => {
        console.error(error);
      });
    }
  });
}


}
function showSidebar(job: Job, any: any) {
  throw new Error('Function not implemented.');
}

