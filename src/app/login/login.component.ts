import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

import {MessageModule} from 'primeng/message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class loginComponent implements OnInit {
  loginForm: FormGroup;
  isUsernameValid = false;
  isPasswordValid = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
  
    this.authService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
    .subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this. roles = this.storageService.getUser().roles;
        const roles = this.storageService.getUser().roles;

        console.log('Roles: ', roles);
        if (roles.includes("ROLE_USER")) {
          this.router.navigate(['user']);

        } else if (roles.includes("ROLE_HRMANAGER")) {
          this.router.navigate(['Dashboard']);
        } else if (roles.includes("ROLE_ADMIN")) {   
          console.log('Roles: ', roles);
          this.router.navigate(['admin']);
        }
        
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isLoggedIn = false;

      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
            
           

           
  

  isUsernameInvalid() {
    return this.loginForm.controls.username.invalid && this.loginForm.controls.username.dirty;
  }

  isPasswordInvalid() {
    return this.loginForm.controls.password.invalid && this.loginForm.controls.password.dirty;
  }

  getErrorMessage() {
    if (this.loginForm.controls.username.hasError('required')) {
      return 'Username is required';
    } else if (this.loginForm.controls.password.hasError('required')) {
      return 'Password is required';
    } else if (this.isUsernameInvalid()) {
      return 'Username should contain only letters and numbers';
    } else if (this.isPasswordInvalid()) {
      return 'Password should contain at least one uppercase letter, one lowercase letter, one number and one special character';
    }
    return '';
  }
  

}