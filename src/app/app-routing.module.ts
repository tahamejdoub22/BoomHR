import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppHelpComponent} from './pages/app.help.component';
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path:'',redirectTo:'Login',pathMatch:'full'},
            {path:'login',component:LoginComponent},
            {path:'signup',component:SignUpComponent},
            {

                path: 'Dashboard', component: AppMainComponent,
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
