import { Component,OnInit } from '@angular/core';

import { Http,Headers } from '@angular/http';

import {Router,Route,ActivatedRoute,Params} from '@angular/router';

import { MetaDataService } from './metadata.service';

import { FormGroup,FormsModule} from '@angular/forms';

import 'rxjs/add/operator/switchMap';


@Component({
       selector:'edit-oneTips',
       templateUrl:'./editonetips.component.html',
       styleUrls:['./editonetips.component.css']
})

export class EditOneTipsComponent {

    public oneTips;

    constructor(
        private metaDataService :MetaDataService,
        private route: ActivatedRoute, 
        // private location :Location
    ){}

    ngOnInit():void {
        this.route.params
        .switchMap((params:Params) => this.metaDataService.lookOneTips(+params['id']))
        .subscribe((oneTips) => this.oneTips=oneTips.msg);
    }


    
}

