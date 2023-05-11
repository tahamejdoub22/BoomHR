import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from 'src/app/_services/applications.service';
import { ChartDataset, ChartType, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import * as Chart from 'chart.js';

import { AppConfig, AppConfigService } from 'src/app/_services/app-config.service';
import { Subscription } from 'rxjs';

// import { Label } from 'ng2-charts';
@Component({
  selector: 'app-hr-applicants-dashboard',
  templateUrl: './hr-applicants-dashboard.component.html',
  styleUrls: ['./hr-applicants-dashboard.component.scss']
})


export class HrApplicantsDashboardComponent implements OnInit {
 
 
 
 data: any;

    chartOptions: any;

    subscription: Subscription;

    config: AppConfig;

    constructor(private configService: AppConfigService, private applicationsService: ApplicationsService) {}

    ngOnInit() {
      // this.applicationsService.getAllDepartments().subscribe(departments => {
      //   this.applicationsService.getVacanciesByDepartment().subscribe(vacancies => {
      //     this.data = {
      //       labels: departments.map(department => department.label),
      //       datasets: [
      //         {
      //           data: vacancies.map(vacancy => vacancy.vacancies),
      //           backgroundColor: [
      //             "#42A5F5",
      //             "#66BB6A",
      //             "#FFA726"
      //           ],
      //           hoverBackgroundColor: [
      //             "#64B5F6",
      //             "#81C784",
      //             "#FFB74D"
      //           ]
      //         }
      //       ]
      //     };
      //   });
      // });
      

    //     this.config = this.configService.config;
    //     this.updateChartOptions();
    //     this.subscription = this.configService.configUpdate$.subscribe(config => {
    //         this.config = config;
    //         this.updateChartOptions();
    //     });
    // }


    this.applicationsService.getAllDepartments().subscribe(departments => {
      this.applicationsService.getVacanciesByDepartment().subscribe(vacancies => {
        // Crée un objet map pour les départements
        const departmentsMap = new Map(departments.map(department => [department._id, department.label]));
        // Crée les labels en utilisant les données de l'objet map
        const labels = vacancies.map(vacancy => departmentsMap.get(vacancy.department));
        // Crée les données pour le graphique
        const data = {
          labels: labels,
          datasets: [
            {
              data: vacancies.map(vacancy => vacancy.vacancies),
              backgroundColor: [
                "#42A5F5",
                "#66BB6A",
                "#FFA726"
              ],
              hoverBackgroundColor: [
                "#64B5F6",
                "#81C784",
                "#FFB74D"
              ]
            }
          ]
        };
        this.data = data;

        // Met à jour les options du graphique en fonction de la configuration de l'application
        this.config = this.configService.config;
        this.updateChartOptions();
        this.subscription = this.configService.configUpdate$.subscribe(config => {
          this.config = config;
          this.updateChartOptions();
        });
      });
    });
  }
    updateChartOptions() {
        this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
    }

    getLightTheme() {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        }
    }

    getDarkTheme() {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            }
        }
    }
}


/*
export class HrApplicantsDashboardComponent implements OnInit {
  candidatesData: any;
  chartOptions: any;
  config: AppConfig;

  pieChartData: ChartDataset[];

  constructor(
    private applicationsService: ApplicationsService,
    private configService: AppConfigService
  ) {}

  ngOnInit() {
    // this.applicationsService.getCandidatesByDepartment().subscribe((data) => {
    //   this.candidatesData = data;
    //   console.log(this.candidatesData); // just for testing

    //   // Initialize the pieChartData property with the appropriate data
    //   this.pieChartData = [
    //     {
    //       data: [this.candidatesData.length],
    //       backgroundColor: ['#36A2EB'],
    //       label: 'Total Candidates'
    //     }
    //   ];
    // });

    // this.configService.loadAppConfig().then(() => {
    //   this.config = this.configService.config;
    //   this.chartOptions = this.getChartOptions();
    // });

    this.configService.configUpdate$.subscribe((config) => {
      console.log("config");
      console.log(config);
      this.config = config;
      this.chartOptions = this.getChartOptions();
    this.candidatesData = config;

      this.pieChartData = [
            {
              data: [this.candidatesData.length],
              backgroundColor: ['#36A2EB'],
              label: 'Total Candidates'
            }
          ];
    });
  }

  getChartOptions() {
    const legendColor =
      this.config && this.config.dark ? '#ebedef' : '#495057';

    return {
      plugins: {
        legend: {
          labels: {
            color: legendColor,
          },
        },
      },
    };
  }
}

*/








/*
implements OnInit {
  candidatesData: any;
  chartOptions: any;
  config: AppConfig;
  myObservable$;

  pieChartData: ChartDataset[];

  constructor(
    private applicationsService: ApplicationsService,
    private configService: AppConfigService
  ) {
    this.applicationsService.getCandidatesByDepartment().subscribe((data) => {
      this.candidatesData = data;
      console.log(this.candidatesData); // just for testing

      // Initialize the pieChartData property with the appropriate data
      this.pieChartData = [
        {
          data: [this.candidatesData.length],
          backgroundColor: ['#36A2EB'],
          label: 'Total Candidates'
        }
      ];
    });
  }

  ngOnInit() {

    this.myObservable$ = this.applicationsService.getCandidatesByDepartment();

    if (this.myObservable$) {
      this.myObservable$.subscribe(data => {
        console.log("observalble");
        console.log(data);
      });
    };

    this.config = this.configService.config;
    this.chartOptions = this.getChartOptions();

        // Add a check to ensure that configService.configUpdate$ is defined before subscribing to it
        // if (this.configService.configUpdate$) {
          this.configService.configUpdate$.subscribe((config) => {
            console.log("config");
            console.log(config);
            this.config = config;
            this.chartOptions = this.getChartOptions();
          });
        // }
      }
    // this.configService.configUpdate$.subscribe((config) => {
    //   this.config = config;
    //   this.chartOptions = this.getChartOptions();
    // });
  

  getChartOptions() {
    const legendColor =
      this.config && this.config.dark ? '#ebedef' : '#495057';

    return {
      plugins: {
        legend: {
          labels: {
            color: legendColor,
          },
        },
      },
    };
  }
}*/