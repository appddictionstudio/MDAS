import { Component } from '@angular/core';

// RXJS
import { Subscription } from 'rxjs';

// Services
import { CalculationsService } from '../services/calculations.service';

// Models
import { Calculations } from '../models/calculations.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MDAS';
  calculationListSub: Subscription;
  calculationList = {};

  constructor(private CalculationService: CalculationsService){

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
  }

  ngOnDestroy() {
    this.calculationListSub.unsubscribe();
  }
}
