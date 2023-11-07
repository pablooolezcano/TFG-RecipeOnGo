import { Component, OnInit, ViewChild } from '@angular/core';
import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Router} from '@angular/router';
import type { IonInput } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent  implements OnInit {

  loginEmail : string = "";
  loginPasswd : string = "";
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  @ViewChild('ionInputE2', { static: true }) ionInputE2!: IonInput;
  constructor(private router: Router, private alertController: AlertController) { }

  ionViewWillEnter(){
    let uid = localStorage.getItem('user_login_uid');
    if(uid){
      this.router.navigateByUrl("/");
    }
  }
  ngOnInit() {
    
  }
  onInputEmail(ev: any){
    const value = ev.target!.value;
    this.ionInputEl.value = this.loginEmail = value;
  }
  onInputPassword(ev: any){
    const value = ev.target!.value;
    this.ionInputE2.value = this.loginPasswd = value;
  }

  login(){

    const firebaseConfig = environment.firebaseConfig;

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    
    const loginUser = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.loginEmail,
          this.loginPasswd
        );
    
        // El usuario ha iniciado sesión exitosamente
        localStorage.setItem('user_login_uid', userCredential.user.uid);
        this.router.navigateByUrl("/");
      } catch (error) {
        // Ocurrió un error durante el inicio de sesión
        this.presentErrorLogin();
        console.error("Error al iniciar sesión:", error);
      }
    };
    
    loginUser();
  }
  async presentErrorLogin() {
    const alert = await this.alertController.create({
      header: 'Error trying to Log In',
      subHeader: 'Wrong email or password',
      buttons: [{
        text: 'OK',
        handler: () => {
        },
      },],
    });
    await alert.present();
  }
}
