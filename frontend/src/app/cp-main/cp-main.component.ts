import { Component, OnInit } from '@angular/core';

// RXJS
import { Subscription, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

// Angular Materials
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialogRef, MatDialog } from '@angular/material';

// Services
import { CompanyService } from '../services/companies.service';
import { CpIndustriesComponent } from '../cp-industries/cp-industries.component';

// ChartsJs
import { Chart } from 'chart.js'
// import { FlexOffsetDirective } from '@angular/flex-layout';


@Component({
  selector: 'app-cp-main',
  templateUrl: './cp-main.component.html',
  styleUrls: ['./cp-main.component.css']
})


export class CpMainComponent implements OnInit {
  sectorChart;

  options = ['AI Analysis from CSV', 'Data from API', 'Data from Postgres'];
  chartOptions = ['Line', 'Doughnut', 'Pie', 'Bar', 'Scatter', 'Radar'];

  // Sets the chart type
  chartTypeSubscription = new Subscription;
  chartTypeObservable: Observable<string>;
  chartTypeObserver: Observer<string>;
  chartTypeNm: string;


  distinctSectors = []
  distinctSectorLabels = []
  distinctSectorData = [];

  healthCareIndustries = []
  financeIndustries = []
  consumerIndustries = []
  technologyEngergyIndustries = []
  noIndustryIdentified = []
  capitalgoodsIndustries = []
  miscellanousIndustries = []
  publicUntilitiesIndustries = []
  basicIndustries = []
  transporationIndustries = []

