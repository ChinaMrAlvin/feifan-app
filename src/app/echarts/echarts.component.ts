import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animations/fadeIn';
import { EchartsService } from './echarts.service';
import  'echarts-gl/dist/echarts-gl';
@Component({
  selector: 'app-chart',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.css'],
  animations: [fadeIn]
})
export class EchartComponent {

  constructor(
    private _service: EchartsService
  ) { }


  public brandArr = [];

  public pieChart;
  public barChart;
  public lineChart;
  public luxuryChart;

  public optionsPie;
  public optionsBar;
  public optionsLine;
  public optionsLuxury;
 
  
  public getPhone() {
    this._service.getPhone().then((res) => {
      // res.data.map((v, i) => {
      //   return this.newArr.push(v.key == "other" ? null : v);
      // })
      // this.newArr = this.newArr.slice(1, 19);
      this.brandArr.push(res.data.map((v, i) => {
        return v.key
      }));
            //异步获取数据
            this.optionsPie = {
              title : {
                   text: '手机品牌分布',
                  subtext: 'alvin made',
                  x:'center'
              },
              tooltip: {
                trigger: 'item',
                // formatter: function(param) {
                //    if(phoneGrandSign){

                //      return param.data.key + "</br>" + param.data.value + '   (' + param.percent + '%)'

                //     }else{
                //         return  PhoneData[param.data.key]+"</br>" + param.data.value + '   (' + param.percent + '%)'
                //     }
                // }
                formatter: function (param) {
                  return param.data.key + "</br>" + param.data.value + '   (' + param.percent + '%)'
                }
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                data: this.brandArr[0]
                // ['深圳','北京','广州','上海','长沙']
              },
              series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: res.data
                // [{
                //         value: 3350,
                //         key: '深圳'
                //       }, {
                //         value: 310,
                //         key: '北京'
                //       }, {
                //         value: 234,
                //         key: '广州'
                //       }, {
                //         value: 135,
                //         key: '上海'
                //       }, {
                //         value: 1548,
                //         key: '长沙'
                //     }]
              }]
            }
            //模拟数据
            this.optionsBar = {
                        title: {
                          text: 'AN4月访问量统计',
                          subtext: 'made by tuju alvin',
                          x: 'center'
                        },
                        color: ['#3398DB'],
                        tooltip: {
                          trigger: 'axis',
                          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                          },
                          formatter: "{b}月{a}:{c}"
                        },
                        grid: {
                          left: '3%',
                          right: '4%',
                          bottom: '3%',
                          containLabel: true
                        },
                        xAxis: [
                          {
                            type: 'category',
                            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                            axisTick: {
                              alignWithLabel: true
                            }
                          }
                        ],
                        yAxis: [
                          {
                            type: 'value'
                          }
                        ],
                        series: [
                          {
                            name: '访问量',
                            type: 'bar',
                            barWidth: '60%',
                            data: [10, 52, 200, 334, 390, 330, 220, 1000, 500, 444, 999, 11]
                          }
                        ]
            };
            //模拟数据
            this.optionsLine= {
                      title: {
                        text: 'AN4月访问趋势图',
                        subtext: 'made by tuju alvin',
                        x: "center"
                      },
                      tooltip: {
                        trigger: 'axis'
                      },
                      xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                      },
                      yAxis: {
                        type: 'value',
                        axisLabel: {
                          formatter: '{value} 次'
                        }
                      },
                      series: [
                        {
                          name: '访问量',
                          type: 'line',
                          data: [11, 11, 15, 13, 12, 13, 10, 123, 100, 99, 66, 199]
                        }

                      ]
            };
    })
  }

  public getLuxury(){
    this._service.luxury().then(res => {
      console.log(res);//res.nodes res.edges
      let edges = res.edges.map((edge) =>{
        return{
          source:edge[0],
          target:edge[1],
          value:2
        }
      });
      let categories=[ ];
      let categoriesMap = {};
      let nodes = res.nodes.map((node)=>{
        if(!categoriesMap[node[3]]){
          categories.push({
            name:node[3]
          });
          categoriesMap[node[3]] = true;
        }
        return{
             x: Math.random() * window.innerWidth,
             y: Math.random() * window.innerHeight,
              symbolSize: node[2],
              category: node[3],
              value: 1
        }
      });
      this.optionsLuxury = {
        color: ["rgb(203,239,15)", "rgb(73,15,239)","rgb(239,231,15)","rgb(15,217,239)","rgb(30,15,239)","rgb(15,174,239)","rgb(116,239,15)","rgb(239,15,58)","rgb(15,239,174)","rgb(239,102,15)","rgb(239,15,15)","rgb(15,44,239)","rgb(239,145,15)","rgb(30,239,15)","rgb(239,188,15)","rgb(159,239,15)","rgb(159,15,239)","rgb(15,239,44)","rgb(15,239,87)","rgb(15,239,217)","rgb(203,15,239)","rgb(239,15,188)","rgb(239,15,102)","rgb(239,58,15)","rgb(239,15,145)","rgb(116,15,239)","rgb(15,131,239)","rgb(73,239,15)","rgb(15,239,131)","rgb(15,87,239)","rgb(239,15,231)"],
        series: [{
            type: 'graphGL',
             title:"alvin",
            nodes: nodes,
            edges: edges,
            categories: categories.sort(function (a, b) { return a.name - b.name; }),
            lineStyle: {
                color: 'rgba(255,255,255,0.2)'
            },
            itemStyle: {
                opacity: 1
            },
            forceAtlas2: {
                steps: 1,
                stopThreshold: 1,
                jitterTolerence: 10,
                edgeWeight: [0.2, 1],
                gravity: 0,
                edgeWeightInfluence: 1,
                scaling: 0.2
            }
        }]
      }
    })
   
  }

  ngOnInit() {
    this.getPhone();
    this.getLuxury();
  }

}




