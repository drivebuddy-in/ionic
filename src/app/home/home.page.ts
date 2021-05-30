import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy  {

  deviceInfo: any;
  batteryInfo: any;
  networkListener: any;
  networkStatus: any;
 
  constructor() {}

  ngOnDestroy(): void {
    this.networkListener.remove();
  }

  async ngOnInit(){
    this.getDeviceInfo();
    this.getBatteryStatus();

    this.networkStatus = await Network.getStatus();
    this.networkListener = Network.addListener('networkStatusChange', (status) => {
      this.networkStatus = status;
      if(!status.connected){
        alert("Network Disconnected!");
      }
    });
  }

   getDeviceInfo = async () => {
    const deviceInfo = await Device.getInfo();
    this.deviceInfo = deviceInfo;
  };

  getBatteryStatus = async () => {
    // const batteryInfo = await Device.getBatteryInfo();
    const result = from(Device.getBatteryInfo());
    result.subscribe(x => {
      this.batteryInfo = x;
    });
  }

}
