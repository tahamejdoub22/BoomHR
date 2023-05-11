import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { HrBoardComponent } from './hr-board.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    isLoggedIn = false;
    username?: string;

    flatThemes: any[];
    constructor(public appMain: HrBoardComponent,public app: AppComponent,private authService: AuthService,private storageService: StorageService,private router: Router) { }

 ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {

    const user = this.storageService.getUser();
    this.username = user.username;
}

        this.flatThemes = [
            {name: 'honor', color1: '#3bb2b8', color2: '#00dac7'},
            {name: 'comfort', color: '#0084a1'},
        ];
}
changeTheme(theme) {
    this.app.theme = theme;

    const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
    const layoutHref = 'assets/layout/css/layout-' + theme + '.css';

    this.replaceLink(layoutLink, layoutHref);

    const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
    const themeHref = 'assets/theme/theme-' + theme + '.css';

    this.replaceLink(themeLink, themeHref);
}
replaceLink(linkElement, href) {
    if (this.isIE()) {
        linkElement.setAttribute('href', href);
    } else {
        const id = linkElement.getAttribute('id');
        const cloneLinkElement = linkElement.cloneNode(true);
        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');
        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            cloneLinkElement.setAttribute('id', id);
        });
    }
}
isIE() {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
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
