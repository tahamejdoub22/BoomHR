import {Component, OnInit} from '@angular/core';
import { MenuService } from './app.menu.service';
import { PrimeNGConfig } from 'primeng/api';
import { AppComponent } from '../app.component';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hr-board',
  templateUrl: './hr-board.component.html',
  styleUrls: ['./hr-board.component.css']
})
export class HrBoardComponent  implements OnInit{

  topbarMenuActive: boolean;

  overlayMenuActive: boolean;

  staticMenuDesktopInactive: boolean;

  staticMenuMobileActive: boolean;

  menuClick: boolean;

  topbarItemClick: boolean;

  activeTopbarItem: any;
  content?: string;

  menuHoverActive: boolean;

  rightPanelActive: boolean;

  rightPanelClick: boolean;

  topbarIconsActive: boolean;

  quickMenuButtonClick: boolean;

  configActive: boolean;

  configClick: boolean;

  constructor(private menuService: MenuService,private userService: UserService, private primengConfig: PrimeNGConfig, public app: AppComponent,private location: Location, private router: Router) { }

  ngOnInit() :void{

      // this.userService.getHrManagerBoard().subscribe({
      //     next: data => {
      //       this.content = data;
      //     },
      //     error: err => {
      //       if (err.error) {
      //         try {
      //           const res = JSON.parse(err.error);
      //           this.content = res.message;
      //         } catch {
      //           this.content = `Error with status: ${err.status} - ${err.statusText}`;
      //         }
      //       } else {
      //         this.content = `Error with status: ${err.status}`;

      //       }

      //     }
      //   });
      //   this.overrideBackButton();

      // this.primengConfig.ripple = true;
  }

  onLayoutClick() {
      if (!this.topbarItemClick) {
          this.activeTopbarItem = null;
          this.topbarMenuActive = false;
      }

      if (!this.rightPanelClick) {
          this.rightPanelActive = false;
      }

      if (!this.quickMenuButtonClick) {
          this.quickMenuButtonClick = false;
          this.topbarIconsActive = false;
      }

      if (!this.menuClick) {
          if (this.isHorizontal() || this.isSlim()) {
              this.menuService.reset();
          }

          if (this.overlayMenuActive || this.staticMenuMobileActive) {
              this.hideOverlayMenu();
          }

          this.menuHoverActive = false;
      }

      if (this.configActive && !this.configClick) {
          this.configActive = false;
      }

      this.configClick = false;
      this.topbarItemClick = false;
      this.quickMenuButtonClick = false;
      this.menuClick = false;
      this.rightPanelClick = false;
  }

  onMenuButtonClick(event) {
      this.menuClick = true;
      this.topbarMenuActive = false;

      if (this.isOverlay()) {
          this.overlayMenuActive = !this.overlayMenuActive;
      }
      if (this.isDesktop()) {
          this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
      } else {
          this.staticMenuMobileActive = !this.staticMenuMobileActive;
      }

      event.preventDefault();
  }

  onQuickMenuButtonClick(event) {
      if (this.isMobile()) {
          this.topbarIconsActive = !this.topbarIconsActive;
          this.quickMenuButtonClick = true;
      }
      event.preventDefault();
  }
  overrideBackButton() {
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = () => {
        this.router.navigateByUrl('/not-found');
      };
    }
  onMenuClick($event) {
      this.menuClick = true;
  }

  onTopbarMenuButtonClick(event) {
      this.topbarItemClick = true;
      this.topbarMenuActive = !this.topbarMenuActive;

      this.hideOverlayMenu();

      event.preventDefault();
  }

  onTopbarItemClick(event, item) {
      this.topbarItemClick = true;

      if (this.activeTopbarItem === item) {
          this.activeTopbarItem = null;
      } else {
          this.activeTopbarItem = item;
      }

      event.preventDefault();
  }

  onTopbarSubItemClick(event) {
      event.preventDefault();
  }

  onRightPanelButtonClick(event) {
      this.rightPanelClick = true;
      this.rightPanelActive = !this.rightPanelActive;
      event.preventDefault();
  }

  onRightPanelClick() {
      this.rightPanelClick = true;
  }

  onRippleChange(event) {
      this.app.ripple = event.checked;
  }

  onConfigClick(event) {
      this.configClick = true;
  }

  isHorizontal() {
      return this.app.menuMode === 'horizontal';
  }

  isSlim() {
      return this.app.menuMode === 'slim';
  }

  isOverlay() {
      return this.app.menuMode === 'overlay';
  }

  isStatic() {
      return this.app.menuMode === 'static';
  }

  isMobile() {
      return window.innerWidth < 1025;
  }

  isDesktop() {
      return window.innerWidth > 1024;
  }

  isTablet() {
      const width = window.innerWidth;
      return width <= 1024 && width > 640;
  }

  hideOverlayMenu() {
      this.overlayMenuActive = false;
      this.staticMenuMobileActive = false;
  }
}
