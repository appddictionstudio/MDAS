import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Environment
import { environment } from '../../environments/environment';

@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) {}

  // GET list of public
  getCompanies() {
    return this.http.get(`${environment.API_URL}/companyAnalysis`);
  }

  getDistinctSector() {
    return this.http.get(`${environment.API_URL}/distinctSectors`);
  }

  getSectorAndIndustryData() {
    return this.http.get(
      `${environment.API_URL}/distinctSectorsWithIndustries`
    );
  }

  getSectorAvgs() {
    return this.http.get(`${environment.API_URL}/getAvgSectorRatesAbr`);
  }

  getNews() {
    return this.http.get(`${environment.API_URL}/news`);
  }
}
