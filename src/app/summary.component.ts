import {Component ,OnInit } from '@angular/core';
@Component({
    selector:'summary-info',
    templateUrl:'./summary.component.html',
    styleUrls:['./summary.component.css']
})
export class SummaryComponent{
    title = "AN4系统";
      uname = JSON.parse(localStorage.getItem("AN4")).ue;
    constructor(){}
  
}