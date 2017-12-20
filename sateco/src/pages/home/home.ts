import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
  	public navCtrl: NavController,
  	public storage: Storage,
  ) {
  	this.storage.get('username').then((val) => {
       this.username = val;
    });
  }

  username: string;


 

}
