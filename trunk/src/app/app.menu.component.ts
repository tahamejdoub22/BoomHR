import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem } from 'primeng/primeng';
import { AppComponent } from './app.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul app-submenu [item]="model" root="true" class="layout-menu" [reset]="reset" visible="true"></ul>
    `
})
export class AppMenuComponent implements OnInit {

    @Input() reset: boolean;

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
                label: 'Theme', icon: 'fa fa-fw fa-paint-brush',
                items: [
                    {
                        label: 'Flat', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Blue', styleClass: 'blue-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('blue-light'); }
                            },
                            {
                                label: 'Green', styleClass: 'green-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('green-light'); }
                            },
                            {
                                label: 'Cyan', styleClass: 'cyan-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('cyan-light'); }
                            },
                            {
                                label: 'Purple', styleClass: 'purple-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('purple-light'); }
                            },
                            {
                                label: 'Indigo', styleClass: 'indigo-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('indigo-light'); }
                            },
                            {
                                label: 'Yellow', styleClass: 'yellow-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('yellow-light'); }
                            },
                            {
                                label: 'Orange', styleClass: 'orange-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('orange-light'); }
                            },
                            {
                                label: 'Pink', styleClass: 'pink-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('pink-light'); }
                            }
                        ]
                    },
                    {
                        label: 'Gradient', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Blue', styleClass: 'blue-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('blue-light'); }
                            },
                            {
                                label: 'Green', styleClass: 'green-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('green-light'); }
                            },
                            {
                                label: 'Cyan', styleClass: 'cyan-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('cyan-light'); }
                            },
                            {
                                label: 'Purple', styleClass: 'purple-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('purple-light'); }
                            },
                            {
                                label: 'Indigo', styleClass: 'indigo-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('indigo-light'); }
                            },
                            {
                                label: 'Yellow', styleClass: 'yellow-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('yellow-light'); }
                            },
                            {
                                label: 'Orange', styleClass: 'orange-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('orange-light'); }
                            },
                            {
                                label: 'Pink', styleClass: 'pink-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('pink-light'); }
                            }
                        ]
                    },
                    {
                        label: 'Image', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Blue', styleClass: 'blue-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('blue-light'); }
                            },
                            {
                                label: 'Green', styleClass: 'green-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('green-light'); }
                            },
                            {
                                label: 'Cyan', styleClass: 'cyan-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('cyan-light'); }
                            },
                            {
                                label: 'Purple', styleClass: 'purple-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('purple-light'); }
                            },
                            {
                                label: 'Indigo', styleClass: 'indigo-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('indigo-light'); }
                            },
                            {
                                label: 'Yellow', styleClass: 'yellow-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('yellow-light'); }
                            },
                            {
                                label: 'Orange', styleClass: 'orange-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('orange-light'); }
                            },
                            {
                                label: 'Pink', styleClass: 'pink-theme', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => { this.app.changeTheme('pink-light'); }
                            }
                        ]
                    },
                ]
            },
            {
                label: 'Components', icon: 'fa fa-fw fa-bars',
                items: [
                    { label: 'Sample Page', icon: 'fa fa-fw fa-columns', routerLink: ['/sample'] },
                    { label: 'Forms', icon: 'fa fa-fw fa-code', routerLink: ['/forms'] },
                    { label: 'Data', icon: 'fa fa-fw fa-table', routerLink: ['/data'] },
                    { label: 'Panels', icon: 'fa fa-fw fa-list-alt', routerLink: ['/panels'] },
                    { label: 'Overlays', icon: 'fa fa-fw fa-square', routerLink: ['/overlays'] },
                    { label: 'Menus', icon: 'fa fa-fw fa-minus-square-o', routerLink: ['/menus'] },
                    { label: 'Messages', icon: 'fa fa-fw fa-circle-o-notch', routerLink: ['/messages'] },
                    { label: 'Charts', icon: 'fa fa-fw fa-area-chart', routerLink: ['/charts'] },
                    { label: 'File', icon: 'fa fa-fw fa-arrow-circle-o-up', routerLink: ['/file'] },
                    { label: 'Misc', icon: 'fa fa-fw fa-user-secret', routerLink: ['/misc'] }
                ]
            },
            {
                label: 'Pages', icon: 'fa fa-fw fa-cube',
                items: [
                    { label: 'Empty Page', icon: 'fa fa-fw fa-square-o', routerLink: ['/empty'] },
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
            { label: 'Docs', icon: 'fa fa-fw fa-file-code-o', routerLink: ['/documentation'] }
        ];
    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)"
                   *ngIf="!child.routerLink" [ngClass]="child.styleClass"
                   [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i [ngClass]="child.icon"></i>
                    <span>{{child.label}}</span>
                    <i class="fa fa-fw fa-angle-down layout-menuitem-toggler" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>

                <a (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                    [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i [ngClass]="child.icon"></i>
                    <span>{{child.label}}</span>
                    <i class="fa fa-fw fa-angle-down" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>
                <div class="layout-menu-tooltip">
                  <div class="layout-menu-tooltip-arrow"></div>
                  <div class="layout-menu-tooltip-text">{{child.label}}</div>
                </div>
                <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset"
                    [@children]="(app.isSlim()||app.isHorizontal())&&root ? isActive(i) ?
                    'visible' : 'hidden' : isActive(i) ? 'visibleAnimated' : 'hiddenAnimated'"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*',
                'z-index': 100
            })),
            state('hidden', style({
                height: '0px',
                'z-index': '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _reset: boolean;

    activeIndex: number;

    constructor(public app: AppComponent) { }

    itemClick(event: Event, item: MenuItem, index: number)  {
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
              this.app.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (this.app.isHorizontal() || this.app.isSlim()) {
                this.app.resetMenu = true;
            } else {
                this.app.resetMenu = false;
            }

            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
    }

    onMouseEnter(index: number) {
        if (this.root && this.app.menuHoverActive && (this.app.isHorizontal() || this.app.isSlim())
          && !this.app.isMobile() && !this.app.isTablet()) {
            this.activeIndex = index;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (this._reset && (this.app.isHorizontal() ||  this.app.isSlim())) {
            this.activeIndex = null;
        }
    }
}
