import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import { CpNewsComponent } from "../cp-news/cp-news.component";

@Component({
  selector: "app-cp-industries",
  templateUrl: "./cp-industries.component.html",
  styleUrls: ["./cp-industries.component.css"]
})
export class CpIndustriesComponent implements OnInit {
  industries = [];

  constructor(
    public dialogRef: MatDialogRef<CpIndustriesComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.industries = this.data.industryData;
    console.log(this.industries);
  }

  openNewsDialog(tickerSymbol) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.width = '80%';

    dialogConfig.data = {
      id: 1,
      ticker: tickerSymbol
    };

    this.dialog.open(CpNewsComponent, dialogConfig);
  }
}
