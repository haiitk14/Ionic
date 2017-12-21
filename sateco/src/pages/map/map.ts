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
  markerOld: any;

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
    }, 30000);
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
      this.getDataDevice();

    }, (err) => {
      console.log(err);
    });
  }

  addMarker(latLng) {
    if(this.markerOld != undefined){
      this.deleteMarker(this.markerOld);
    }
    var marker = new google.maps.Marker({
        map: this.map,
        position: latLng,
        icon: './assets/imgs/pointer.png'
      });
    this.markerOld = marker;
  }

  deleteMarker(marker) {
    marker.setMap(null);
  }

  getDataDevice() {
    this.DeviceProvider.getDataDeviceLast().subscribe(
            data => this.showDataDevice(data)
        );
  }

  showDataDevice(device) {
    let latLng: Object = {
      lat: device.results[0].lat,
      lng: device.results[0].lng  
    }
    this.addMarker(latLng);
  }


}
