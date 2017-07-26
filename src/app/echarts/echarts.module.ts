
import { NgModule,Component} from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

//animation

import {ToastModule} from 'ng2-toastr/ng2-toastr';

import {EchartComponent} from './echarts.component';

import {echartsRoutes} from './echarts.routing';

import { EChartOptionDirective1 } from './echarts.directive';

import {EchartsService} from './echarts.service';

@NgModule({
  declarations: [
    EchartComponent,//模块
    EChartOptionDirective1,//指令 和 pipe
  ],
  imports: [
    HttpModule,
    RouterModule.forChild(echartsRoutes)
  ],
  providers: [EchartsService]
})
export class EchartsModule { }
