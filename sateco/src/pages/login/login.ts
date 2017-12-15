import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

import { Http,Headers, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';

import { AccountServiceProvider } from '../../providers/account-service/account-service';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private http: Http,
    private AccountServiceProvider: AccountServiceProvider,
  	) {
  }
  items: Object = null;

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signupPage() {
  	this.navCtrl.push(SignupPage);
  }

  login() {
    // code here
    this.getDataJson();
    // this.navCtrl.setRoot(HomePage);
  }

  getDataJson() {

    this.AccountServiceProvider.getData()
        .then((result) =>{
            this.showData(result);
        });
  }

  showData(users) {
    console.log(users);
  }

}