  constructor(private companyService: CompanyService,
    public dialog: MatDialog,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('technology', sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/Technology.svg'));
    iconRegistry.addSvgIcon('healthcare', sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/Healthcare.svg'));
    iconRegistry.addSvgIcon('consumerServices', sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/Consumer_Services.svg'));
    iconRegistry.addSvgIcon('finance', sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/Finance.svg'));
    iconRegistry.addSvgIcon('capitalgoods', sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/CapitalGoods.svg'));
    iconRegistry.addSvgIcon('transportation', sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/Transportation.svg'));
    iconRegistry.addSvgIcon('publicutilities', sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/Energy.svg'));
    iconRegistry.addSvgIcon('energy', sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/CapitalGoods.svg'));
    iconRegistry.addSvgIcon('consumerdurables', sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/ConsumerDurables.svg'));
    iconRegistry.addSvgIcon('basicindustries', sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/BasicIndustries.svg'));
  }
  ngOnInit() {
    this.chartTypeObservable = new Observable((observer: Observer<string>) => {
      this.chartTypeObserver = observer;
    });
    this.chartTypeSubscription = this.chartTypeObservable.subscribe((getSelectedChart) => {
      this.chartTypeNm = getSelectedChart;
    });
    this.chartTypeNm = 'doughnut';

    this.companyService.getSectorAvgs().toPromise().then((getData) => {
      const convertAPIToString = getData.toString();
      const convertStringToJSON = JSON.parse(convertAPIToString)
      this.distinctSectorLabels.push(convertStringToJSON['SEC_CONV']);
      this.distinctSectorLabels.map((data) => {
        this.distinctSectorLabels = [data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9]]
        // console.log(this.distinctSectorLabels);
      })
      this.distinctSectorData.push(convertStringToJSON['Conversion']);
      this.distinctSectorData.map((data) => {
        this.distinctSectorData.push(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9])
      })
    }).catch((error) => {
      new Error('Error Occured Obtaining Sector Data')
      console.log('Error Occured Obtaining Sector Data', error)
    })

    // Execute Initial Charts
    this.mainCompanyGraphs();

    this.companyService.getDistinctSector().toPromise().then((data) => {
      const stringData = data.toString();
      const distinctCompanyDataFrame = JSON.parse(stringData);
      let imageType = [];
      distinctCompanyDataFrame.forEach((sectors) => {
        if (sectors === "Health Care") {
          imageType.push({ sectordata: sectors, imageType: 'healthcare' });
        } else if (sectors === "Finance") {
          imageType.push({ sectordata: sectors, imageType: 'finance' });
        } else if (sectors === "Consumer Industry") {
          imageType.push({ sectordata: sectors, imageType: 'consumerServices' });
        } else if (sectors === "Technology/Energy") {
          imageType.push({ sectordata: sectors, imageType: 'technology' });
        } else if (sectors === "No Industry Identified") {
          imageType.push({ sectordata: sectors, imageType: 'basicindustries' });
        } else if (sectors === "Capital Goods") {
          imageType.push({ sectordata: sectors, imageType: 'capitalgoods' });
        } else if (sectors === "Miscellaneous") {
          imageType.push({ sectordata: sectors, imageType: 'basicindustries' });
        } else if (sectors === "Public Utilities") {
          imageType.push({ sectordata: sectors, imageType: 'publicutilities' });
        } else if (sectors === "Basic Industries") {
          imageType.push({ sectordata: sectors, imageType: 'basicindustries' });
        } else if (sectors === "Transportation") {
          imageType.push({ sectordata: sectors, imageType: 'transportation' });
        } else {
          console.log('No Icon Found');
        }
        console.log(sectors);
      })
      this.distinctSectors = imageType;
    });
  }

  mainCompanyGraphs() {
    Chart.defaults.global.defaultFontColor = '#fff';
    Chart.defaults.global.defaultFontFamily = 'Open Sans, sans-serif;';
    Chart.defaults.global.defaultFontSize = 30;
    // Chart.defaults.global.defaultFontStyle = 'bold';
    this.sectorChart = new Chart('sectors', {
      type: this.chartTypeNm,
      data: {
        labels: ["Basic Industries", "Capital Goods", "Consumer Industry", "Finance", "Health Care", "Miscellaneous", "No Industry Identified", "Public Utilities", "Technology/Energy", "Transportation"],
        datasets: [{
          data: [75113514.4736842, 91961525.04, 80414268.96, 56359050, 61028234.16, 61347932.329896905, 31625552, 27974124.861538462, 72443885.24, 258053276.85714287],
          backgroundColor: [
            'rgba(255, 99, 132, .6)',
            'rgba(54, 162, 235, .6)',
            'rgba(242, 234, 119, .6)',
            'rgba(242, 82, 186, .6)',
            'rgba(37, 35, 89, .6)',
            'rgba(191, 3, 53, .6)',
            'rgba(255, 255, 240, .6)',
            'rgba(122, 255, 150, .6)',
            'rgba(255, 215, 71, .6)',
            'rgba(255, 138, 71, .6)',
          ],
        }],
      },
      options: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            fontColor: '#fff'
          }
        },
        responsive: true,
        // maintainAspectRatio: true,
        plugins: {
          labels: [{
            render: 'label',
            fontSize: 14,
            fontStyle: 'bold',
          }],
          borderColor: {
            fontColor: 'red'
          },
          label: {
            fontColor: '#fff'
          },
          xAxisID: {
            fontColor: '#fff'
          },
          yAxisID: {
            fontColor: '#fff'
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor: '#fff'
              },
            }],
            xAxes: [{
              ticks: {
                fontColor: '#fff'
              },
            }]
          }
        }
      }
    }
    );
  }


  changeAvgMarketCapChart($event) {
    // console.log($event);
    if ($event.value === 'Line') {
      this.chartTypeObserver.next('line')
      this.sectorChart.destroy();
      this.mainCompanyGraphs();
    } else if ($event.value === 'Pie') {
      this.chartTypeObserver.next('pie')
      this.sectorChart.destroy();
      this.mainCompanyGraphs();
    } else if ($event.value === 'Bar') {
      this.chartTypeObserver.next('bar')
      this.sectorChart.destroy();
      this.mainCompanyGraphs();
    } else if ($event.value === 'Doughnut') {
      this.chartTypeObserver.next('doughnut')
      this.sectorChart.destroy();
      this.mainCompanyGraphs();
    } else if ($event.value === 'Radar') {
      this.chartTypeObserver.next('radar')
      this.sectorChart.destroy();
      this.mainCompanyGraphs();
    } else if ($event.value === 'Scatter') {
      this.chartTypeObserver.next('scatter')
      this.sectorChart.destroy();
      this.mainCompanyGraphs();
    }
  }
}
