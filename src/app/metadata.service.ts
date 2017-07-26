import { Injectable } from '@angular/core';
import { Headers, Http,Response,RequestOptions,URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class MetaDataService {

    private Url = {
        getView:"http://bi.palmap.cn/managemap/getView",
        getMapBy:"http://bi.palmap.cn/managemap/getMapBy",
        editView:"http://bi.palmap.cn/managemap/editView?viewStr=",
        getMapById:"http://bi.palmap.cn/managemap/getMapById",
        getEditRole:"http://bi.palmap.cn/managemap/blockUpdateMap",
        editOneTips:"http://bi.palmap.cn/managemap/editView"
    }

    constructor(
        private http:Http
    ){}
    
    public token = JSON.parse(localStorage.getItem("AN4")).token;

    public headers = new Headers({"authorization-map":'Basic:'+this.token+''});

    private params = {

        "projectId":1,

        "count":100,

        "curpage":1,

        "uidNamePid":""
    }
 
//获取视图
    public getView():Promise<any>{
        const url = `${this.Url.getView}`;
        return this.http
        .post(url,{},{headers:this.headers})
        .toPromise()
        .then(res=>res.json() as any)
    }
 //获取所有数据   
    public getMapBy(searchText:any,page:number=1,count:number=100):Promise<any>{
        let url = `${this.Url.getMapBy}`;
        // let params = new URLSearchParams();
        console.log(this.params);
        if(searchText){
            this.params.uidNamePid = searchText;
        }
        this.params.curpage = page;
        this.params.count = count;

        return this.http
        .post(url,this.params,{headers:this.headers})
        .toPromise()
        .then(res => res.json() as any)
    }

//编辑视图
    public upDateView(viewStr):Promise<any>{
        const url=`${this.Url.editView}`;
        return this.http
        .post(url+viewStr,{},{headers:this.headers})
        .toPromise()
        .then(res => res.json() as any)
    }

//查看单一数据
    public lookOneTips(id:any):Promise<any>{
        const url = `${this.Url.getMapById}`;
        return this.http
        .get(url+'?id='+id+'',{headers:this.headers})
        .toPromise()
        .then((res) => res.json() as any )

    }

// 获取编辑权限
    public getEditRole(id:any):Promise<any>{
        const url = `${this.Url.getEditRole}`
        return this.http
        .post(url+'?id='+id+'',{},{headers:this.headers})
        .toPromise()
        .then((res) =>res.json() as any)
    }    

//编辑保存一条数据
    public editSaveOne(data,secrets):Promise<any> {
        const url = `${this.Url.editOneTips}`;
        const headers = new Headers({"authorization-map":'Basic:'+this.token+'',"authentication-update":secrets});
        return this.http
        .post(url,{data},{headers:headers})
        .toPromise()
        .then(res => res.json())
    }    

//编辑更新一条数据todo=======
    public editUpdateOne(){

    }
//排序
    public sort(key:string,sortType:number,curpage,count):Promise<any>{
        const url = `${this.Url.getMapBy}`;
        const data = {
            count:count,
            curpage:curpage,
            projectId:1,
            uidNamePid:'',
            sort:{
                column:key,
                sort:sortType
            }
        }
        return this.http
        .post(url,data,{headers:this.headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }

    private handleError(error:any):Promise<any> {
        console.error('error',error);
        return Promise.reject(error.message || error);
    }
}