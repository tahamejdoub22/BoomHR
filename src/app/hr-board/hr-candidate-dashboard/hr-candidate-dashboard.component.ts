import { Component,OnInit } from '@angular/core';
import { ConfirmationService,MessageService } from "primeng/api";

import { CandidateService } from 'src/app/_services/candidate.service';
import { Candidate } from '../candidate';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hr-candidate-dashboard',
  templateUrl: './hr-candidate-dashboard.component.html',
  styleUrls: ['./hr-candidate-dashboard.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class HrCandidateDashboardComponent implements OnInit {
  candidateDialog: boolean;
  candidateDialog111: boolean;
  candidateDialog10 : boolean;
  candidateDialogaccept : boolean;
  candidateDialogreject:boolean;
  selectedCandidate: Candidate;
  isNamelDisabled:boolean;
  isEmailDisabled: boolean
  selectedDate: string;
  selectedTime:string = '12:00';
  candidate:Candidate;
  candidates: Candidate[] = [];
  statuses: any[];
  selectedCandidates:Candidate[];

  newdCandidate: Candidate = {
    _id:'',
  
      name: '',
      email:'',
      phone : '',
      address: '',
      skills:'',
      status:''
    
  };
  constructor(private candidateService: CandidateService,
    private http: HttpClient,
    private messageService: MessageService, private confirmationService: ConfirmationService) {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.selectedDate = nextWeek.toISOString().substring(0, 10);
  }


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

    this.candidate = {}; // Initialize candidate object to empty object


    this.candidateService.getJobs().subscribe(
      (data: Candidate[]) => {
        //console.log(data)
                this.candidates = data;
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

    // this.statuses = [
    //     { label: "disqualified", value: "disqualified" },
    //     { label: "qualified", value: "qualified" },
    //     { label: "an applicant", value: "an applicant" },
       
    //   ];

    //  this.statuses = [
    //   { label: "Unqualified", value: "unqualified" },
    //   { label: "Qualified", value: "qualified" },
    //   { label: "New", value: "new" },
    //   { label: "Negotiation", value: "negotiation" },
    //   { label: "Renewal", value: "renewal" },
    //   { label: "Proposal", value: "proposal" }
    // ];
  }

  scheduleMeeting(candidate: Candidate) {
    this.candidateDialog10 = true;
    this.newdCandidate = { ...candidate };
    this.isEmailDisabled=true;
    this.isNamelDisabled=true;
    console.log("hi");
    console.log("hi"+this.newdCandidate );
  }
  acceptCandidateEmail(candidate: Candidate) {
    this.candidateDialogaccept = true;
    this.newdCandidate = { ...candidate };
    this.isEmailDisabled=true;
    this.isNamelDisabled=true;
    console.log("acceptCandidateEmail");
    console.log("hi"+this.newdCandidate );
  }
  rejectCandidateEmail(candidate: Candidate) {
    this.candidateDialogreject = true;
    this.newdCandidate = { ...candidate };
    this.isEmailDisabled=true;
    this.isNamelDisabled=true;
    console.log("rejectCandidateEmail");
    console.log("hi"+this.newdCandidate );
  }
  openNew(){
    this.candidate = {};
    this.submitted = false;
    this.showMaximizableDialog();
  }

  createCandidate(){

  }


  editCandidate(candidate: Candidate){
    this.isEditing = true;
  this.newdCandidate = { ...candidate };
  this.displayMaximizable = true;
  this.isEmailDisabled=true;
  console.log("hi");
  console.log("hi"+this.newdCandidate );


  }
  submitCandidate(candidateForm: any){
    if (this.isEditing){
      console.log(this.candidate); // Add this line to log the value of the user object
    //let user= this.newdUser
    //let user= this.newdUser = { ...userForm };
  
  
      // console.log("User edited before " + this.user.username);
      // Call the edit user service with the updated user data
      this.candidateService.updateCandidate(this.newdCandidate._id,this.newdCandidate).subscribe((updatedUser)=> {
        // this.users.push(data);
        console.log(updatedUser)
        console.log("User edited successfully");
        const index = this.candidates.indexOf(this.selectedCandidate);
        this.candidates[index] = updatedUser;
        this.candidateDialog = false;
        this.messageService.add({severity:'success', summary:'User Updated', detail:'User has been updated.'});
        window.location.reload();
        
        candidateForm.resetForm();
        this.newdCandidate = {
          _id:'',
          name: '',
      email:'',
      phone : '',
      address: '',
      skills:'',
      status:''
        };
      }, () => {
        console.error("Error editing user");
      });
    }
    else {

      console.log("submit in")
    // window.location.reload();

    // candidateForm.resetForm();
console.log(this.newdCandidate);
    this.candidateService.addCandidate(this.newdCandidate).subscribe(data => {
      this.candidates.push(data);
      window.location.reload();

      console.log("server in")

      this.messageService.add({severity:'success', summary:'User Created', detail:'New User has been created.'});
      candidateForm.resetForm();
    this.newdCandidate = {
      _id:'',

      name: '',
      email:'',
      phone : '',
      address: '',
      skills:'',
      status:''
    };
    this.displayMaximizable = false;
    });
  }
    }

    deleteSelectedCandidates() {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected users?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

      this.selectedCandidates.forEach(candidate => {
        this.candidateService.deleteCandidate(candidate._id).subscribe(response => {
          console.log(response)
          // Handle successful deletion
          console.log("Deleted user with ID: " + candidate._id);
        });
      });
    
      this.candidates = this.candidates.filter((val) => !this.selectedCandidates.includes(val));
      this.selectedCandidates = null;
  
    }
  });}




    deleteCandidate(candidate: Candidate) {
      console.log("aaaaa"+ this.confirmationService);
      this.confirmationService.confirm({
              message: 'Are you sure you want to delete the selected users?',
              header: 'Confirm',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
      this.candidateService.deleteCandidate(candidate._id).subscribe(response => {
        // Handle successful deletion
        console.log("deleted")
      });
     window.location.reload();
      console.log("vvvvvv"+ this.confirmationService);
    
    }
  });
    
    }
  


    onSubmit(myForm: any) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to send this email?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.candidateService.sendEmail(this.newdCandidate._id, this.selectedDate, this.selectedTime,this.newdCandidate).subscribe((updatedUser) => {

            this.messageService.add({ severity:'success', summary:'Email sent', detail:'Email has been sent.' });
              console.log("aaaaa");
            console.log(updatedUser);
            console.log("email sent successfully");
            //const index = this.candidates.indexOf(this.selectedCandidate);
           // this.candidates[index] = updatedUser;
            this.candidateDialog10 = false;

            // myForm.resetForm();
            // this.newdCandidate = {
            //   _id:'',
            //   name: '',
            //   email:'',
            //   phone : '',
            //   address: '',
            //   skills:'',
            //   status:''
            // };
          }, (error) => {
            console.error(error);
          });
        }
      });
    }

    onSubmitReject(myForm: any) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to send this email?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.candidateService.sendEmailReject(this.newdCandidate._id,this.newdCandidate).subscribe((updatedUser) => {

            this.messageService.add({ severity:'success', summary:'Email sent', detail:'Email has been sent.' });
              console.log("aaaaa");
            console.log(updatedUser);
            console.log("email sent successfully");
            //const index = this.candidates.indexOf(this.selectedCandidate);
           // this.candidates[index] = updatedUser;
            this.candidateDialog10 = false;
            this.selectedCandidate.status= "rejected"

            // myForm.resetForm();
            // this.newdCandidate = {
            //   _id:'',
            //   name: '',
            //   email:'',
            //   phone : '',
            //   address: '',
            //   skills:'',
            //   status:''
            // };
          }, (error) => {
            console.error(error);
          });
        }
      });
    }

    onSubmitAccept(myForm: any) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to send this email?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.candidateService.sendEmailAccept(this.newdCandidate._id, this.newdCandidate).subscribe((updatedUser) => {

            this.messageService.add({ severity:'success', summary:'Email sent', detail:'Email has been sent.' });
              console.log("aaaaa");
            console.log(updatedUser);
            console.log("email sent successfully");
            //const index = this.candidates.indexOf(this.selectedCandidate);
           // this.candidates[index] = updatedUser;
            this.candidateDialog10 = false;
            this.selectedCandidate.status= "rejected"

            // myForm.resetForm();
            // this.newdCandidate = {
            //   _id:'',
            //   name: '',
            //   email:'',
            //   phone : '',
            //   address: '',
            //   skills:'',
            //   status:''
            // };
          }, (error) => {
            console.error(error);
          });
        }
      });
    }
    
    }
  