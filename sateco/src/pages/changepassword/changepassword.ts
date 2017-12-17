import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AccountServiceProvider } from '../../providers/account-service/account-service';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public AccountServiceProvider: AccountServiceProvider,
  ) {}
  oldpassword: string;
  newpassword: string;
  confpassword: string;

  changepass(){
    let pageSignup = new SignupPage(this.navCtrl, this.navParams, this.AccountServiceProvider);

    let valiPassOld = pageSignup.validatePassword(this.oldpassword);
    let valiPassNew = pageSignup.validatePassword(this.newpassword);
    let valiPassConf = pageSignup.validatePassword(this.confpassword);

    let pass: Object = {
       oldpassword: this.oldpassword,
       newpassword: this.newpassword,
       confpassword: this.confpassword
    };
    
    


    // this.navCtrl.setRoot(HomePage);
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
