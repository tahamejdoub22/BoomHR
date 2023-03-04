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
               
                    {path: 'pages/help', component: AppHelpComponent},
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
