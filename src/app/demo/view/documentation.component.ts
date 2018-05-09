import { Component } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';

@Component({
    templateUrl: './documentation.component.html',
    styles: [`
        .docs pre {
            font-family: monospace;
            background-color: #bcc9cf;
            color: #333333;
            padding: 1em;
            font-size: 14px;
            border-radius: 0;
            overflow: auto;
        }`
    ]
})
export class DocumentationComponent {

    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Documentation', routerLink: ['/documentation'] }
        ]);
    }
}
