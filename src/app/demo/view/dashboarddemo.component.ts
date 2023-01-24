import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/eventservice';
import { SelectItem, MenuItem } from 'primeng/api';
import {Product} from '../domain/product';
import {ProductService} from '../service/productservice';
import { BreadcrumbService } from '../../app.breadcrumb.service';
// @fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['../../../assets/demo/badges.scss'],
    styles: [`
    @media screen and (max-width: 960px) {
        :host ::ng-deep .fc-header-toolbar {
            display: flex;
            flex-wrap: wrap;

            .fc-dayGridMonth-button {
                margin-top: 1rem;
            }
            .fc-timeGridWeek-button{
                margin-top: 1rem;
            }
            .fc-timeGridDay-button{
                margin-top: 1rem;
            }
        }
    }
    
    :host ::ng-deep {
        .fc.fc-theme-standard .fc-highlight {
            color: #ffffff;
            background: var(--fc-highlight-color, rgba(63, 81, 181, 0.12));
        }
    }
`]
})
export class DashboardDemoComponent implements OnInit {

    cities: SelectItem[];

    products: Product[];

    cols: any[];

    chartData: any;

    events: any[];

    items: MenuItem[];

    fullcalendarOptions: any;

    constructor(private productService: ProductService, private eventService: EventService, private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'Dashboard', routerLink: ['/']}
        ]);
    }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);
        this.eventService.getEvents().then(events => {
            this.events = events;
            this.fullcalendarOptions = {...this.fullcalendarOptions, ...{events: events}};
        });

        this.cities = [];
        this.cities.push({ label: 'Select City', value: null });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });

        this.chartData = {
            labels: ['0', '1', '2', '3', '4', '5', '6'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [, 2, 1, 3, 6, 8],
                    fill: false,
                    borderColor: '#4caf50'
                },
                {
                    label: 'Second Dataset',
                    data: [, 6, 3, 2, 7, 9],
                    fill: false,
                    borderColor: '#39a3f4'
                }
            ]
        };

        this.items = [
            { label: 'Save', icon: 'fa fa-check' },
            { label: 'Update', icon: 'fa fa-refresh' },
            { label: 'Delete', icon: 'fa fa-trash' }
        ];

        this.fullcalendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            initialDate: '2021-02-01',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
        };
    }
}
