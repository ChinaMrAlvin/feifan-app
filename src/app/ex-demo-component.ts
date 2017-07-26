import { animate,state,style,transition,trigger} from '@angular/animations';

import { Component, NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';

@Component({
    selector:"demo-animation",
    animations:[trigger(
        'openClose',[
            state('collapsed, void', style({height: '0px', color: 'maroon', borderColor: 'maroon'})),
            state('expanded', style({height: '*', borderColor: 'green', color: 'green'})),
            transition('collapsed <=> expanded', [animate(500, style({height: '250px'})), animate(500)])
        ]
    )],
    templateUrl:'./ex-demo-component.html',
    styleUrls:['./ex-demo-component.css']
})


export class DemoAnimateComponent{
    stateExpression:string;
    constructor(){this.collapse()}

    expand():void{
        this.stateExpression = 'expanded';
    }

    collapse():void{
        this.stateExpression = 'collapsed';
    }
}