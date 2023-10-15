import { Component, OnInit, ViewChild } from '@angular/core';
import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Router} from '@angular/router';
import type { IonInput } from '@ionic/angular';

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
  constructor(private router: Router) { }

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
    // let inputEmail = document.getElementById("login-email") as HTMLInputElement;
    // this.loginEmail = inputEmail.value;
    // console.log(this.loginEmail);

    // let inputPasswd = document.getElementById("login-passwd") as HTMLInputElement;
    // this.loginPasswd = inputPasswd.value;
    // console.log(this.loginPasswd);

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
        console.log("Usuario ha iniciado sesión:", userCredential.user.uid);
        localStorage.setItem('user_login_uid', userCredential.user.uid);
        this.router.navigateByUrl("/favourites");
      } catch (error) {
        // Ocurrió un error durante el inicio de sesión
        console.error("Error al iniciar sesión:", error);
      }
    };
    
    loginUser();
  }
}
