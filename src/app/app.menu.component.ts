import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppMainComponent } from './app.main.component';
import { AuthService } from './_services/auth.service';
import { StorageService } from './_services/storage.service';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppMainComponent,private authService: AuthService,public router: Router,private storageService: StorageService) { }

    ngOnInit() {
        this.model = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-th-large', routerLink: []},
            {
                label: 'Employees', icon: 'pi pi-fw pi-users', routerLink: [],
                items: [
                    {label: 'All Employees', icon: 'pi pi-fw pi-list', routerLink: []},
           
                ]
            },
            {
                label:'Leave', icon:'pi pi-fw pi-ticket', routerLink: [],
                items:[
                    {label: 'All Leave Request', icon: 'pi pi-fw pi-list', routerLink: []},
                    {label: 'Leave Balance', icon: 'pi pi-fw pi-calculator', routerLink: []},
                    {label: ' Leave Type', icon: 'pi pi-fw pi-eye', routerLink: []},

                ]
            },
            {
                label: 'Payroll', icon: 'pi pi-fw pi-dollar', routerLink: [],
                items: [
                    {label: 'Employee Salary', icon: 'pi pi-fw pi-money-bill', routerLink: []},
                    {label: 'Payslip', icon: 'pi pi-fw pi-file', routerLink: [], },
                ]
            },
            {
                label: 'Holiday', icon: 'pi pi-fw pi-sun', routerLink: [],
                items: [
                    {label: 'All Holiday', icon: 'pi pi-fw pi-list', routerLink: []},
                ]
            },
            {
                label: 'Jobs', icon: 'pi pi-fw pi-sun', routerLink: [],
                items: [
                    {label: 'All job', icon: 'pi pi-fw pi-list', routerLink: []},
                ]
            },
           
            {
                label: 'Log Out', icon: 'pi pi-fw pi-sign-out'      , routerLink: [],
                command: () => {
                    this.logout();
                }
            }
          
        ];
    }
    logout(): void {
        this.authService.logout().subscribe({
          next: res => {
            console.log(res);
            this.storageService.clean();
            this.router.navigate(['/login']);
          },
          error: err => {
            console.log(err);
          }
        });
    }
}
