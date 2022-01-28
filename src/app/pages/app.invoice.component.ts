import {Component} from '@angular/core';
import {BreadcrumbService} from '../app.breadcrumb.service';

@Component({
    templateUrl: './app.invoice.component.html'
})
export class AppInvoiceComponent {

    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'Pages'},
            {label: 'Invoice'}
        ]);
    }

    print() {
        window.print();
    }
}
