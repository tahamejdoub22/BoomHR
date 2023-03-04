import { PanelModule } from 'primeng/panel';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BoardAdminComponent } from './board-admin.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { AppConfigComponent } from './app.config.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppRightPanelComponent } from './app.rightpanel.component';
import { BreadcrumbService } from './app.breadcrumb.service';
import { MenuService } from './app.menu.service';
import { AppComponent } from '../app.component';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    BoardAdminComponent,
        AppConfigComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppBreadcrumbComponent,
        AppRightPanelComponent,
  
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    CardModule,
    TabViewModule,
    PanelMenuModule,
    InputTextModule,
    MenuModule,
    AvatarModule,
    BadgeModule,

  ],  
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
       
BreadcrumbService, MenuService

],

bootstrap: [AppComponent]
})
export class AdminModule {}
