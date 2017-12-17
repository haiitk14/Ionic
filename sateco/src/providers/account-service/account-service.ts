import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountServiceProvider {

  constructor(public http: Http) {}

  login(infoUser: Object) {
    return new Promise((resolve, reject) =>{
      this.http.post('/login', infoUser).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });
    });    
  }

  signup(infoUser: Object) {
    return new Promise((resolve, reject) =>{
      this.http.post('/signup', infoUser).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });
    });    
  }
}
