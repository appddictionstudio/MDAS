import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';

// Environments
import { environment } from '../../environments/environment';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  getWeather(){
      return this.http.get(`${environment.WEATHER_url}`).pipe(
          map((results) => results)
      )
  }

}