import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {getAuth, reauthenticateWithCredential, EmailAuthProvider, onAuthStateChanged, deleteUser, updateProfile, updateEmail, updatePassword, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
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
  user_uid : string | null = "";
  currentUser : any;
  userName : string | null = "";
  userEmail: string | null = "";
  toastMessage: string = "";
  changeEmail: boolean = false;
  changePasswd: boolean = false;

  constructor(private router: Router, private alertController: AlertController) { }

  ionViewWillEnter(){
    if(localStorage.getItem('user_login_uid') != null){
      this.user_uid = localStorage.getItem('user_login_uid');
    }
    if(!localStorage.getItem('user_login_uid')){
      this.presentNotLoginAlert();
    }
    const firebaseConfig = environment.firebaseConfig;

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    this.getActualFirebaseUser(auth);
  }
  ngOnInit() {
    //esto tengo que ponerlo en el ngOnInit de ionic, y en los demás igual
    
  }

  logOut(){
    localStorage.removeItem('user_login_uid');
    this.router.navigateByUrl("/home");
  }

  getActualFirebaseUser(auth: any){
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado
        this.currentUser = user;
        this.userEmail = user.email;
        this.userName = user.displayName;
        console.log("Usuario autenticado:", this.currentUser);
      } else {
        // No hay usuario autenticado
        console.log("No hay usuario autenticado.");
      }
    });
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
        this.router.navigateByUrl("/");
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
        this.presentErrorDeletingAccount();
      }
    };

    const deleteUserFirebase = async (user: any) => {
      try {
        await deleteUser(user);
        localStorage.removeItem('user_login_uid');
        console.log("Usuario: " + user.uid + "eliminado");
        
      } catch (error) {
        // Ocurrió un error durante el inicio de sesión
        console.error("Error al iniciar sesión:", error);
        this.presentErrorDeletingAccount();
      }
    };
  }
  
  updateFirebaseUserName(data: Array<string>){
    //name and foto:
    const firebaseConfig = environment.firebaseConfig;

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    if(data[0] != ''){
      this.toastMessage = "user name";
      updateProfile(this.currentUser, {
            displayName: data[0]
          }).then(() => {
            console.log("Profile updated!");
            this.presentSuccessUpdateToast();
          }).catch((error) => {
            console.log("An error occurred while updating profile name");
            this.presentErrorChangeData();
          });
    }
  }
  updateFirebaseUserEmail(data: Array<string>){
    const firebaseConfig = environment.firebaseConfig;

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    if (data[0] != '') {
      console.log(data[1]);
      onAuthStateChanged(auth, (user) => {
        this.toastMessage = "email";
        if (user) {
          // El usuario está autenticado
          updateEmail(user, data[0]).then(() => {
            this.presentSuccessUpdateToast();
            console.log("Email updated!");
          }).catch((error) => {
            console.log("An error occurred while updating email");
            this.presentErrorChangeData();
          });
          console.log("Usuario autenticado:", this.currentUser);
        } else {
          // No hay usuario autenticado
          console.log("No hay usuario autenticado.");
        }
      });
    }
  }
  changePassword(data: string){
    const firebaseConfig = environment.firebaseConfig;

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();


    onAuthStateChanged(auth, (user) => {
      this.toastMessage = "password";
      if (user) {
        // El usuario está autenticado
        updatePassword(user, data).then(() => {
          console.log("Contraseña cambiada correctamente")
          this.presentSuccessUpdateToast();
        }).catch((error) => {
          // An error ocurred
          console.log(error);
          this.presentErrorChangeData();
        });
        console.log("Usuario autenticado:", this.currentUser);
      } else {
        // No hay usuario autenticado
        console.log("No hay usuario autenticado.");
      }
    });
  }

  async reAuthenticateUser(data: Array<string>){
    const firebaseConfig = environment.firebaseConfig;

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    const credential = EmailAuthProvider.credential(data[0], data[1]);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado
        reauthenticateWithCredential(user, credential).then(() => {
          // User re-authenticated.
          if(this.changeEmail == true){
            this.changeEmail = false;
            this.presentChangeEmailAlert();
          } else if(this.changePasswd == true){
            this.changePasswd = false;
            this.presentChangePasswdAlert();
          }
          
        }).catch((error) => {
          this.presentErrorAuthenticate();
        });
        console.log("Usuario autenticado:", this.currentUser);
      } else {
        // No hay usuario autenticado
        console.log("No hay usuario autenticado.");
      }
    });
  }
  async presentReAuthEmailAlert() {
    const alert = await this.alertController.create({
      header: "Please enter your credentials",
      subHeader: "In order to be able to modify your email",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'Authenticate',
          role: 'confirm',
          handler: (data) => {
            console.log(data[0]);
            this.changeEmail = true;
            this.reAuthenticateUser(data);
          },
        },
      ],
      inputs: [
        {
          label: 'Email',
          type: 'email',
          placeholder: 'enter your email',
        },
        {
          label: 'Password',
          type: 'password',
          placeholder: 'enter your password',
        },
      ]
    });
    await alert.present();
  }
  async presentReAuthPasswordAlert() {
    const alert = await this.alertController.create({
      header: "Please enter your credentials",
      subHeader: "In order to be able to modify your password",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'Authenticate',
          role: 'confirm',
          handler: (data) => {
            console.log(data[0]);
            this.changePasswd = true;
            this.reAuthenticateUser(data);
          },
        },
      ],
      inputs: [
        {
          label: 'Email',
          type: 'email',
          placeholder: 'enter your email',
        },
        {
          label: 'Password',
          type: 'password',
          placeholder: 'enter your password',
        },
      ]
    });
    await alert.present();
  }
  async presentChangePasswdAlert() {
    const alert = await this.alertController.create({
      header: "Please enter your new password",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'Change Password',
          role: 'confirm',
          handler: (data) => {
            console.log(data[0]);
            this.changePassword(data[0]);
          },
        },
      ],
      inputs: [
        {
          type: 'password',
          placeholder: 'New Password',
        },
      ]
    });
    await alert.present();
  }
  async presentChangeNameAlert() {
    const alert = await this.alertController.create({
      header: "Please enter your updated name",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'Update profile name',
          role: 'confirm',
          handler: (data) => {
            console.log(data);
            this.updateFirebaseUserName(data);
          },
        },
      ],
      inputs: [
        {
          placeholder: "" + this.userName,
          value: "" + this.userName
        },
      ]
    });
    await alert.present();
  }
  async presentChangeEmailAlert() {
    const alert = await this.alertController.create({
      header: "Please enter your updated email",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'Update profile email',
          role: 'confirm',
          handler: (data) => {
            console.log(data);
            this.updateFirebaseUserEmail(data);
          },
        },
      ],
      inputs: [
        {
          type: 'email',
          placeholder: "" + this.userEmail,
          value: "" + this.userEmail
        },

      ]
    });
    await alert.present();
  }
  async presentSuccessUpdateToast() {
    const alert = await this.alertController.create({
      header: 'Your ' + this.toastMessage + ' was successfuly updated',
      buttons: [{
        text: 'OK',
        handler: () => {
          if(this.toastMessage == "password"){
            this.logOut();
          }else{
            this.ionViewWillEnter();
          }
        },
      },],
    });
    await alert.present();
  }

  async presentNotLoginAlert() {
    const alert = await this.alertController.create({
      header: 'You have to login to access to the profile page',
      buttons: [{
        text: 'Go to login page',
        handler: () => {
          this.router.navigateByUrl("/login");
        },
      },],
    });
    await alert.present();
  }
  async presentErrorAuthenticate() {
    const alert = await this.alertController.create({
      header: 'Error trying to Authenticate',
      subHeader: 'Wrong email or password',
      buttons: [{
        text: 'OK',
        handler: () => {
        },
      },],
    });
    await alert.present();
  }
  async presentErrorChangeData() {
    const alert = await this.alertController.create({
      header: 'An Error ocurred trying to change your ' + this.toastMessage,
      subHeader: 'Please try again',
      buttons: [{
        text: 'OK',
        handler: () => {
        },
      },],
    });
    await alert.present();
  }
  async presentErrorDeletingAccount() {
    const alert = await this.alertController.create({
      header: 'An Error ocurred trying to delete your account and your associate data',
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
