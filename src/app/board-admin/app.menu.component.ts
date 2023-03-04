import { Component, OnInit } from '@angular/core';
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

    constructor(public app: BoardAdminComponent) { }

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
                label: 'Log Out', icon: 'pi pi-fw pi-sign-out'      , routerLink: []
            }
          
        ];
    }
}
