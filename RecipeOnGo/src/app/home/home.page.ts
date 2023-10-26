import { Component } from '@angular/core';
import { Router} from '@angular/router';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { Device } from '@capacitor/device';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userName: string | null= "";
  isLogged: boolean = false;
  platform: string = "";
  constructor(private router: Router) {}

  ionViewWillEnter(){
    this.isLogged = false;
    if(localStorage.getItem('user_login_uid')){
      this.isLogged = true;
    }
    const firebaseConfig = environment.firebaseConfig;

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    this.getActualFirebaseUser(auth);
  }

  ngOnInit() {
    this.getDeviceInfo();
  }
  async getDeviceInfo(){
    const info = await Device.getInfo();
    this.platform = info.platform;
    console.log(this.platform);
  }
  getActualFirebaseUser(auth: any){
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado
        this.userName = user.displayName;
        console.log("Usuario autenticado:", user);
      } else {
        // No hay usuario autenticado
        console.log("No hay usuario autenticado.");
      }
    });
  }
}
