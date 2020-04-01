import { Component, OnInit } from '@angular/core';
import { AppComponent } from './app.component';

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

    constructor(public app: AppComponent) { }

    ngOnInit() {
        this.model = [
            { label: 'Dashboard', icon: 'fa fa-fw fa-dashboard', routerLink: ['/'] },
            {
                label: 'Layouts', icon: 'fa fa-fw fa-cog',
                items: [
                    { label: 'Horizontal', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'horizontal' },
                    { label: 'Overlay', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'overlay' },
                    { label: 'Static', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'static' },
                    { label: 'Slim', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'slim' }
                ]
            },
            {
                label: 'Themes', icon: 'fa fa-fw fa-paint-brush',
                items: [
                    {
                        label: 'Flat', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Absolution', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('absolution', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('absolution', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                    command: (event) => this.app.changeTheme('absolution', 'dark') }
                                ]
                            },
                            {
                                label: 'Rebirth', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('rebirth', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('rebirth', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('rebirth', 'dark') }
                                ]
                            },
                            {
                                label: 'Hope', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('hope', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('hope', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('hope', 'dark') }
                                ]
                            },
                            {
                                label: 'Bliss', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('bliss', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('bliss', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('bliss', 'dark') }
                                ]
                            },
                            {
                                label: 'Grace', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('grace', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('grace', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('grace', 'dark') }
                                ]
                            },
                            {
                                label: 'Dusk', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('dusk', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('dusk', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('dusk', 'dark') }
                                ]
                            },
                            {
                                label: 'Navy', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('navy', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('navy', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('navy', 'dark') }
                                ]
                            },
                            {
                                label: 'Infinity', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('infinity', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('infinity', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('infinity', 'dark') }
                                ]
                            },
                            {
                                label: 'Fate', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('fate', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('fate', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('fate', 'dark') }
                                ]
                            },
                            {
                                label: 'Ruby', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('ruby', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('ruby', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('ruby', 'dark') }
                                ]
                            },
                            {
                                label: 'Comfort', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('comfort', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('comfort', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('comfort', 'dark') }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Gradient', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Faith', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('faith', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('faith', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('faith', 'dark') }
                                ]
                            },
                            {
                                label: 'Violet', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('violet', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('violet', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('violet', 'dark') }
                                ]
                            },
                            {
                                label: 'Honor', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('honor', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('honor', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('honor', 'dark') }
                                ]
                            },
                            {
                                label: 'Rebel', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('rebel', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('rebel', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('rebel', 'dark') }
                                ]
                            },
                            {
                                label: 'Vanity', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('vanity', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('vanity', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('vanity', 'dark') }
                                ]
                            },
                            {
                                label: 'Valor', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('valor', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('valor', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('valor', 'dark') }
                                ]
                            },
                            {
                                label: 'Merit', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('merit', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('merit', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('merit', 'dark') }
                                ]
                            },
                            {
                                label: 'Esprit', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('esprit', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('esprit', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('esprit', 'dark') }
                                ]
                            },
                            {
                                label: 'Concord', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('concord', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('concord', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('concord', 'dark') }
                                ]
                            },
                            {
                                label: 'Dulce', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('dulce', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('dulce', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('dulce', 'dark') }
                                ]
                            },
                            {
                                label: 'Royal', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('royal', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('royal', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('royal', 'dark') }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Image', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Hazel', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('hazel', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('hazel', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('hazel', 'dark') }
                                ]
                            },
                            {
                                label: 'Essence', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('essence', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('essence', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('essence', 'dark') }
                                ]
                            },
                            {
                                label: 'Eternity', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('eternity', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('eternity', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('eternity', 'dark') }
                                ]
                            },
                            {
                                label: 'Clarity', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('clarity', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('clarity', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('clarity', 'dark') }
                                ]
                            },
                            {
                                label: 'Solace', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('solace', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('solace', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('solace', 'dark') }
                                ]
                            },
                            {
                                label: 'Joy', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('joy', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('joy', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('joy', 'dark') }
                                ]
                            },
                            {
                                label: 'Purity', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('purity', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('purity', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('purity', 'dark') }
                                ]
                            },
                            {
                                label: 'Euclid', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('euclid', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('euclid', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('euclid', 'dark') }
                                ]
                            },
                            {
                                label: 'Elegance', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('elegance', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('elegance', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('elegance', 'dark') }
                                ]
                            },
                            {
                                label: 'Tranquil', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    { label: 'Colored', icon: 'fa fa-fw fa-square-o',
                                        command: (event) =>  this.app.changeTheme('tranquil', 'color') },
                                    { label: 'Light', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('tranquil', 'light') },
                                    { label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.app.changeTheme('tranquil', 'dark') }
                                ]
                            }
                        ]
                    },
                ]
            },
            {
                label: 'Components', icon: 'fa fa-fw fa-bars', routerLink: ['/components'],
                items: [
                    { label: 'Sample Page', icon: 'fa fa-fw fa-columns', routerLink: ['/components/sample'] },
                    { label: 'Forms', icon: 'fa fa-fw fa-code', routerLink: ['/components/forms'] },
                    { label: 'Data', icon: 'fa fa-fw fa-table', routerLink: ['/components/data'] },
                    { label: 'Panels', icon: 'fa fa-fw fa-list-alt', routerLink: ['/components/panels'] },
                    { label: 'Overlays', icon: 'fa fa-fw fa-square', routerLink: ['/components/overlays'] },
                    { label: 'Menus', icon: 'fa fa-fw fa-minus-square-o', routerLink: ['/components/menus'] },
                    { label: 'Messages', icon: 'fa fa-fw fa-circle-o-notch', routerLink: ['/components/messages'] },
                    { label: 'Charts', icon: 'fa fa-fw fa-area-chart', routerLink: ['/components/charts'] },
                    { label: 'File', icon: 'fa fa-fw fa-arrow-circle-o-up', routerLink: ['/components/file'] },
                    { label: 'Misc', icon: 'fa fa-fw fa-user-secret', routerLink: ['/components/misc'] }
                ]
            },
            {
                label: 'Pages', icon: 'fa fa-fw fa-cube', routerLink: ['/pages'],
                items: [
                    { label: 'Empty Page', icon: 'fa fa-fw fa-square-o', routerLink: ['/pages/empty'] },
                    { label: 'Landing Page', icon: 'fa fa-fw fa-globe', url: 'assets/pages/landing.html', target: '_blank' },
                    { label: 'Login Page', icon: 'fa fa-fw fa-sign-in', url: 'assets/pages/login.html', target: '_blank' },
                    { label: 'Error Page', icon: 'fa fa-fw fa-exclamation-circle', url: 'assets/pages/error.html', target: '_blank' },
                    { label: '404 Page', icon: 'fa fa-fw fa-times', url: 'assets/pages/404.html', target: '_blank' },
                    {
                        label: 'Access Denied Page', icon: 'fa fa-fw fa-exclamation-triangle',
                        url: 'assets/pages/access.html', target: '_blank'
                    }
                ]
            },
            {
                label: 'Hierarchy', icon: 'fa fa-fw fa-sitemap',
                items: [
                    {
                        label: 'Submenu 1', icon: 'fa fa-fw fa-sign-in',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'fa fa-fw fa-sign-in' },
                                    { label: 'Submenu 1.1.2', icon: 'fa fa-fw fa-sign-in' },
                                    { label: 'Submenu 1.1.3', icon: 'fa fa-fw fa-sign-in' },
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'fa fa-fw fa-sign-in' },
                                    { label: 'Submenu 1.2.2', icon: 'fa fa-fw fa-sign-in' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'fa fa-fw fa-sign-in',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'fa fa-fw fa-sign-in' },
                                    { label: 'Submenu 2.1.2', icon: 'fa fa-fw fa-sign-in' },
                                    { label: 'Submenu 2.1.3', icon: 'fa fa-fw fa-sign-in' },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'fa fa-fw fa-sign-in' },
                                    { label: 'Submenu 2.2.2', icon: 'fa fa-fw fa-sign-in' }
                                ]
                            },
                        ]
                    }
                ]
            },
            { label: 'Documentation', icon: 'fa fa-fw fa-file-code-o', routerLink: ['/documentation'] }
        ];
    }
}
