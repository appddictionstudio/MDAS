import { Component, OnInit } from '@angular/core';

// Angular Materials
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialogRef, MatDialog } from '@angular/material';

// Services
import { CompanyService } from '../services/companies.service';
import { CpIndustriesComponent } from '../cp-industries/cp-industries.component';

// ChartsJs
import { Chart } from 'chart.js'
import { FlexOffsetDirective } from '@angular/flex-layout';


@Component({
  selector: 'app-cp-main',
  templateUrl: './cp-main.component.html',
  styleUrls: ['./cp-main.component.css']
})


export class CpMainComponent implements OnInit {
  sectorChart: any;

  distinctSectors = []
  distinctSectorLabels = [];

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

  public sectorLabels = ['Sales Q1', 'Sales Q2']
  public sectorData = [120, 150]
  public sectorType = 'doughnut'

  constructor(private companyService: CompanyService,
    public dialog: MatDialog,
    // public chart: Chart,
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
    this.sectorChart = new Chart('sectors', {
      type: 'doughnut',
      data: {
        labels: ['Sales Q1', 'Sales Q2'],
        datasets: [{
          data: [10, 100],
          backgroundColor: [
            'rgba(255, 99, 132, .6)',
            'rgba(54, 162, 235, .6)',
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
        }
      }
    });

    this.companyService.getSectorAndIndustryData().toPromise().then((data) => {
      const convertDataToString = data.toString();
      const parseDataToJson = JSON.parse(convertDataToString);
      console.log(parseDataToJson);
      this.distinctSectors = parseDataToJson;
      parseDataToJson.map((set1) => {
        // console.log(set1[8]);
        if (set1[8] === 'Transportation') {
          this.transporationIndustries.push(set1);
        } else if (set1[8] === 'Basic Industries') {
          this.basicIndustries.push(set1);
        } else if (set1[8] === 'Public Utilities') {
          this.publicUntilitiesIndustries.push(set1);
        } else if (set1[8] === 'Miscellaneous') {
          this.miscellanousIndustries.push(set1);
        } else if (set1[8] === 'Basic Industries') {
          this.basicIndustries.push(set1);
        } else if (set1[8] === 'Capital Goods') {
          this.capitalgoodsIndustries.push(set1);
        } else if (set1[8] === 'No Industry Identified') {
          this.noIndustryIdentified.push(set1);
        } else if (set1[8] === 'Technology/Energy') {
          this.technologyEngergyIndustries.push(set1);
        } else if (set1[8] === 'Consumer Industry') {
          this.consumerIndustries.push(set1);
        } else if (set1[8] === 'Finance') {
          this.financeIndustries.push(set1);
        } else if (set1[8] === 'Health Care') {
          this.healthCareIndustries.push(set1);
        }
      })
      // console.log(this.healthCareIndustries);

    });
    this.companyService.getDistinctSector().toPromise().then((data) => {
      const stringData = data.toString();
      const distinctCompanyDataFrame = JSON.parse(stringData);
      // console.log(distinctCompanyDataFrame);
      // this.distinctSectors.push(distinctCompanyDataFrame);
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
      })
      // console.log(imageType);
      this.distinctSectors = imageType;
    });
  }
  openListOfIndustriesForSector(industrySelector) {
    // console.log(industrySelector);
    let industryData = [];
    if (industrySelector === 'Health Care') {
      industryData = this.healthCareIndustries;
    }
    const dialogRef = this.dialog.open(CpIndustriesComponent, {
      height: '60%',
      width: '99%',
      disableClose: false,
      data: { industryData },
      panelClass: 'nbc-details-dialog'
    });
  }
}
