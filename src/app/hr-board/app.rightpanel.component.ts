import {Component} from '@angular/core';
import { HrBoardComponent } from './hr-board.component';

@Component({
    selector: 'app-rightpanel',
    template: `
        <div class="layout-right-panel" [ngClass]="{'layout-right-panel-active': app.rightPanelActive}" (click)="app.onRightPanelClick()">
                <div class="right-panel-scroll-content">
                    <p-tabView>
                        <p-tabPanel header="Statics">
                            <div class="submenu-content settings">
                                <div class="grid">
                                    <div class="col-12 md:col-6">
                                        <div class="status-box wireless-status">
                                            <i class="pi pi-wifi box-icon"></i>
                                            <i class="pi pi-angle-right icon-details"></i>
                                            <span class="status-name">new Joining employees </span>
                                            <span class="status">3</span>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-6">
                                        <div class="status-box cooling-systems">
                                            <i class="pi pi-compass box-icon"></i>
                                            <i class="pi pi-angle-right icon-details"></i>
                                            <span class="status-name"> number Employees Leave Today</span>
                                            <span class="status">20</span>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-6">
                                        <div class="status-box hq-security">
                                            <i class="pi pi-lock box-icon"></i>
                                            <i class="pi pi-angle-right icon-details"></i>
                                            <span class="status-name">Salary of all employees</span>
                                            <span class="status">$5000.000</span>
                                        </div>
                                    </div>

                                   
                                    
                                 
                                   
                                </div>
                            </div>
                        </p-tabPanel>
                        <p-tabPanel header="Request Leave">
                            <div class="submenu-content messages">
                                <ul>
                                    <li>
                                        <img src="assets/layout/images/avatar-john.png" alt="harmony-layout" />
                                        <span class="messager-name">John Swisher<span class="time-stamp">3 Days</span></span>
                                        <span class="message-text">Product Manager </span>
                                        <div class="message-actions">
                                            <i class="pi pi-times-circle delete"></i>
                                            <i class="pi pi-check-circle check"></i>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="assets/layout/images/avatar-warren.png" alt="harmony-layout" />
                                        <span class="messager-name">Warren Shaw<span class="time-stamp">2 Days</span></span>
                                        <span class="message-text">Designer</span>
                                        <div class="message-actions">
                                            <i class="pi pi-times-circle delete"></i>
                                            <i class="pi pi-check-circle check"></i>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="assets/layout/images/avatar-brenda.png" alt="harmony-layout" />
                                        <span class="messager-name">Brenda Soto<span class="time-stamp">5 Days</span></span>
                                        <span class="message-text">Angular Developper</span>
                                        <div class="message-actions">
                                            <i class="pi pi-times-circle delete"></i>
                                            <i class="pi pi-check-circle check"></i>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>
                        </p-tabPanel>
                       
                    </p-tabView>
                </div>
        </div>
    `
})
export class AppRightPanelComponent {
    constructor(public app: HrBoardComponent) { }
}
