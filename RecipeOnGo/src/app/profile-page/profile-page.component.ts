import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {getAuth, onAuthStateChanged, deleteUser} from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent  implements OnInit {

  public alertButtons1 = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Yes',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.logOut();
      },
    },
  ];
  public alertButtons2 = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Yes',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.deleteAccount();
      },
    },
  ];
  user_uid : string | null= "";
  constructor(private router: Router) { }

  ngOnInit() {
    //esto tengo que ponerlo en el ngOnInit de ionic, y en los demás igual
    if(localStorage.getItem('user_login_uid') != null){
      this.user_uid = localStorage.getItem('user_login_uid');
    }
    if(!localStorage.getItem('user_login_uid')){
      this.router.navigateByUrl("/login");
    }
  }

  logOut(){
    localStorage.removeItem('user_login_uid');
    this.router.navigateByUrl("/home");
  }

  deleteAccount(){
    const firebaseConfig = environment.firebaseConfig;

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    console.log(auth);
    //get user para pasarle un Objeto user al método deleteUser:
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado
        console.log("Usuario autenticado:", user.uid);
        deleteUserFirebase(user);
        deleteUserDataFromFire(user.uid);
      } else {
        // No hay usuario autenticado
        console.log("No hay usuario autenticado.");
      }
    });

    const deleteUserDataFromFire = async (uid: string) => {
      try {
        const db = getFirestore();
        await deleteDoc(doc(db, "favourites", "" + this.user_uid));
        await deleteDoc(doc(db, "shopping-lists", "" + this.user_uid));
      } catch (error) {
        console.log(error);
      }
    };

    const deleteUserFirebase = async (user: any) => {
      try {
        const userCredential = await deleteUser(user);
        localStorage.removeItem('user_login_uid');
        console.log("Usuario: " + user.uid + "eliminado");
        
      } catch (error) {
        // Ocurrió un error durante el inicio de sesión
        console.error("Error al iniciar sesión:", error);
      }
    };
  }
  
  changePassword(){

  }
  
}
