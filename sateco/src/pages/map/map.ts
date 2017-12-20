import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceProvider } from '../../providers/device/device';


declare var google;

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public DeviceProvider: DeviceProvider,
   ) {}

  ionViewDidLoad() {
    this.loadMap();

    var tempThis = this;
    setInterval(function(){ 
        tempThis.getDataDevice();
    }, 5000);
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
    	let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    	let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
   
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });
  }

  addMarker(latLng) {

    // console.log(latLng);
    new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
      });
  }

  getDataDevice() {
    this.DeviceProvider.getDataDeviceLast().subscribe(
            data => this.showDataDevice(data)
        );
  }

  showDataDevice(device) {
    console.log(device.results[0]);
    let latLng: Object = {
      lat: device.results[0].lat,
      lng: device.results[0].lng  
    }
    console.log(latLng);
    this.addMarker(latLng);
  }


}
