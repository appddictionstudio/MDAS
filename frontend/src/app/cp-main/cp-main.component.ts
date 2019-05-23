import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-cp-main',
  templateUrl: './cp-main.component.html',
  styleUrls: ['./cp-main.component.css']
})


export class CpMainComponent implements OnInit, AfterViewInit {
  // open: boolean;
  // button: any;
  // classie: any;
  // wrapper: any;
  // overlay: any;

  constructor() {
   }

  ngOnInit() {
    // this.open = false;
    // this.button = document.getElementById('cn-button');
    // this.wrapper = document.getElementById('cn-wrapper');
    // this.overlay = document.getElementById('cn-overlay');

    // document.addEventListener('click', this.closeNav);
    // this.button.addEventListener('click', this.handler, false);
    // this.button.addEventListener('focus', this.handler, false);
    // this.wrapper.addEventListener('click', this.cnhandle, false);
  }

  ngAfterViewInit(){
  }

  // cnhandle(e){
  //   e.stopPropagation();
  // }

  // handler(e: Event){
  //   if (!e) var e = window.event;
  //   e.stopPropagation();//so that it doesn't trigger click event on document

  //     if(!open){
  //       this.openNav();
  //     }
  //   else{
  //       this.closeNav();
  //     }
  // }

  // openNav(){
  //   // this.open = true;
  //   //   this.button.innerHTML = "-";
  //   //   this.classie.add(this.overlay, 'on-overlay');
  //   //   this.classie.add(this.wrapper, 'opened-nav');
  // }

  // closeNav(){
  //   // this.open = false;
  //   // this.button.innerHTML = "+";
  //   // this.classie.remove(this.overlay, 'on-overlay');
  //   // this.classie.remove(this.wrapper, 'opened-nav');
  // }
}
