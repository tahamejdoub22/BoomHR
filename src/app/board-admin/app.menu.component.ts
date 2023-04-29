import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { BoardAdminComponent } from './board-admin.component';

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

    constructor(public app: BoardAdminComponent,private authService: AuthService,public router: Router,private storageService: StorageService) { }

    ngOnInit() {
        this.model = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-th-large', routerLink: []},
            {
                label: 'users', icon: 'pi pi-fw pi-users', routerLink: [],
                items: [
                    {label: 'All users', icon: 'pi pi-fw pi-list', routerLink: []},
           
                ]
            },
            
            {
                label: 'roles', icon: 'pi pi-fw pi-sun', routerLink: [],
                items: [
                    {label: 'All roles', icon: 'pi pi-fw pi-list', routerLink: []},
                ]
            },
            {
                label: 'employes', icon: 'pi pi-fw pi-users', routerLink: [],
                items: [
                    {label: 'All employees', icon: 'pi pi-fw pi-list', routerLink: ['lemp']},
           
                ]
            },
            {
                label: 'departments', icon: 'pi pi-fw pi-users', routerLink: [],
                items: [
                    {label: 'All departments', icon: 'pi pi-fw pi-list', routerLink: ['ldep']},
           
                ]
            },
            {
                label: 'projects', icon: 'pi pi-fw pi-users', routerLink: [],
                items: [
                    {label: 'All projects', icon: 'pi pi-fw pi-list', routerLink: []},
           
                ]
            },
            {
                label: 'Diagrammes', icon: 'pi pi-fw pi-users', routerLink: [],
                items: [
                    {label: 'pie par departement', icon: 'pi pi-fw pi-list', routerLink: ['pie']},
                    {label: 'diagramme bar par departement', icon: 'pi pi-fw pi-list', routerLink: ['bar']},
                    {label: 'diagramme line par departement', icon: 'pi pi-fw pi-list', routerLink: ['line']},
           
                ]
            },
            {
                label: 'Log Out', icon: 'pi pi-fw pi-sign-out'      , routerLink: [],  command: () => {
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
