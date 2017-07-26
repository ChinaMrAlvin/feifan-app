import { Component, OnInit, OnChanges,ElementRef, Renderer, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Validators, FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { MetaDataService } from './metadata.service';

// animations
import { fadeIn } from './animations/fadeIn';
 import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'data-form',
    templateUrl: './metadata.component.html',
    styleUrls: ['./metadata.component.css'],
    animations: [fadeIn]
})

export class MetaDataComponent implements OnInit,OnChanges{
    public allDatas;
    public oneTipsData;
    public USERVIEW = [];//用户视图
    public SECRETS: object;
    public selectedID: number;

    public totalItems;
    public totalPage;
    public currentPage:number =1;
    public numPages;
    public maxSize:number = 5;
    public itemsPerPage:number = 10;
    public searchText:string;
    public searchTextStream:Subject<string> = new Subject<string>();

    constructor(
        public metaDataService: MetaDataService,
        public router: Router,
        public activeRoute: ActivatedRoute,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef
    ) { 
          this.toastr.setRootViewContainerRef(vcr);
    }

 
    ngOnInit() {
        // this.getData();
        this.activeRoute.params.subscribe(params => {
            console.log(params);
            this.getData(this.searchText,this.currentPage,10);
        });

        this.searchTextStream
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe(searchText => {
            console.log(this.searchText);
            this.getData(this.searchText,this.currentPage,10);
        })

        this.getView();
    }

    public pageChanged(event:any):void {
        console.log(event);
		this.router.navigateByUrl("detailInfo/page/"+event.page);
	}

	public searchChanged($event):void{
		this.searchTextStream.next(this.searchText);
	}

    public getData(searchText:string,page:number,count:number) {
        this.metaDataService.getMapBy(searchText,page,count).then((res) => {
            console.log(res);
            this.allDatas = res.msg.elements;
            this.totalItems = res.msg.totalElements;
            this.totalPage = res.msg.totalPage;
            console.log(this.allDatas);
        })
    }


    public getView() {
        this.metaDataService.getView().then((res) => {
            if (res.status == 200 && res && res.msg.length != 0) {
                this.USERVIEW = JSON.parse(res.msg);
                // console.table(this.USERVIEW);
                console.log(this.USERVIEW);
            }
        })
    }
    //查看一条数据
    public lookOneTips(id: any): void {

        this.metaDataService.lookOneTips(id).then((res) => {
            if (res.status == 200) {
                this.oneTipsData = res.msg;
                this.selectedID = id;
                this.router.navigate(['/detailOne', id]);

            } else {
                alert(res.message);
            }
        })


    }

    //获取编辑权限
    public getEditRole(id: any) {

        this.metaDataService.getEditRole(id).then((res) => {
            if (res.status == 200) {
                this.selectedID = id;
                this.SECRETS = res.msg;
            }
        }).then(() => {
            this.metaDataService.lookOneTips(id).then((res) => {
                if (res.status == 200) {
                    this.oneTipsData = res.msg;
                    this.selectedID = id;
                    this.router.navigate(['/editOne', id]);
                } else {
                    alert(res.message);
                }
            })
        })

    }
    //编辑保存数据
    public editSaveOne(id: any, secrets) {
        this.metaDataService.editSaveOne(id, secrets).then((res) => {

        })
    }
    //编辑更新一条数据
    public editUpdateOne() {

    }

    public delegateSort($event){
        this.toastr.warning('LOOK!!!');
        this.toastr.info("点击了thead委托排序");
        let el = $event.target || $event.srcElement;
        // let key = el.parentNode.className?el.parentNode.className.replace(/ng-tns-c2-0/g,"").trim():"";//获取排序关键词
        let key = el.parentNode.className?el.parentNode.className.replace(/[\r\t\n\s]/g,",").split(",")[1]:"";
        let sortType = el.className.indexOf("up")!==-1 ? 1 :0;//获取排序类型 1 为升序 0为降序
        this.toastr.info(`排序的关键词为---${key};排序的类型为---${sortType==1?'升序':'降序'}`);
        console.log($event);console.log(sortType);console.log(key);
          if(key && key.length){
            this.metaDataService.sort(key,sortType,1,10).then(res =>{
                if(res.status==200){
                    this.allDatas = res.msg.elements;
                    this.totalItems = res.msg.totalElements;
                    this.totalPage = res.msg.totalPage;
                    this.toastr.success("排序更新成功","系统提示");
                }
            })
         }
      

    }

    
   ngOnChanges(changes) {
       console.log(changes);
   }
   

    // 采用事件委托,事件冒泡机制注册 delegateSort方法
    //排序
    // public ascend($event){
    //     // alert("升序");
    //     console.log($event);
    //     this.toastr.info('Just some information for you.');
    // }

    // public descend($event){
    //     // alert("降序");
    //      console.log($event);
    //     this.toastr.warning('You are being warned.', 'Alert!');
    // }
   
}