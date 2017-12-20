import { ToastController } from 'ionic-angular';


export class Common {
  constructor(
  	 public toastCtrl: ToastController,
  	){}



  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }

  validateUsername(username) {
    if(username.search(/^[a-zA-Z]{1,1}[a-zA-Z0-9]{2,29}$/) < 0){
      this.showToast("Username length 3 to 30 characters");
      return false;
    }

    return true;
  }

  validatePassword(password) {
    if(password.search(/^[a-zA-Z0-9]{6,30}$/) < 0){
      this.showToast("Password about 6 to 30 characters");
      return false;
    }

    return true;
  }

}