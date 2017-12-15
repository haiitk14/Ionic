import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

let apiUrl = 'users';

/*
  Generated class for the AccountServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AccountServiceProvider Provider');
  }

  getData(){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.get(apiUrl).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }
}
