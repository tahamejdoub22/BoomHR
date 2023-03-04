import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { UserService } from './_services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    content?: string;

    menuMode = 'static';

    theme = 'absolution';

    inputStyle = 'outlined';

    ripple: boolean;
    
    constructor(private primengConfig: PrimeNGConfig,  
        private userService: UserService)  {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.ripple = true;
        this.userService.getHrManagerBoard().subscribe({
            next: data => {
              this.content = data;
            },
            error: err => {
              if (err.error) {
                try {
                  const res = JSON.parse(err.error);
                  this.content = res.message;
                } catch {
                  this.content = `Error with status: ${err.status} - ${err.statusText}`;
                }
              } else {
                this.content = `Error with status: ${err.status}`;
              }
            }
          });
        }
    }

