import { Component, OnInit, AfterViewInit } from '@angular/core';

// Angular Materials
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

// Services
import { CompanyService } from '../services/companies.service';

@Component({
  selector: 'app-cp-main',
  templateUrl: './cp-main.component.html',
  styleUrls: ['./cp-main.component.css']
})


export class CpMainComponent implements OnInit, AfterViewInit {
  distinctSectors = []

  constructor(private companyService: CompanyService,
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
    this.companyService.getDistinctSector().toPromise().then((data) => {
      const stringData = data.toString();
      const distinctCompanyDataFrame = JSON.parse(stringData);
      console.log(distinctCompanyDataFrame);
      // this.distinctSectors.push(distinctCompanyDataFrame);
      let imageType = [];
      distinctCompanyDataFrame.forEach((sectors) => {
        if (sectors === "Health Care") {
          imageType.push({sectordata: sectors, imageType: 'healthcare'});
        } else if (sectors === "Finance") {
          imageType.push({sectordata: sectors, imageType: 'finance'});
        } else if (sectors === "Consumer Industry") {
          imageType.push({sectordata: sectors, imageType:'consumerServices'});
        } else if (sectors === "Technology/Energy") {
          imageType.push({sectordata: sectors, imageType:'technology'});
        } else if (sectors === "No Industry Identified") {
          imageType.push({sectordata: sectors, imageType:'basicindustries'});
        } else if (sectors === "Capital Goods") {
          imageType.push({sectordata: sectors, imageType:'capitalgoods'});
        } else if (sectors === "Miscellaneous") {
          imageType.push({sectordata: sectors, imageType:'basicindustries'});
        } else if (sectors === "Public Utilities") {
          imageType.push({sectordata: sectors, imageType:'publicutilities'});
        } else if (sectors === "Basic Industries") {  
          imageType.push({sectordata: sectors, imageType:'basicindustries'});
        } else if (sectors === "Transportation") { 
          imageType.push({sectordata: sectors, imageType:'transportation'});
        } else {
          console.log('No Icon Found');
        }
      })
      console.log(imageType);
      this.distinctSectors = imageType;
    });
    // this.open = false;
    // this.button = document.getElementById('cn-button');
    // this.wrapper = document.getElementById('cn-wrapper');
    // this.overlay = document.getElementById('cn-overlay');

    // document.addEventListener('click', this.closeNav);
    // this.button.addEventListener('click', this.handler, false);
    // this.button.addEventListener('focus', this.handler, false);
    // this.wrapper.addEventListener('click', this.cnhandle, false);
  }

  ngAfterViewInit() {
  }

  // cnhandle(e){
  //   e.stopPropagation();
  // }

  // handler(e: Event){
  //   if (!e) var e = window.event;
  //   e.stopPropagation();//so that it doesn't trigger click event on document

  //     if(!open){
  //       this.openNav();
  //     }
  //   else{
  //       this.closeNav();
  //     }
  // }

  // openNav(){
  //   // this.open = true;
  //   //   this.button.innerHTML = "-";
  //   //   this.classie.add(this.overlay, 'on-overlay');
  //   //   this.classie.add(this.wrapper, 'opened-nav');
  // }

  // closeNav(){
  //   // this.open = false;
  //   // this.button.innerHTML = "+";
  //   // this.classie.remove(this.overlay, 'on-overlay');
  //   // this.classie.remove(this.wrapper, 'opened-nav');
  // }
}
