import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/eventservice';
import { SelectItem, MenuItem } from 'primeng/api';
import {Product} from '../domain/product';
import {ProductService} from '../service/productservice';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
    templateUrl: './dashboard.component.html'
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
        this.eventService.getEvents().then(events => { this.events = events; });

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
            plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
            defaultDate: '2017-02-12',
            header: {
                right: 'prev,next,today',
                left: 'title'
            }
        };
    }
}
