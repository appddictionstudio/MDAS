import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Environment
import { environment } from '../environments/environment';

// Models
import { Calculations } from '../models/calculations.model';

@Injectable()
export class CalculationsService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public
  getCalculations(){
    return this.http.get(`${environment.API_URL}/calculations`)
  }
}