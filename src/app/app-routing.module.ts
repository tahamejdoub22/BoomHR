import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppHelpComponent} from './pages/app.help.component';
import { loginComponent } from "./login/login.component";
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-HrManager/board-moderator.component';
import { ListeEmployesComponent } from './liste-employes/liste-employes.component';
import { UpdateEmployeComponent } from './update-employe/update-employe.component';

import { EmployeComponent } from './employe/employe.component';
import { ListeDepartementsComponent } from './liste-departements/liste-departementscomponent';
import { DepartementComponent } from './departement/departement.component';
import { ProjectComponent } from './project/project.component';
import { ListeProjectComponent } from './liste-project/liste-project.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { UpdateDepartementComponent } from './update-departement/update-departement.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {path:'',redirectTo:'notfound',pathMatch:'full'},
            {path:'login',component:loginComponent},
            {path:'signup',component:SignUpComponent},
            { path: 'user', component: BoardUserComponent },
            { path: 'mod', component: BoardModeratorComponent ,canActivate: [AuthGuard]},
            { path: 'admin', component: BoardAdminComponent ,canActivate: [AuthGuard]},
            
            {

                path: 'Dashboard', component: AppMainComponent ,canActivate: [AuthGuard],
                children: [
                    { path: 'updateemploye', component: UpdateEmployeComponent },
               
                    {path: 'pages/help', component: AppHelpComponent},
                    { path: 'lemp', component: ListeEmployesComponent },
                    { path: 'depart', component: DepartementComponent },
                    { path: 'emp', component: EmployeComponent },
                    { path: 'ldep', component: ListeDepartementsComponent },
                    { path: 'proj', component: ProjectComponent },
                    { path: 'lproj', component: ListeProjectComponent },
                   
                    { path: 'pie', component: PieChartComponent },
                    { path: 'bar', component: BarChartComponent },
                    { path: 'line', component: LineChartComponent },
                    { path: 'updatedep/:id', component: UpdateDepartementComponent },
                    { path: 'updateproj/:id', component: UpdateProjectComponent },
                
                ]
            },
            
            
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
