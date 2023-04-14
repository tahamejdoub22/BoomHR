// import { Component, OnInit, Input } from '@angular/core';
// import { Product } from './product';
// import { ProductService } from './productservice';
// import { ConfirmationService } from 'primeng/api';
// import { MessageService } from 'primeng/api';
 import { UserService } from 'src/app/_services/user.service';
// import { HttpClient } from '@angular/common/http';
// import { User } from '../user';

// @Component({
//   selector: 'app-tab-user-role',
//   templateUrl: './tab-user-role.component.html',
//   styles: [`
//         :host ::ng-deep .p-dialog .product-image {
//             width: 150px;
//             margin: 0 auto 2rem auto;
//             display: block;
//         }
//     `],
//   styleUrls: ['./tab-user-role.component.scss']
// })
// export class TabUserRoleComponent implements OnInit{
//     users: User[];
//     productDialog: boolean;

//     products: Product[];

//     product: Product;

//     selectedProducts: Product[];

//     submitted: boolean;

//     constructor(private http: HttpClient,private productService: ProductService,private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

//     // ngOnInit() {
//     //     this.productService.getProducts().then(data => this.products = data);
//     // }
//     ngOnInit(): void {
//         //this.userService.getUsers()
//         this.http.get('http://localhost:9090/users/admin/ChangeRoleTab')
//         // .subscribe({

//         //   next: (user: any) => {
//         //     console.log(user);
//         //     //this.users = response;
//         //     this.user = user;
//         //   },
//         //   error: (error: any) => {
//         //     console.log(error);
//         //   }
//         // });
//         .subscribe((users: User[]) => {
//                      console.log(users);

//             this.users = users;
//           });
//       }




//     openNew() {
//         this.product = {};
//         this.submitted = false;
//         this.productDialog = true;
//     }

//     deleteSelectedProducts() {
//         this.confirmationService.confirm({
//             message: 'Are you sure you want to delete the selected products?',
//             header: 'Confirm',
//             icon: 'pi pi-exclamation-triangle',
//             accept: () => {
//                 this.products = this.products.filter(val => !this.selectedProducts.includes(val));
//                 this.selectedProducts = null;
//                 this.messageService.add({severity:'success', summary: 'Successful', detail: 'User(s) Deleted', life: 3000});
//             }
//         });
//     }

//     editProduct(product: Product) {
//         this.product = {...product};
//         this.productDialog = true;
//     }

//     deleteProduct(product: Product) {
//         this.confirmationService.confirm({
//             message: 'Are you sure you want to delete ' + product.name + '?',
//             header: 'Confirm',
//             icon: 'pi pi-exclamation-triangle',
//             accept: () => {
//                 this.products = this.products.filter(val => val.id !== product.id);
//                 this.product = {};
//                 this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
//             }
//         });
//     }

//     hideDialog() {
//         this.productDialog = false;
//         this.submitted = false;
//     }

//     saveProduct() {
//         this.submitted = true;

//         if (this.product.name.trim()) {
//             if (this.product.id) {
//                 this.products[this.findIndexById(this.product.id)] = this.product;
//                 this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Updated', life: 3000});
//             }
//             else {
//                 this.product.id = this.createId();
//                 //this.product.image = 'product-placeholder.svg';
//                 this.products.push(this.product);
//                 this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Created', life: 3000});
//             }

//             this.products = [...this.products];
//             this.productDialog = false;
//             this.product = {};
//         }
//     }

//     findIndexById(id: string): number {
//         let index = -1;
//         for (let i = 0; i < this.products.length; i++) {
//             if (this.products[i].id === id) {
//                 index = i;
//                 break;
//             }
//         }

//         return index;
//     }

//     createId(): string {
//         let id = '';
//         var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         for ( var i = 0; i < 5; i++ ) {
//             id += chars.charAt(Math.floor(Math.random() * chars.length));
//         }
//         return id;
//     }

// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { User } from '../user';
 
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-table',
  templateUrl: './tab-user-role.component.html',
  styleUrls: ['./tab-user-role.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TabUserRoleComponent implements OnInit {
  users: User[];

  userDialog: boolean;
  isEmailDisabled: boolean

  // products: User[];

  user: User;

  selectedUsers: User[];

  submitted: boolean;

  
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }
//*******************************work ok oko ok */
    ngOnInit(): void {
    // this.http.get<User[]>('http://localhost:9090/users/admin/ChangeRoleTab')
    this.userService.getUsers()
        .subscribe({
          next: (users: any) => {
            console.log(users);
            this.users = users;
          },
          error: (error: any) => {
            console.log(error);
          }
        });
    }
    ///********************************work */

  //   updateUser(){
  //   this.http.put('http://localhost:9090/users/admin/ChangeRoleTab/_id', this.user).subscribe(response => {
  //     console.log(response);
  //   });
  // }

  openNew() {
  
      
    
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
}


deleteSelectedUsers() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete('http://localhost:9090/users/admin/ChangeRoleTab').subscribe(response => {
              console.log(response);
              });
          this.users = this.users.filter((val) => !this.selectedUsers.includes(val));
          this.selectedUsers = null;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
      }
  });
}

editUser(user: User) {
  this.user = { ...user };
  this.userDialog = true;
  this.isEmailDisabled=true;
  console.log("hi");
}

deleteUser(user: User) {
  
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.username + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete('http://localhost:9090/users/admin/ChangeRoleTab').subscribe(response => {
                  console.log(response);
               });
        
          this.users = this.users.filter((val) => val._id !== user._id);
          this.user = {};
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      //     this.http.delete('http://localhost:9090/users/admin/ChangeRoleTab).subscribe(response => {
      //        console.log(response);
      //       });
       }
  });
}



hideDialog() {
  this.userDialog = false;
  this.submitted = false;
}

saveUser() {
  this.submitted = true;

  if (this.user.email.trim()) {
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



}
