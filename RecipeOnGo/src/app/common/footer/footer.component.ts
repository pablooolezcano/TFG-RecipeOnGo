import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Device } from '@capacitor/device';
import { Keyboard } from '@capacitor/keyboard';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  isLogged: boolean = false;
  platform: string = "";
  keyboardActive: boolean = false;
  showFooter: boolean = true;
  constructor(private router: Router) { }

  ionViewWillEnter(){
    this.isLogged = false;
    if(localStorage.getItem('user_login_uid')){
      this.isLogged = true;
    }
  }

  ngOnInit() {
    this.isLogged = false;
    if (localStorage.getItem('user_login_uid')) {
      this.isLogged = true;
    }
    this.getDeviceInfo();

    if(this.platform !== 'web'){
      Keyboard.addListener('keyboardDidShow', () => {
        this.keyboardActive = true;
        this.changeShowFooter();
      });
      Keyboard.addListener('keyboardDidHide', () => {
        this.keyboardActive = false;
        this.changeShowFooter();
      });
    }
  }
  async getDeviceInfo() {
    const info = await Device.getInfo();
    this.platform = info.platform;
    console.log(this.platform);
    this.changeShowFooter();
  }
  changeShowFooter() {
    if (this.platform == 'web') {
      this.showFooter = false;
    } else {
      if (this.keyboardActive == true) {
        this.showFooter = false;
      } else {
        this.showFooter = true;
      }
    }
  }

}
