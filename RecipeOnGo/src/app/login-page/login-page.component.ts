import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

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

    const firebaseConfig = {
      apiKey: "AIzaSyBJBhRXEBneIs_Vt02WfoJN8F4w-4nc89Q",
      authDomain: "tfg-recipeongo.firebaseapp.com",
      projectId: "tfg-recipeongo",
      storageBucket: "tfg-recipeongo.appspot.com",
      messagingSenderId: "622085164849",
      appId: "1:622085164849:web:a0d0357f446b3d215eaa10"
    };
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
