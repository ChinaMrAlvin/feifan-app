import { Injectable }from '@angular/core';
import {Headers,Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class EchartsService {
    public phoneBrandURL:string = "http://bi.palmap.cn/hbi/v1/brandRankList?key=544f7bcbce3c4675829a087bbf7cc3d6&mallId=1477&sceneId=11602";
    public connectTrendURL:string ="http://bi.palmap.cn/hbi/v1/mallIndex/getShopConnectionsNumTrend?sceneId=13518&mallId=2150&key=be0436a2ad4e4fc4baf579a5aca65334";
    public popularExURL:string = "http://bi.palmap.cn/bimall/api/hbi/getFenceFlowWithTime?sceneId=11602&mapId=1477&appKey=544f7bcbce3c4675829a087bbf7cc3d6";
    public headers:Object = new Headers({'Content-Type': 'application/json'});
   
    constructor(
        private _http:Http
    ){}


   public getPhone():Promise<any>{
        return this._http
        .get(this.phoneBrandURL)
        .toPromise()
        .then(res => res.json() as any)
        .catch(this.handleError);
    }

   public getTrend():Observable<any>{
       return this._http
       .get(this.connectTrendURL)
       .map((res)=>res.json())
       .catch(this.handleError);
   }

   public getPop():Observable<any>{
        return this._http
       .get(this.popularExURL)
       .map((res)=>res.json())
       .catch(this.handleError);
   }

   public luxury():Promise<any>{
       return this._http
       .get("http://misc.ipalmap.com/AN4/assets/data-1491916702551-rJDoP856x.json")//SERVER
        // .get("../../assets/data-1491916702551-rJDoP856x.json")//LOCAL
       .toPromise()
       .then((res) => res.json() as any)
       .catch(this.handleError);
   }


    private handleError(error: any): Promise<any> {
        console.error('error', error);
        return Promise.reject(error.message || error);
    }


}