
 import { UserService } from 'src/app/_services/user.service';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { User } from '../user';
 
import { ConfirmationService, MessageService } from 'primeng/api';
import { RoleService } from 'src/app/_services/role.service';
import { Role } from 'src/app/_services/role';
import { UserchangeService } from 'src/app/_services/userchange.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './tab-user-role.component.html',
  styleUrls: ['./tab-user-role.component.scss'],
  providers: [MessageService, ConfirmationService]
})


export class TabUserRoleComponent implements OnInit {
  users: User[]= [];
  displayDialog= false
  //displayDialog : boolean
  userDialog: boolean;
  isEmailDisabled: boolean
  isEditing: boolean;
  // products: User[];

  user: User;

  selectedUsers: User[];

  submitted: boolean;
  selectedUser: User;
useritem: User[];
rolesitem: Role[];
selectedRole: Role;


newdUser: User = {
  _id:'',

    username: '',
    email:'',
    password : '',
    roles: ''
  
};
  
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private roleservice : RoleService,
    private userchangeservice: UserchangeService) { }
    ngOnInit(): void {
    // this.http.get<User[]>('http://localhost:9090/users/admin/ChangeRoleTab')
    this.getusers();
    this.getRoles();
  }

  
getusers (): void{ this.userService.getUsers()
  .subscribe({
    next: (users: any) => {
      console.log(users);
      this.users = users;
    },
    error: (error: any) => {
      console.log(error);
    }
  });}


  getRoles(): void {
    this.roleservice.getRoles().subscribe(
      (data: Role[]) => {
        this.rolesitem = data;
        this.selectedRole = data[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openNew() {
  
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
}


// deleteSelectedUsers() {

//   this.confirmationService.confirm({
//       message: 'Are you sure you want to delete the selected users?',
//       header: 'Confirm',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {
//         this.http.delete('http://localhost:9090/users/admin/ChangeRoleTab/delete/:id').subscribe(response => {
//               console.log(response);
//               });
//           this.users = this.users.filter((val) => !this.selectedUsers.includes(val));
//           this.selectedUsers = null;
//           this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
//       }
//   });
// }
deleteSelectedUsers() {

  this.selectedUsers.forEach(user => {
    this.userchangeservice.deleteUser(user._id).subscribe(response => {
      // Handle successful deletion
      console.log("Deleted user with ID: " + user._id);
    });
  });

  this.users = this.users.filter((val) => !this.selectedUsers.includes(val));
  this.selectedUsers = null;
 
}

deleteUserrr(user: User) {
  console.log("aaaaa"+ this.confirmationService);
  this.userchangeservice.deleteUser(user._id).subscribe(response => {
    // Handle successful deletion
    console.log("deleted")
  });
 window.location.reload();
  console.log("vvvvvv"+ this.confirmationService);

}
// deleteUser(user: User) {
//   console.log("aaaaa"+ this.confirmationService);

//   console.log("delete in ")
//   this.confirmationService.confirm({
//       message: 'Are you sure you want to delete ' + user.username + '?',
//       header: 'Confirm',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {

//         this.userchangeservice.deleteUser().subscribe(response => {
//                   console.log(response);
//                });
        
//           this.users = this.users.filter((val) => val._id !== user._id);
//           this.user = {};
//           this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
//       //     this.http.delete('http://localhost:9090/users/admin/ChangeRoleTab).subscribe(response => {
//       //        console.log(response);
//       //       });
//        }
//   });
//   console.log("vvvvvv"+ this.confirmationService);

// }



hideDialog() {
  this.userDialog = false;
  this.submitted = false;
}

saveUser() {


  this.submitted = true;

  if (this.user.email) {
      if (this.user._id) {
        this.http.put('http://localhost:9090/users/admin/ChangeRoleTab/add', this.user).subscribe(response => {
             console.log(response);
            });
          this.users[this.findIndexById(this.user._id)] = this.user;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
           
      } 
      else {
         // this.product.id = this.createId();
          //this.product.image = 'product-placeholder.svg';
          this.http.put('http://localhost:9090/users/admin/ChangeRoleTab/add', this.user).subscribe(response => {
             console.log(response);
          });
          this.users.push(this.user);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
          

      }

      // this.http.put('http://localhost:9090/users/admin/ChangeRoleTab/add', this.user).subscribe(response => {
      //   console.log(response);
       //});
    
      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
  }
}

findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === id) {
          index = i;
          break;
      }
  }
  return index;
}

createId(): string {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}



editUser(user: User) {
  this.isEditing = true;
  this.newdUser = { ...user };
  this.displayDialog = true;
  this.isEmailDisabled=true;
  console.log("hi");
}

//ADD AND EDIT USER 2 FUNCTIONALITY HERE 
createuser(userForm: any) {
  if (this.isEditing){
    console.log(this.newdUser); // Add this line to log the value of the user object
  //let user= this.newdUser
  //let user= this.newdUser = { ...userForm };


    // console.log("User edited before " + this.user.username);
    // Call the edit user service with the updated user data
    this.newdUser.roles = this.selectedRole._id;
    this.userchangeservice.updateUser(this.newdUser._id,this.newdUser).subscribe((updatedUser)=> {
      // this.users.push(data);
      console.log(updatedUser)
      console.log("User edited successfully");
      const index = this.users.indexOf(this.selectedUser);
      this.users[index] = updatedUser;
      this.displayDialog = false;
      this.messageService.add({severity:'success', summary:'User Updated', detail:'User has been updated.'});
      window.location.reload();
      
      userForm.resetForm();
      this.newdUser = {
        _id:'',
        email:'',
        username: '',
      
        password : '',
        roles: ''
      };
      this.selectedRole = this.rolesitem[0];
    }, () => {
      console.error("Error editing user");
    });
  }
  else {
    this.newdUser.roles = this.selectedRole._id;
  this.userchangeservice.createUser(this.newdUser).subscribe(data => {
    this.users.push(data);
    window.location.reload();

    this.messageService.add({severity:'success', summary:'User Created', detail:'New User has been created.'});
    userForm.resetForm();
    this.newdUser = {
      _id:'',

      username: '',
      email:'',
      password : '',
      roles: ''
    };
    this.selectedRole = this.rolesitem[0];
    this.displayDialog = false;
  });
  }
}



showDialog() {
  this.displayDialog = true;
}


}
