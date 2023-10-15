import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged} from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Router} from '@angular/router';
import type { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent  implements OnInit {

  @Input("register-name")
  registerName : string = "";
  registerEmail: string = "";
  registerPasswd : string = "";
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  @ViewChild('ionInputE2', { static: true }) ionInputE2!: IonInput;
  @ViewChild('ionInputE3', { static: true }) ionInputE3!: IonInput;
  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  onInputName(ev: any){
    const value = ev.target!.value;
    this.ionInputEl.value = this.registerName = value;
  }
  onInputEmail(ev: any){
    const value = ev.target!.value;
    this.ionInputE2.value = this.registerEmail = value;
  }
  onInputPassword(ev: any){
    const value = ev.target!.value;
    this.ionInputE3.value = this.registerPasswd = value;
  }

  register(){
    
    // let inputName = document.getElementById("register-name") as HTMLInputElement;
    // this.registerName = inputName.value;
    // console.log(this.registerName);

    // let inputEmail = document.getElementById("register-email") as HTMLInputElement;
    // this.registerEmail = inputEmail.value;
    // console.log(this.registerEmail);

    // let inputPasswd = document.getElementById("register-passwd") as HTMLInputElement;
    // this.registerPasswd = inputPasswd.value;
    // console.log(this.registerPasswd);

    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    const registerUser = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.registerEmail,
          this.registerPasswd
        );
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // El usuario está autenticado
            updateProfile(user, {
              displayName: this.registerName
            }).then(() => {
              console.log("Profile created! (name added)");
              // ...
            }).catch((error) => {
              console.log("An error occurred while updating profile name");
              // ...
            });
          } else {
            // No hay usuario autenticado
            console.log("No hay usuario autenticado.");
          }
        });
        // El usuario se ha registrado exitosamente
        console.log("Usuario registrado:", userCredential.user);
        this.router.navigateByUrl("/login");
      } catch (error) {
        // Ocurrió un error durante el registro
        console.error("Error al registrar usuario:", error);
      }
    };
    registerUser();
  }

}
