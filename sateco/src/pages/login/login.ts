import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { AccountServiceProvider } from '../../providers/account-service/account-service';
import { ToastController } from 'ionic-angular';
import { Common } from '../../providers/common';




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
    public toastCtrl: ToastController,
    public storage: Storage,
  	) { 
    
  }
  username: string;
  password: string;

  common = new Common(this.toastCtrl); 

  goToSignup() {
  	this.navCtrl.push(SignupPage);
  }

  login() {
    if(this.username == undefined || this.username == ""){
      this.common.showToast("Username not empty");
      return;
    }
    if(this.password == undefined || this.password == ""){
      this.common.showToast("Password not empty");
      return;
    }

    let infoUser: Object = {
      username: this.username,
      password: this.password
    };

    // using Overable
    this.AccountServiceProvider.login(infoUser).subscribe(
            data => this.checkLogin(data)
        );

    // using Promise 
    // this.AccountServiceProvider.login(infoUser)
    //     .then((result) =>{
    //         this.checkLogin(result);
    //     });
  }

  checkLogin(res) {

    if(res.status == "200"){
      this.storage.set('username', res.results[0].username);
      this.storage.set('userid', res.results[0].userid);

      this.navCtrl.setRoot(HomePage);
    }else{
      this.common.showToast(res.message);
    }
  }
}
