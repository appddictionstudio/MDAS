import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/companies.service';

@Component({
  selector: 'app-cp-news',
  templateUrl: './cp-news.component.html',
  styleUrls: ['./cp-news.component.css']
})
export class CpNewsComponent implements OnInit {

  displayedColumns: string[] = ['image', 'position', 'name', 'weight', 'symbol'];
  dataSource = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getNews().toPromise().then((newsData) => {
      const news = newsData as any[];
      this.dataSource = news;
      });
  }

}
