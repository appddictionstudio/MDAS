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
import { MatInputModule } from '@angular/material/input';

// Charts
import { ChartsModule } from 'ng2-charts';

// Service
import { CalculationsService } from './services/calculations.service';
import { WeatherService } from './services/weather.service';
import { CompanyService } from './services/companies.service';

// Components
import { CpMainComponent } from './cp-main/cp-main.component';
import { NavBottomComponent } from './nav-bottom/nav-bottom.component';
import { AboutComponent } from './about/about.component';
import { CpIndustriesComponent } from './cp-industries/cp-industries.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    CpMainComponent,
    NavBottomComponent,
    AboutComponent,
    CpIndustriesComponent
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
    MatButtonToggleModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [CalculationsService, WeatherService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
