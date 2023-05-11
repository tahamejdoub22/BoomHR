import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsDashboardComponent } from './jobs-dashboard/jobs-dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';



import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import { CustomerService } from './jobs-dashboard/customerservice';
import { HrBoardComponent } from './hr-board.component';
import { AppComponent } from '../app.component';

import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {AppBreadcrumbComponent} from './app.breadcrumb.component';
import {AppConfigComponent} from './app.config.component';
import {AppRightPanelComponent} from './app.rightpanel.component';
import {BreadcrumbService} from './app.breadcrumb.service';
import {MenuService} from './app.menu.service';
import {TabViewModule} from 'primeng/tabview';
import { HrCandidateDashboardComponent } from './hr-candidate-dashboard/hr-candidate-dashboard.component';
import { HrApplicantsDashboardComponent } from './hr-applicants-dashboard/hr-applicants-dashboard.component';
import {ToolbarModule} from 'primeng/toolbar';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ChartModule } from 'primeng/chart';
import { NgChartsModule } from 'ng2-charts';
import { AppConfigService } from '../_services/app-config.service';
import { JobscardComponent } from './jobscard/jobscard.component';
@NgModule({
  declarations: [
    HrBoardComponent,
    JobsDashboardComponent,
    HrCandidateDashboardComponent,
    HrApplicantsDashboardComponent,
    AppConfigComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppBreadcrumbComponent,
    AppRightPanelComponent,
    HrCandidateDashboardComponent,
    HrApplicantsDashboardComponent,
    JobscardComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    TabViewModule,
    FormsModule,
    RouterModule,
    ToolbarModule,
    ConfirmDialogModule,
    SidebarModule,
    ChartModule,
    NgChartsModule,




    RouterModule.forRoot([
      {path:'',component: AppComponent}
	])
  ],
  bootstrap:    [ AppComponent ],
  providers: [CustomerService,
    BreadcrumbService, MenuService,
    { 
      provide : APP_INITIALIZER, 
      multi : true, 
       deps : [AppConfigService], 
       useFactory : (appConfigService : AppConfigService) =>  () => appConfigService.loadAppConfig()
    }
  ]
})
export class HrBoardModule { }
