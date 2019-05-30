import { Component, OnInit } from '@angular/core';

// Services
import { CompanyService } from '../services/companies.service';

// Angular Materials
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialogRef, MatDialog } from '@angular/material';

// Component
import { CpIndustriesComponent } from '../cp-industries/cp-industries.component';

// Chart JS
import { Chart } from 'chart.js'

@Component({
  selector: 'app-cp-sectors',
  templateUrl: './cp-sectors.component.html',
  styleUrls: ['./cp-sectors.component.css']
})
export class CpSectorsComponent implements OnInit {
  industryChart;
  sectors = [];
  sectorImages = [];
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

   // Charts Variabls
   chartHealthCareIndustriesLabels = []
   chartHealthCareIndustriesData = []
   chartFinanceIndustriesLabels = []
   chartFinanceIndustriesData = []
   chartConsumerIndustriesLabels = []
   chartConsumerIndustriesData = []
   chartTechnologyEngergyIndustriesLabels = []
   chartTechnologyEngergyIndustriesData = []
   chartNoIndustryIdentifiedLabels = []
   chartNoIndustryIdentifiedData = []
   chartCapitalgoodsIndustriesLabels = []
   chartCapitalgoodsIndustriesData = []
   chartMiscellanousIndustriesLabels = []
   chartMiscellanousIndustriesData = []
   chartPublicUntilitiesIndustriesLabels = []
   chartPublicUntilitiesIndustriesData = []
   chartBasicIndustriesLabels = []
   chartBasicIndustriesData = []
   chartTransporationIndustriesLabels = []
   chartTransporationIndustriesData = []

   uniqueIndustries = ['Medical/Nursing Services',
    'Property-Casualty Insurers',
    'Finance/Investors Services',
    'Other Specialty Stores',
    'Banks',
    'Savings Institutions',
    'Major Banks',
    'Computer Software: Programming, Data Processing',
    'Computer Software: Prepackaged Software',
    'Finance: Consumer Services',
    'Diversified Commercial Services',
    'Business Services',
    'EDP Services',
    'Industrial Machinery/Components',
    'Major Pharmaceuticals',
    'Telecommunications Equipment',
    'Medical/Dental Instruments',
    'Oil & Gas Production',
    'Semiconductors',
    'Multi-Sector Companies',
    'Medical Specialities',
    'Biotechnology: Laboratory Analytical Instruments',
    'No Industry Identified',
    'Biotechnology: Biological Products (No Diagnostic Substances)',
    'Biotechnology: In Vitro & In Vivo Diagnostic Substances',
    'Office Equipment/Supplies/Services',
    'Auto Parts:O.E.M.',
    'Major Chemicals',
    'Water Supply',
    'Electrical Products',
    'Aerospace',
    'Real Estate Investment Trusts',
    'Air Freight/Delivery Services',
    'Radio And Television Broadcasting And Communications Equipment']


  constructor(public companyService: CompanyService,
              public dialog: MatDialog,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
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
      })
      // console.log('Sector Types', imageType);
      this.distinctSectors = imageType;
      imageType.forEach((data) => {
        this.sectors.push(data.sectordata);
        this.sectorImages.push(data.imageType);
      })
      // console.log(this.sectors);

    });
    this.industryGraph();

    this.companyService.getSectorAndIndustryData().toPromise().then((data) => {
      const convertDataToString = data.toString();
      const parseDataToJson = JSON.parse(convertDataToString);
      parseDataToJson.map((set1) => {
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
    });
  }

  openListOfIndustriesForSector(industrySelector) {
    let industryData = [];
    if (industrySelector.toString() === 'Health Care') {
      industryData = this.healthCareIndustries;
    } else if (industrySelector === 'Finance') {
      industryData = this.financeIndustries;
    } else if (industrySelector === 'Consumer Industry') {
      industryData = this.consumerIndustries;
    } else if (industrySelector === 'Technology/Energy') {
      industryData = this.technologyEngergyIndustries;
    } else if (industrySelector === 'No Industry Identified') {
      industryData = this.noIndustryIdentified;
    } else if (industrySelector === 'Capital Goods') {
      industryData = this.capitalgoodsIndustries;
    } else if (industrySelector === 'Miscellaneous') {
      industryData = this.miscellanousIndustries;
    } else if (industrySelector === 'Public Utilities') {
      industryData = this.publicUntilitiesIndustries;
    } else if (industrySelector === 'Basic Industries') {
      industryData = this.basicIndustries;
    } else if (industrySelector === 'Transportation') {
      industryData = this.transporationIndustries;
    }
    const dialogRef = this.dialog.open(CpIndustriesComponent, {
      height: '60%',
      width: '99%',
      disableClose: false,
      data: { industryData },
      panelClass: 'basicdialog'
    });
  }

  industryGraph() {
    // Chart declaration:
    this.industryChart = new Chart('industry', {
      type: 'pie',
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
          },
        },
      }
    });
  }

}
