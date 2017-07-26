// import { Directive, ElementRef, HostListener, Input, OnInit,OnChanges, OnDestroy } from '@angular/core';
// import * as echarts from 'echarts';
// import {EchartsService} from './echarts.service';

// @Directive({
//     selector: 'echart'
// })
// export class EChartOptionDirective1 implements OnInit {
//     @Input('chartType') chartType: any;

//     constructor(
//         private el: ElementRef,
//         private _service:EchartsService
//     ) {}

//     public ngOnInit(): void {
//         echarts.init(this.el.nativeElement).setOption(this.chartType);
//     }
// }



import {
  Directive, ElementRef, Input, OnInit, HostBinding, OnChanges, OnDestroy
} from '@angular/core';

import {Subject, Subscription} from "rxjs";

import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;


@Directive({
  selector: 'echart',
})
export class EChartOptionDirective1 implements OnChanges,OnInit,OnDestroy {
  private chart: ECharts;
  private sizeCheckInterval = null;
  private reSize$ = new Subject<string>();
  private onResize: Subscription;
  public phoneTimerID = null;
  @Input('options') options: EChartOption;
  @Input('chartType') chartType: any;
  @HostBinding('style.height.px')
  elHeight: number;

  constructor(private el: ElementRef) {
 
    this.chart = echarts.init(this.el.nativeElement);
       
    console.log(this.chart);
  }


  ngOnChanges(changes) {
    // console.log(changes);
    this.chart.hideLoading();
    console.log(this.options);
    if (this.options) {
       console.log(this.options)
      this.chart.setOption(this.options);
      if(this.options.title){
           let app = {currentIndex:-1};
          let that = this;
          this.phoneTimerID = setInterval(() => {
          
          let dataLen = that.options.series[0].data.length;
            // 取消之前高亮的图形
          that.chart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
            app.currentIndex = (app.currentIndex + 1) % dataLen;
            // 高亮当前图形
            that.chart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
            // 显示 tooltip
            that.chart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
        }, 1000);
      }
     
          
    }
  }

  ngOnInit() {

    this.chart.showLoading({
            maskColor: 'transparent',
    });

    this.sizeCheckInterval = setInterval(() => {
      this.reSize$.next(`${this.el.nativeElement.offsetWidth}:${this.el.nativeElement.offsetHeight}`)
    }, 100);
    this.onResize = this.reSize$
      .distinctUntilChanged()
      .subscribe((_) => this.chart.resize());

    this.elHeight = this.el.nativeElement.offsetHeight;
    if (this.elHeight < 300) {
      this.elHeight = 300;
    }
  }


  ngOnDestroy() {
     console.log("destory echarts")
    if (this.sizeCheckInterval) {
      clearInterval(this.sizeCheckInterval);
      clearInterval(this.phoneTimerID);
      this.phoneTimerID = null;
    }
    this.reSize$.complete();
    if (this.onResize) {
      this.onResize.unsubscribe();
    }
  }
}