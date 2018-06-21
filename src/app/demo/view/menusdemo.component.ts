import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { BreadcrumbService } from '../../breadcrumb.service';

@Component({
    templateUrl: './menusdemo.component.html',
    styles: [`
        .ui-steps-item {
            width: 25%
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class MenusDemoComponent implements OnInit {

    breadcrumbItems: MenuItem[];

    homeIcon: MenuItem;

    tieredItems: MenuItem[];

    items: MenuItem[];

    tabMenuItems: MenuItem[];

    megaMenuItems: MenuItem[];

    panelMenuItems: MenuItem[];

    stepsItems: MenuItem[];

    constructor(private breadcrumbService: BreadcrumbService) {
        this.homeIcon = { icon: 'fa fa-home' };
        this.breadcrumbService.setItems([
            { label: 'Components' },
            { label: 'Menus', routerLink: ['/menus'] }
        ]);
    }

    ngOnInit() {
        this.breadcrumbItems = [];
        this.breadcrumbItems.push({ label: 'Categories' });
        this.breadcrumbItems.push({ label: 'Sports' });
        this.breadcrumbItems.push({ label: 'Football' });
        this.breadcrumbItems.push({ label: 'Countries' });
        this.breadcrumbItems.push({ label: 'Spain' });
        this.breadcrumbItems.push({ label: 'F.C. Barcelona' });
        this.breadcrumbItems.push({ label: 'Squad' });
        this.breadcrumbItems.push({ label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi' });

        this.tabMenuItems = [
            { label: 'Stats', icon: 'fa fa-bar-chart' },
            { label: 'Calendar', icon: 'fa fa-calendar' },
            { label: 'Documentation', icon: 'fa fa-book' },
            { label: 'Support', icon: 'fa fa-support' },
            { label: 'Social', icon: 'fa fa-twitter' }
        ];

        this.tieredItems = [
            {
                label: 'File',
                icon: 'fa fa-file-o',
                items: [{
                    label: 'New',
                    icon: 'fa fa-plus',
                    items: [
                        { label: 'Project' },
                        { label: 'Other' },
                    ]
                },
                { label: 'Open' },
                { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'fa fa-edit',
                items: [
                    { label: 'Undo', icon: 'fa fa-mail-forward' },
                    { label: 'Redo', icon: 'fa fa-mail-reply' }
                ]
            },
            {
                label: 'Help',
                icon: 'fa fa-question',
                items: [
                    {
                        label: 'Contents'
                    },
                    {
                        label: 'Search',
                        icon: 'fa fa-search',
                        items: [
                            {
                                label: 'Text',
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Actions',
                icon: 'fa fa-gear',
                items: [
                    {
                        label: 'Edit',
                        icon: 'fa fa-refresh',
                        items: [
                            { label: 'Save', icon: 'fa fa-save' },
                            { label: 'Update', icon: 'fa fa-save' },
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'fa fa-phone',
                        items: [
                            { label: 'Delete', icon: 'fa fa-minus' }
                        ]
                    }
                ]
            },
            {
                label: 'Quit', icon: 'fa fa-minus'
            }
        ];

        this.items = [{
            label: 'File',
            items: [
                { label: 'New', icon: 'fa fa-plus' },
                { label: 'Open', icon: 'fa fa-download' }
            ]
        },
        {
            label: 'Edit',
            items: [
                { label: 'Undo', icon: 'fa fa-refresh' },
                { label: 'Redo', icon: 'fa fa-repeat' }
            ]
        }];

        this.megaMenuItems = [
            {
                label: 'TV', icon: 'fa fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 3',
                            items: [{ label: 'TV 3.1' }, { label: 'TV 3.2' }]
                        },
                        {
                            label: 'TV 4',
                            items: [{ label: 'TV 4.1' }, { label: 'TV 4.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Sports', icon: 'fa fa-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        },

                    ],
                    [
                        {
                            label: 'Sports 3',
                            items: [{ label: 'Sports 3.1' }, { label: 'Sports 3.2' }]
                        },
                        {
                            label: 'Sports 4',
                            items: [{ label: 'Sports 4.1' }, { label: 'Sports 4.2' }]
                        }
                    ],
                    [
                        {
                            label: 'Sports 5',
                            items: [{ label: 'Sports 5.1' }, { label: 'Sports 5.2' }]
                        },
                        {
                            label: 'Sports 6',
                            items: [{ label: 'Sports 6.1' }, { label: 'Sports 6.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Entertainment', icon: 'fa fa-child',
                items: [
                    [
                        {
                            label: 'Entertainment 1',
                            items: [{ label: 'Entertainment 1.1' }, { label: 'Entertainment 1.2' }]
                        },
                        {
                            label: 'Entertainment 2',
                            items: [{ label: 'Entertainment 2.1' }, { label: 'Entertainment 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'Entertainment 3',
                            items: [{ label: 'Entertainment 3.1' }, { label: 'Entertainment 3.2' }]
                        },
                        {
                            label: 'Entertainment 4',
                            items: [{ label: 'Entertainment 4.1' }, { label: 'Entertainment 4.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Technology', icon: 'fa fa-gears',
                items: [
                    [
                        {
                            label: 'Technology 1',
                            items: [{ label: 'Technology 1.1' }, { label: 'Technology 1.2' }]
                        },
                        {
                            label: 'Technology 2',
                            items: [{ label: 'Technology 2.1' }, { label: 'Technology 2.2' }]
                        },
                        {
                            label: 'Technology 3',
                            items: [{ label: 'Technology 3.1' }, { label: 'Technology 3.2' }]
                        }
                    ],
                    [
                        {
                            label: 'Technology 4',
                            items: [{ label: 'Technology 4.1' }, { label: 'Technology 4.2' }]
                        }
                    ]
                ]
            }
        ];

        this.panelMenuItems = [
            {
                label: 'File',
                icon: 'fa fa-file-o',
                items: [{
                    label: 'New',
                    icon: 'fa fa-plus',
                    items: [
                        { label: 'Project', icon: 'fa fa-lock' },
                        { label: 'Other', icon: 'fa fa-list' }
                    ]
                },
                { label: 'Open', icon: 'fa fa-external-link' },
                { separator: true },
                { label: 'Quit', icon: 'fa fa-close' }
                ]
            },
            {
                label: 'Edit',
                icon: 'fa fa-edit',
                items: [
                    { label: 'Undo', icon: 'fa fa-mail-forward' },
                    { label: 'Redo', icon: 'fa fa-mail-reply' }
                ]
            },
            {
                label: 'Help',
                icon: 'fa fa-question',
                items: [
                    {
                        label: 'Contents',
                        icon: 'fa fa-bars'
                    },
                    {
                        label: 'Search',
                        icon: 'fa fa-search',
                        items: [
                            {
                                label: 'Text',
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File',
                                icon: 'fa fa-file',
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Actions',
                icon: 'fa fa-gear',
                items: [
                    {
                        label: 'Edit',
                        icon: 'fa fa-refresh',
                        items: [
                            { label: 'Save', icon: 'fa fa-save' },
                            { label: 'Update', icon: 'fa fa-save' },
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'fa fa-phone',
                        items: [
                            { label: 'Delete', icon: 'fa fa-minus' }
                        ]
                    }
                ]
            }
        ];

        this.stepsItems = [
            {
                label: 'Personal'
            },
            {
                label: 'Seat'
            },
            {
                label: 'Payment'
            },
            {
                label: 'Confirmation'
            }
        ];
    }

}
