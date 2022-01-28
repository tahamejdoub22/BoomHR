import {Component, OnInit} from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-config',
    template: `
        <a style="cursor: pointer" id="layout-config-button" class="layout-config-button" (click)="onConfigButtonClick($event)">
            <i class="pi pi-cog"></i>
        </a>
        <div class="layout-config" [ngClass]="{'layout-config-active': appMain.configActive}" (click)="appMain.onConfigClick($event)">
            <h5>Menu Type</h5>
            <div class="field-radiobutton">
                <p-radioButton name="menuMode" value="static" [(ngModel)]="app.menuMode" inputId="mode1"></p-radioButton>
                <label for="mode1">Static</label>
            </div>
            <div class="field-radiobutton">
                <p-radioButton name="menuMode" value="overlay" [(ngModel)]="app.menuMode" inputId="mode2"></p-radioButton>
                <label for="mode2">Overlay</label>
            </div>
            <div class="field-radiobutton">
                <p-radioButton name="menuMode" value="slim" [(ngModel)]="app.menuMode" inputId="mode3"></p-radioButton>
                <label for="mode3">Slim</label>
            </div>
            <div class="field-radiobutton">
                <p-radioButton name="menuMode" value="horizontal" [(ngModel)]="app.menuMode" inputId="mode4"></p-radioButton>
                <label for="mode4">Horizontal</label>
            </div>

            <h5>Input Style</h5>
            <div class="field-radiobutton">
                <p-radioButton name="inputStyle" value="outlined" [(ngModel)]="app.inputStyle" inputId="inputStyle1"></p-radioButton>
                <label for="inputStyle1">Outlined</label>
            </div>
            <div class="field-radiobutton">
                <p-radioButton name="inputStyle" value="filled" [(ngModel)]="app.inputStyle" inputId="inputStyle2"></p-radioButton>
                <label for="inputStyle2">Filled</label>
            </div>

            <h5>Ripple Effect</h5>
			<p-inputSwitch [ngModel]="app.ripple" (onChange)="appMain.onRippleChange($event)"></p-inputSwitch>

            <h5>Image Themes</h5>
            <div class="layout-themes">
                <div *ngFor="let i of imageThemes">
                    <a style="cursor: pointer" (click)="changeTheme(i.name)">
                        <img src="assets/layout/images/configurator/{{i.image}}" alt="{{i.name}}"/>
                        <i class="pi pi-check" *ngIf="app.theme === i.name"></i>
                    </a>
                </div>
            </div>

            <h5>Gradient Themes</h5>
            <div class="layout-themes">
                <div *ngFor="let g of gradientThemes">
                    <a style="cursor: pointer" (click)="changeTheme(g.name)"
                       [ngStyle]="{'background-image': 'linear-gradient(to right, ' + g.color1 +','+ g.color2+')'} ">
                        <i class="pi pi-check" *ngIf="app.theme === g.name"></i>
                    </a>
                </div>
            </div>

            <h5>Flat Themes</h5>
            <div class="layout-themes">
                <div *ngFor="let f of flatThemes">
                    <a style="cursor: pointer" (click)="changeTheme(f.name)" [ngStyle]="{'background-color': f.color}">
                        <i class="pi pi-check" *ngIf="app.theme === f.name"></i>
                    </a>
                </div>
            </div>
        </div>
    `
})
export class AppConfigComponent implements OnInit {

    flatThemes: any[];

    imageThemes: any[];

    gradientThemes: any[];

    constructor(public appMain: AppMainComponent, public app: AppComponent) {}

    ngOnInit() {
        this.flatThemes = [
            {name: 'absolution', color: '#628292'},
            {name: 'rebirth', color: '#007ad9'},
            {name: 'hope', color: '#67487e'},
            {name: 'bliss', color: '#00b395'},
            {name: 'grace', color: '#5d2f92'},
            {name: 'dusk', color: '#dd8400'},
            {name: 'navy', color: '#005a9e'},
            {name: 'infinity', color: '#617e76'},
            {name: 'fate', color: '#0d5fa6'},
            {name: 'ruby', color: '#ca5861'},
            {name: 'comfort', color: '#0084a1'},
        ];

        this.gradientThemes = [
            {name: 'faith', color1: '#622774', color2: '#c53364'},
            {name: 'violet', color1: '#5b247a', color2: '#1bcedf'},
            {name: 'honor', color1: '#3bb2b8', color2: '#00dac7'},
            {name: 'rebel', color1: '#7367f0', color2: '#ce9ffc'},
            {name: 'vanity', color1: '#f76b1c', color2: '#fad961'},
            {name: 'valor', color1: '#ff6b52', color2: '#ff9851'},
            {name: 'merit', color1: '#1c4652', color2: '#3d7b8a'},
            {name: 'esprit', color1: '#276174', color2: '#33c58e'},
            {name: 'concord', color1: '#5e2563', color2: '#65799b'},
            {name: 'dulce', color1: '#b3305f', color2: '#ffaa85'},
            {name: 'royal', color1: '#171717', color2: '#020202'},
        ];

        this.imageThemes = [
            {name: 'hazel', image: 'hazel.jpg'},
            {name: 'essence', image: 'essence.jpg'},
            {name: 'eternity', image: 'eternity.jpg'},
            {name: 'clarity', image: 'clarity.jpg'},
            {name: 'solace', image: 'solace.jpg'},
            {name: 'joy', image: 'joy.jpg'},
            {name: 'purity', image: 'purity.jpg'},
            {name: 'euclid', image: 'euclid.jpg'},
            {name: 'elegance', image: 'elegance.jpg'},
            {name: 'tranquil', image: 'tranquil.jpg'}
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

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
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

    onConfigButtonClick(event) {
        this.appMain.configActive = !this.appMain.configActive;
        this.appMain.configClick = true;
        event.preventDefault();
    }
}
