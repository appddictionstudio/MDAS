import { Component } from '@angular/core';

// Chart.js
import { Chart } from 'chart.js';

// RXJS
import { Subscription } from 'rxjs';

// Services
import { CalculationsService } from '../services/calculations.service';

// Angular Materials
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

// Models
import { Calculations } from '../models/calculations.model';

// Services
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chart = [];
  title = 'MDAS';
  calculationListSub: Subscription;
  calculationList = {};

  constructor(private CalculationService: CalculationsService,
    private weatherService: WeatherService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('beaker', sanitizer.bypassSecurityTrustResourceUrl('assets/beaker.svg'));
  }

  ngOnInit() {
    this.calculationListSub = this.CalculationService
      .getCalculations()
      .subscribe(res => {
        console.log(res);
        this.calculationList = res;
      },
        console.error
      );

    this.weatherService.getWeather().subscribe((results) => {
      console.log(results);
      let temp_max = results['list'].map(list => list.temp.max);
      let temp_min = results['list'].map(list => list.temp.min);
      let allDates = results['list'].map(list => list.dt);

      let weatherDates = []
      allDates.forEach((results) => {
        let jsDate = new Date(results * 1000)
        weatherDates.push(jsDate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
      })
      console.log(temp_max, temp_min, allDates);
      console.log(weatherDates);

      var ctx = document.getElementById('myChart');
      var myChart = new Chart('ctx', {
        type: 'line',
        data: {
          labels: weatherDates,
          datasets: [
            {
              data: temp_max,
              borderColor: '#3cba9f',
              fill: false
            },
            {
              data: temp_min,
              borderColor: '#ffcc00',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      })
    })

  }

  ngOnDestroy() {
    this.calculationListSub.unsubscribe();
  }
}
