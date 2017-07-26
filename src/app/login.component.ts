import { Component, ElementRef, Renderer, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';

import { Validators, FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

// import { User } from './user';
 import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
    selector: 'login-app',

    template: `
     <div id="login">

        <div class="loginTitle">
            AN4系统
        </div>

        <div class="loginAccount">
             <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
                <label><span><i class="fa fa-user" aria-hidden="true"></i>账号</span><input name="username" ngModel required #username="ngModel"></label>
                <label><span><i class="fa fa-key" aria-hidden="true"></i>密码：</span><input type="password" name="password" ngModel></label>
                <label><span>记住密码:</span> <input type="checkbox" name="checkBox" id="ck" ngModel [checked]=f.value.checkBox> </label>  
                <p *ngIf="show">账号或密码错误</p> 
                <button id="submit" type="submit" class="btn btn-primary">Submit</button>
            </form>
            <div>{{f.value | json}}</div>
        </div>
      
    </div>
  `,
    styleUrls: ['./login.component.css']
})


export class LoginComponent {

    show: boolean = false;
    word: string = "";
    
    constructor(
        private router: Router,
        private loginService: LoginService,
        private toastr: ToastsManager,
        public vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
     }

    onSubmit(f: NgForm) {
        console.log(f.value);
        console.log(f.valid);
        if (f.value.checkBox && f.value.checkBox != "") {

        }
        this.loginService.login(f.value).then((res) => {
            console.log(res);
            console.log(f.value);
            console.log(f.valid);
            if (res.token) {
                console.log(res.token);
                this.toastr.success("登录成功","系统提示");
                localStorage.setItem("AN4",JSON.stringify({
                    token:res.token,
                    ue:f.value.username
                }))
                this.show = false;
                this.router.navigateByUrl('/detailInfo/page/1');
            } else {
                this.show = true;
                this.toastr.error("登录失败","系统提示");
              
            }


        })
    }


}

// $.getJSON('/asset/get/s/data-1491916702551-rJDoP856x.json', function (graph) {
//     var edges = graph.edges.map(function (edge) {
//         return {
//             source: edge[0],
//             target: edge[1],
//             value: 2
//         }
//     });
//     var categories = [];
//     var categoriesMap = {};
//     var nodes = graph.nodes.map(function (node) {
//         if (!categoriesMap[node[3]]) {
//             categories.push({
//                 name: node[3]
//             });
//             categoriesMap[node[3]] = true;
//         }
//         return {
//             x: Math.random() * window.innerWidth,
//             y: Math.random() * window.innerHeight,
//             // x: node[0],
//             // y: node[1],
//             symbolSize: node[2],
//             category: node[3],
//             value: 1
//         }
//     });


//     myChart.setOption({
//         color: ["rgb(203,239,15)", "rgb(73,15,239)","rgb(239,231,15)","rgb(15,217,239)","rgb(30,15,239)","rgb(15,174,239)","rgb(116,239,15)","rgb(239,15,58)","rgb(15,239,174)","rgb(239,102,15)","rgb(239,15,15)","rgb(15,44,239)","rgb(239,145,15)","rgb(30,239,15)","rgb(239,188,15)","rgb(159,239,15)","rgb(159,15,239)","rgb(15,239,44)","rgb(15,239,87)","rgb(15,239,217)","rgb(203,15,239)","rgb(239,15,188)","rgb(239,15,102)","rgb(239,58,15)","rgb(239,15,145)","rgb(116,15,239)","rgb(15,131,239)","rgb(73,239,15)","rgb(15,239,131)","rgb(15,87,239)","rgb(239,15,231)"],
//         series: [{
//             type: 'graphGL',
//             nodes: nodes,
//             edges: edges,
//             categories: categories.sort(function (a, b) { return a.name - b.name; }),
//             lineStyle: {
//                 color: 'rgba(255,255,255,0.2)'
//             },
//             itemStyle: {
//                 opacity: 1
//             },
//             forceAtlas2: {
//                 steps: 1,
//                 stopThreshold: 1,
//                 jitterTolerence: 10,
//                 edgeWeight: [0.2, 1],
//                 gravity: 0,
//                 edgeWeightInfluence: 1,
//                 scaling: 0.2
//             }
//         }]
//     });
// });