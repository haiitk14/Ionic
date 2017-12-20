import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AccountServiceProvider {

  constructor(public http: Http) {}

  login(infoUser: Object) {
    return this.http.post("/login", infoUser)
            .map(res => res.json())
            .catch(this.handleError);
  }

  // login(infoUser: Object) {
  //   return new Promise((resolve, reject) =>{
  //     this.http.post('/login', infoUser).
  //     subscribe(res =>{
  //       resolve(res.json());
  //     }, (err) =>{
  //       reject(err);
  //     });
  //   });    
  // }

  signup(infoUser: Object) {
    return this.http.post("/signup", infoUser)
            .map(res => res.json())
            .catch(this.handleError);
  }
  
  // signup(infoUser: Object) {
  //   return new Promise((resolve, reject) =>{
  //     this.http.post('/signup', infoUser).
  //     subscribe(res =>{
  //       resolve(res.json());
  //     }, (err) =>{
  //       reject(err);
  //     });
  //   });    
  // }

  changePassword(pass: Object) {
    return this.http.post("/changepassword", pass)
              .map(res => res.json())
              .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


}
