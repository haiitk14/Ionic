import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AccountServiceProvider } from '../../providers/account-service/account-service';
import { Common } from '../../providers/common';
import { ToastController } from 'ionic-angular';



/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public AccountServiceProvider: AccountServiceProvider,
    public toastCtrl: ToastController,

  ) {}
  username: string;
  password: string;
  common = new Common(this.toastCtrl); 


  goToLogin() {
  	this.navCtrl.push(LoginPage);
  }

  signup() {
    if(this.username == undefined || this.username == ""){
      this.common.showToast("Username not empty");
      return;
    }
    if(this.password == undefined || this.password == ""){
      this.common.showToast("Password not empty");
      return;
    }
    let validateUsername = this.common.validateUsername(this.username);
    let validatePassword = this.common.validatePassword(this.password);
    if(validateUsername && validatePassword){
      let infoUser: Object = {
        username: this.username,
        password: this.password
      }; 

      this.AccountServiceProvider.signup(infoUser).subscribe(
            data => this.checkSignup(data)
        );    
      // this.AccountServiceProvider.signup(infoUser)
      //   .then((result) =>{
      //       this.checkSignup(result);
      //   });
    }         
  }

  checkSignup(res) {
    if(res.status == "200"){
      this.common.showToast(res.message);
      this.navCtrl.setRoot(LoginPage);
    }else{
      this.common.showToast(res.message);
    }
  }
}
