import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]


})
export class LoginComponent  {
  loginForm: FormGroup;
  isEmailValid = true;
  isPasswordValid = true;

  constructor(private formBuilder: FormBuilder,private messageService: MessageService,    
    ) {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.messageService.add({ severity: 'success', summary: 'Login Successful', detail: 'You have successfully logged in.' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Invalid Form', detail: 'Please fill in all required fields and fix any errors.' });
    }
  }

  isEmailInvalid(): boolean {
    const email = this.email();
    return !this.isEmailValid && email.dirty && email.errors?.email;
  }

  isPasswordInvalid(): boolean {
    const password = this.password();
    return !this.isPasswordValid && password.dirty && (password.errors?.required || password.errors?.minlength);
  }

  getErrorMessage(): string {
    const email = this.email();
    const password = this.password();
    if (email.errors?.required) {
      return 'Email is required.';
    } else if (email.errors?.email) {
      return 'Email is invalid.';
    } else if (password.errors?.required) {
      return 'Password is required.';
    } else if (password.errors?.minlength) {
      return 'Password must be at least 6 characters.';
    } else {
      return '';
    }
  }

  email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}



