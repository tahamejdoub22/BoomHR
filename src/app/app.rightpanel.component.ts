import {Component} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-rightpanel',
    template: `
        <div class="layout-right-panel" [ngClass]="{'layout-right-panel-active': app.rightPanelActive}" (click)="app.onRightPanelClick()">
                <div class="right-panel-scroll-content">
                    <p-tabView>
                        <p-tabPanel header="Status">
                            <div class="submenu-content settings">
                                <div class="grid">
                                    <div class="col-12 md:col-6">
                                        <div class="status-box wireless-status">
                                            <i class="pi pi-wifi box-icon"></i>
                                            <i class="pi pi-angle-right icon-details"></i>
                                            <span class="status-name">WIRELESS STATUS</span>
                                            <span class="status">Stable</span>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-6">
                                        <div class="status-box cooling-systems">
                                            <i class="pi pi-compass box-icon"></i>
                                            <i class="pi pi-angle-right icon-details"></i>
                                            <span class="status-name">COOLING SYSTEMS</span>
                                            <span class="status">Stable</span>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-6">
                                        <div class="status-box hq-security">
                                            <i class="pi pi-lock box-icon"></i>
                                            <i class="pi pi-angle-right icon-details"></i>
                                            <span class="status-name">HQ SECURITY</span>
                                            <span class="status">Critical</span>
                                        </div>
                                    </div>

                                    <div class="col-12 md:col-6">
                                        <div class="status-box help-desk-load">
                                            <i class="pi pi-envelope box-icon"></i>
                                            <i class="pi pi-angle-right icon-details"></i>
                                            <span class="status-name">HELP DESK LOAD</span>
                                            <div class="progress-bar">
                                                <div class="progress"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-6">
                                        <div class="status-box meeting-intensity">
                                            <i class="pi pi-calendar box-icon"></i>
                                            <i class="pi pi-angle-right icon-details"></i>
                                            <span class="status-name">MEETING INTENSITY</span>
                                            <span class="status">Stable</span>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-6">
                                        <div class="status-box energy-backup ">
                                            <i class="pi pi-info-circle box-icon"></i>
                                            <i class="pi pi-angle-right icon-details"></i>
                                            <span class="status-name">ENERGY BACKUP</span>
                                            <div class="progress-bar">
                                                <div class="progress"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </p-tabPanel>
                        <p-tabPanel header="Inbox">
                            <div class="submenu-content messages">
                                <ul>
                                    <li>
                                        <img src="assets/layout/images/avatar-john.png" alt="harmony-layout" />
                                        <span class="messager-name">John Swisher<span class="time-stamp">24m</span></span>
                                        <span class="message-text">User interface review is done.</span>
                                        <div class="message-actions">
                                            <i class="pi pi-times-circle delete"></i>
                                            <i class="pi pi-check-circle check"></i>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="assets/layout/images/avatar-warren.png" alt="harmony-layout" />
                                        <span class="messager-name">Warren Shaw<span class="time-stamp">2h</span></span>
                                        <span class="message-text">Uh, we have sort of a problem here.</span>
                                        <div class="message-actions">
                                            <i class="pi pi-times-circle delete"></i>
                                            <i class="pi pi-check-circle check"></i>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="assets/layout/images/avatar-brenda.png" alt="harmony-layout" />
                                        <span class="messager-name">Brenda Soto<span class="time-stamp">9h</span></span>
                                        <span class="message-text">You apparently didn’t put one
                                        of the new coversheets on TPS.</span>
                                        <div class="message-actions">
                                            <i class="pi pi-times-circle delete"></i>
                                            <i class="pi pi-check-circle check"></i>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="assets/layout/images/avatar-arlene.png" alt="harmony-layout" />
                                        <span class="messager-name">Arlene Welch<span class="time-stamp">7d</span></span>
                                        <span class="message-text">Meeting reports attached.</span>
                                        <div class="message-actions">
                                            <i class="pi pi-times-circle delete"></i>
                                            <i class="pi pi-check-circle check"></i>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </p-tabPanel>
                        <p-tabPanel header="Notes">
                            <div class="submenu-content notes">
                                <ul>
                                    <li>
                                        <span class="note-reminder">You have <span>24</span> notes in <span>4</span> categories</span>
                                        <button type="button" pButton label="Important" class="important raised-btn"></button>
                                        <button type="button" pButton label="Work"  class="work raised-btn"></button>
                                        <button type="button" pButton label="School" class="school raised-btn"></button>
                                        <span class="note-add-more">+ Add More Categories</span>
                                        <div class="note-seperator"></div>
                                    </li>
                                    <li>
                                        <i class="pi pi-circle-on important"></i>
                                        <span class="note-header">Q3 BUDGET PLANNING</span>
                                        <span class="note-date">23.33 2/7/2018</span>
                                        <span class="note-details">Leverage agile frameworks to provide
                                            a robust synopsis for high level overviews. </span>
                                    </li>
                                    <li>
                                        <i class="pi pi-circle-on important"></i>
                                        <span class="note-header">EXECUTIVE INFLUENCER OUTREACH</span>
                                        <span class="note-date">23.33 2/7/2018</span>
                                        <span class="note-details">Bring to the table win-win survival
                                            strategies to ensure proactive domination. </span>
                                    </li>
                                    <li>
                                        <i class="pi pi-circle-on school"></i>
                                        <span class="note-header">DEVELOP SELLING TRAINING</span>
                                        <span class="note-date">23.33 2/7/2018</span>
                                        <span class="note-details">Capitalize on low hanging fruit to
                                            identify a ballpark value added activity to beta test. </span>
                                    </li>
                                    <li>
                                        <i class="pi pi-circle-on important"></i>
                                        <span class="note-header">MEETING W/ PRODUCT TEAM</span>
                                        <span class="note-date">23.33 2/7/2018</span>
                                        <span class="note-details">Podcasting operational change management
                                            inside of workflows to establish a framework. </span>
                                    </li>
                                    <li>
                                        <i class="pi pi-circle-on work"></i>
                                        <span class="note-header">INVESTIGATE FOLLOWER PROGRAMS</span>
                                        <span class="note-date">23.33 2/7/2018</span>
                                        <span class="note-details">Collaboratively administrate empowered
                                            markets via plug-and-play networks. </span>
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
    constructor(public app: AppMainComponent) { }
}
