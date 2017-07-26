import {Component ,OnInit } from '@angular/core';

@Component({
    selector:'detail-info',
    templateUrl:'./detailInfo.component.html',
    styleUrls:['./detailInfo.component.css']
})
export class DetailInfoComponent{
    title = "AN4系统";
    uname = JSON.parse(localStorage.getItem("AN4")).ue;
    constructor(){}

   
}