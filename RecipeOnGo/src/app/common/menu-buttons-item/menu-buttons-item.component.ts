import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
@Component({
  selector: 'app-menu-buttons-item',
  templateUrl: './menu-buttons-item.component.html',
  styleUrls: ['./menu-buttons-item.component.scss'],
})
export class MenuButtonsItemComponent  implements OnInit {

  platform: string = "";
  constructor() { }

  ngOnInit() {
    this.getDeviceInfo();
  }

  async getDeviceInfo(){
    const info = await Device.getInfo();
    this.platform = info.platform;
  }
}
