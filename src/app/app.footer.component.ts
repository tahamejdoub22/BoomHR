import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
      <div class="layout-footer">
          <a href="/dashboard" class="logo-container">
              <img src="assets/layout/images/harmony-logo.png" alt="harmony-layout" />
              <span class="app-name">HARMONY</span>
          </a>

          <div class="footer-icons">
              <ul>
                  <li>
                      <a>
                          <i class="fa fa-twitter"></i>
                      </a>
                  </li>
                  <li>
                      <a>
                          <i class="fa fa-facebook"></i>
                      </a>
                  </li>
                  <li>
                      <a>
                          <i class="fa fa-github"></i>
                      </a>
                  </li>
              </ul>
          </div>
      </div>
    `
})
export class AppFooterComponent {

}
