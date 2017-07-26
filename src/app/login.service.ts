import { Injectable } from '@angular/core';
import {User} from './user';
import { Headers,Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
    private loginUrl = "http://bi.palmap.cn/managemap/login";
    private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    constructor(
        private http:Http
    ){}
       

    login(user):Promise<User>{
        const url = `${this.loginUrl}`;
        return this.http
        .post(this.loginUrl,"username=" + user.username + "&password=" + this.encodeContent(user.password),{headers:this.headers})
        .toPromise()
        .then(res => res.json().msg as User)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('error', error);
        return Promise.reject(error.message || error);
    }

    private encodeContent(data){
        return encodeURI(data).replace(/&/g, '%26').replace(/\+/g, '%2B').replace(/\s/g, '%20').replace(/#/g, '%23');
    }
}