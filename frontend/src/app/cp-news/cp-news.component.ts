import { Component, OnInit, Inject } from '@angular/core';
import { CompanyService } from '../services/companies.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-cp-news',
  templateUrl: './cp-news.component.html',
  styleUrls: ['./cp-news.component.css']
})
export class CpNewsComponent implements OnInit {
  displayedColumns: string[] = [
    'image',
    'position',
    'name',
    'weight',
    'symbol'
  ];
  dataSource = [];
  ticker = '';

  constructor(
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    this.ticker = data.ticker;
  }

  ngOnInit() {
    this.companyService
      .getNews(this.ticker)
      .toPromise()
      .then(newsData => {
        const news = newsData as any[];
        this.dataSource = news;
      });
  }
}
