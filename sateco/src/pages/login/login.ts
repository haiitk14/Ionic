import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

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
    private AccountServiceProvider: AccountServiceProvider,
  	) {
  }
  username: string;
  password: string;

  goToSignup() {
  	this.navCtrl.push(SignupPage);
  }

  login() {
    if(this.username == undefined || this.username == ""){
      alert("Username not empty");
      return;
    }
    if(this.password == undefined || this.password == ""){
      alert("Password not empty");
      return;
    }

    let infoUser: Object = {
      username: this.username,
      password: this.password
    };      
    this.AccountServiceProvider.login(infoUser)
        .then((result) =>{
            this.checkLogin(result);
        });
  }

  checkLogin(res) {
    if(res.status == "200"){
      this.navCtrl.setRoot(HomePage);
    }else{
      alert(res.message);
    }
  }
}
