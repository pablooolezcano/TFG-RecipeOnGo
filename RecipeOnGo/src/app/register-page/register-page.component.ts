import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent  implements OnInit {

  registerName : string = "";
  registerEmail: string = "";
  registerPasswd : string = "";
  constructor() { }

  ngOnInit() {
    
  }

  register(){
    
    let inputName = document.getElementById("register-name") as HTMLInputElement;
    this.registerName = inputName.value;
    console.log(this.registerName);

    let inputEmail = document.getElementById("register-email") as HTMLInputElement;
    this.registerEmail = inputEmail.value;
    console.log(this.registerEmail);

    let inputPasswd = document.getElementById("register-passwd") as HTMLInputElement;
    this.registerPasswd = inputPasswd.value;
    console.log(this.registerPasswd);


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
    

    const registerUser = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.registerEmail,
          this.registerPasswd
        );
    
        // El usuario se ha registrado exitosamente
        console.log("Usuario registrado:", userCredential.user);
      } catch (error) {
        // Ocurrió un error durante el registro
        console.error("Error al registrar usuario:", error);
      }
    };
    registerUser();
  }

}
