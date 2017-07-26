

import { Component,OnInit,OnChanges, ElementRef, Renderer, ViewContainerRef } from '@angular/core';

import { NgForm } from '@angular/forms';

import { Validators ,FormControl,FormGroup } from '@angular/forms';

import { ActivatedRoute, Params ,Router} from '@angular/router';

import { Location } from '@angular/common';

import { MetaDataService } from './metadata.service';

import { Headers,Http} from '@angular/http';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector:'view-controlpage',
    templateUrl:'./view.component.html',
    styleUrls:['./view.component.css']
})

export class ViewControlComponent {

    constructor(
      private metaDataService:MetaDataService,
      private http :Http,
      private router:Router,
      private toastr: ToastsManager,
      private vcr: ViewContainerRef
    ){
         this.toastr.setRootViewContainerRef(vcr);
    }

    public viewStr = [];
   
    public selectedStatus;

    public checked:boolean = false;

    onSubmit(f:NgForm){
        for(let key in f.value){
            if(f.value[key]=="" || f.value[key]==false){
                f.value[key]=0;
             
            }else{
                f.value[key]==1;
              
            }
           
        }
       this.viewStr.push((f.value));
 
       this.metaDataService.upDateView(JSON.stringify(this.viewStr)).then((res)=>{
            this.toastr.success("设置成功","系统提示")
            setTimeout(()=>{
                 this.router.navigate(['./detailInfo/page/1']);
            },1000)
           
       })
    }

    goBack():void{
        this.router.navigate(['./detailInfo/page/1'])
    }

    getSelectedStatus(){
        this.metaDataService.getView()
        .then((res) => {
            this.selectedStatus = JSON.parse(res.msg);
            console.table(this.selectedStatus);
         
          
        })
    }
    ngOnInit():void {
      this.getSelectedStatus();      
    }

    ngOnchanges(changeRecord){
        console.log(changeRecord);
    }

    setValue(f:NgForm):void{
        this.checked = !this.checked;
    }
    
}