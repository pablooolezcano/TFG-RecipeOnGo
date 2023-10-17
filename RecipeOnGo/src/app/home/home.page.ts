import { Component } from '@angular/core';
import { Router} from '@angular/router';
import {getAuth, reauthenticateWithCredential, EmailAuthProvider, onAuthStateChanged, deleteUser, updateProfile, updateEmail, updatePassword, signInWithEmailAndPassword} from "firebase/auth";
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userName: string | null= "";
  isLogged: boolean = false;
  constructor(private router: Router) { }

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
