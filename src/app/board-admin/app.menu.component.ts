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
            {label: 'Dashboard', icon: 'pi pi-fw pi-th-large', routerLink: ['/admin']},
            {
                label: 'users', icon: 'pi pi-fw pi-users', routerLink: [],
                items: [
                    {label: 'All users', icon: 'pi pi-fw pi-list', routerLink: ['/admin/userroles']},

                ]
            },


            {
                label: 'roles', icon: 'pi pi-fw pi-sun', routerLink: [],
                items: [
                    {label: 'All roles', icon: 'pi pi-fw pi-list', routerLink: []},
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
