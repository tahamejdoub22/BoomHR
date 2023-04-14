import { NgModule } from '@angular/core';
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



@NgModule({
  declarations: [
    HrBoardComponent,
    JobsDashboardComponent
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
    FormsModule,
    RouterModule,

    RouterModule.forRoot([
      {path:'',component: AppComponent}
	])
  ],
  bootstrap:    [ AppComponent ],
  providers: [CustomerService]
})
export class HrBoardModule { }
