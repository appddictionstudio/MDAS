import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Flex Layouts
import { FlexLayoutModule } from "@angular/flex-layout";


// Angular Material and Animations 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CdkTableModule } from '@angular/cdk/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material';

// Charts
import { ChartsModule } from 'ng2-charts';

// Service
import { CalculationsService } from '../services/calculations.service';
import { WeatherService } from '../services/weather.service';
import { CompanyService } from '../services/companies.service';
import { CpMainComponent } from './cp-main/cp-main.component';
import { NavBottomComponent } from './nav-bottom/nav-bottom.component';

@NgModule({
  declarations: [
    AppComponent,
    CpMainComponent,
    NavBottomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    CdkTableModule,
    MatMenuModule,
    FlexLayoutModule,
    MatButtonToggleModule
  ],
  providers: [CalculationsService, WeatherService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
