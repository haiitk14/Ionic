import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AccountServiceProvider } from '../../providers/account-service/account-service';

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
  ) {}
  username: string;
  password: string;

  goToLogin() {
  	this.navCtrl.push(LoginPage);
  }

  signup() {
    if(this.username == undefined || this.username == ""){
      alert("Username not empty");
      return;
    }
    if(this.password == undefined || this.password == ""){
      alert("Password not empty");
      return;
    }
    let validateUsername = this.validateUsername(this.username);
    let validatePassword = this.validatePassword(this.password);
    if(validateUsername && validatePassword){
      let infoUser: Object = {
        username: this.username,
        password: this.password
      }; 
      this.AccountServiceProvider.signup(infoUser)
        .then((result) =>{
            this.checkSignup(result);
        });
    }         
  }

  checkSignup(res) {
    if(res.status == "200"){
      alert(res.message);
      this.navCtrl.setRoot(LoginPage);
    }else{
      alert(res.message);
    }
  }

  validateUsername(username) {
    if(username.search(/^([a-zA-Z]+[a-zA-Z0-9]+){3,30}$/) < 0){
      alert("Username length 3 to 30 characters");
      return false;
    }

    return true;
  }

  validatePassword(password) {
    if(password.search(/^[a-zA-Z0-9]{6,30}$/) < 0){
      alert("Password about 6 to 30 characters");
      return false;
    }

    return true;
  }
}
