import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { AccountServiceProvider } from '../../providers/account-service/account-service';
import { Storage } from '@ionic/storage';
import { Common } from '../../providers/common'
import { ToastController } from 'ionic-angular';


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
    public storage: Storage,
    public toastCtrl: ToastController,

  ) {
    this.storage.get('userid').then((val) => {
       this.userId = val;
    });
  }

  userId: number;
  oldPassword: string;
  newPassword: string;
  confPassword: string;

  common = new Common(this.toastCtrl);

  changepass(){

    if(this.oldPassword == undefined || this.oldPassword == ""){
      this.common.showToast("Password old not empty");
      return;
    }
    if(this.newPassword == undefined || this.newPassword == ""){
      this.common.showToast("Password new not empty");
      return;
    }
    if(this.confPassword == undefined || this.confPassword == ""){
      this.common.showToast("Password confirm not empty");
      return;
    }
    if(this.newPassword != this.confPassword){
      this.common.showToast("Incorrect password");
      return;
    }
    let valiPassOld = this.common.validatePassword(this.oldPassword);
    if(!valiPassOld)return;

    let valiPassNew = this.common.validatePassword(this.newPassword);
    if(!valiPassNew) return;

    let valiPassConf = this.common.validatePassword(this.confPassword);
    if(!valiPassConf) return;

    if(valiPassOld && valiPassNew && valiPassConf){
      let pass: Object = {
        userId: this.userId,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };

      this.AccountServiceProvider.changePassword(pass).subscribe(
              data => this.checkChangePassword(data)
          );
    }
  }

  checkChangePassword(res) {
    if(res.status == "200"){
      this.common.showToast(res.message);
      this.navCtrl.setRoot(LoginPage);
    }else{
      this.common.showToast(res.message);
    }
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
