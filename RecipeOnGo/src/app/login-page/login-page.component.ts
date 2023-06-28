import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent  implements OnInit {

  loginEmail : string = "";
  loginPasswd : string = "";
  constructor() { }

  ngOnInit() {
    console.log("Helloooo");
  }


  login(){
    let inputEmail = document.getElementById("login-email") as HTMLInputElement;
    this.loginEmail = inputEmail.value;
    console.log(this.loginEmail);

    let inputPasswd = document.getElementById("login-passwd") as HTMLInputElement;
    this.loginPasswd = inputPasswd.value;
    console.log(this.loginPasswd);

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
        console.log("Usuario ha iniciado sesión:", userCredential.user);
      } catch (error) {
        // Ocurrió un error durante el inicio de sesión
        console.error("Error al iniciar sesión:", error);
      }
    };
    
    loginUser();
  }
}
