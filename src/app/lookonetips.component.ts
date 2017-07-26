
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { MetaDataService} from './metadata.service';
import 'rxjs/add/operator/switchMap';
import {PaginationModule} from 'ngx-bootstrap';
@Component({
    selector:'look-onetips',
    templateUrl:'./lookonetips.component.html',
    styleUrls:['./lookonetips.component.css']
})

export class OneTipsComponent {

    public oneTips;

    constructor(
        private metaDataService :MetaDataService,
        private route: ActivatedRoute, 
        private location :Location
 
    ){}
    

    ngOnInit() :void {
        this.route.params
        .switchMap((params:Params) => this.metaDataService.lookOneTips(+params['id']))
        .subscribe((oneTips) => this.oneTips = oneTips.msg)
        
    }

   
}