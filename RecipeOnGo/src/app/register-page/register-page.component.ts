import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged} from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Router} from '@angular/router';
import type { IonInput } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

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
  constructor(private router: Router, private alertController: AlertController) { }

  ionViewWillEnter(){
    let uid = localStorage.getItem('user_login_uid');
    if(uid){
      this.router.navigateByUrl("/");
    }
  }
  
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
            if(this.registerName == ""){
              this.registerName = "Your Name";
            }
            updateProfile(user, {
              displayName: this.registerName
            }).then(() => {
              // Profile created! (name added)
              // ...
            }).catch((error) => {
              this.presentErrorRegister();
              console.log("An error occurred while updating profile name: ", error);
              // ...
            });
          } else {
            // No hay usuario autenticado
            console.log("No hay usuario autenticado.");
          }
        });
        // El usuario se ha registrado exitosamente
        this.router.navigateByUrl("/login");
      } catch (error) {
        // Ocurrió un error durante el registro
        this.presentErrorRegister();
        console.error("Error al registrar usuario:", error);
      }
    };
    registerUser();
  }

  async presentErrorRegister() {
    const alert = await this.alertController.create({
      header: 'Error trying to Register',
      subHeader: 'Please try again',
      buttons: [{
        text: 'OK',
        handler: () => {
        },
      },],
    });
    await alert.present();
  }
}
