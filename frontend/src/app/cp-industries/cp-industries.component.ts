import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, } from '@angular/material'

@Component({
  selector: 'app-cp-industries',
  templateUrl: './cp-industries.component.html',
  styleUrls: ['./cp-industries.component.css']
})
export class CpIndustriesComponent implements OnInit {
  industries = [];

  constructor(public dialogRef: MatDialogRef<CpIndustriesComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: any,
  ) { }

  
  ngOnInit() {
    this.industries = this.data.industryData;
    console.log(this.industries)
  }

}
