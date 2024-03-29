import { Component, OnInit } from '@angular/core';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { SpooncularApiService } from '../services/spooncular-api.service';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrls: ['./favourites-page.component.scss'],
})
export class FavouritesPageComponent implements OnInit {

  user_uid: string | null = "";
  favouritesIdsList: Array<any> = [];
  favouriteRecipes: any = [];
  public alertButtons = [
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
        this.deleteFavList();
      },
    },
  ];
  constructor(private apiService: SpooncularApiService, private router: Router, private alertController: AlertController) { }

  ionViewWillEnter() {
    this.user_uid = localStorage.getItem('user_login_uid');
    this.getFireDatabaseDoc();

    if (!this.user_uid) {
      this.presentNotLoginAlert();
    }
  }
  ngOnInit() {
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
  }

  async getFireDatabaseDoc() {
    const db = getFirestore();
    const docRef = doc(db, "favourites", "" + this.user_uid);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.favouritesIdsList = docSnap.data()['ids'];
      }
    } catch (error) {
      this.presentErrorGetFirebaseData();
      console.log(error)
    }
    this.favouriteRecipes = [];

    this.apiService.getFavouriteRecipes(this.favouritesIdsList.toString()).subscribe(
      (response) => {
        this.favouriteRecipes = response;
      },
      (error) => {
        if (error.status == 402) {
          this.presentErrorMaxQueries();
        } else {
          this.presentUnexpectedError();
        }
      });
  }
  goDetail(item: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        data: item
      }
    };
    this.router.navigate(['/recipe-detail', item.id], navigationExtras);
  }

  goToSearch() {
    this.router.navigateByUrl("/search-recipe");
  }

  deleteFavList() {
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const docRef = doc(db, "favourites", "" + this.user_uid);
    this.favouritesIdsList = [];
    this.favouriteRecipes = [];
    const data = {
      "ids": this.favouritesIdsList
    }
    updateDoc(docRef, data)
  }

  async presentNotLoginAlert() {
    const alert = await this.alertController.create({
      header: "Please register or login",
      subHeader: "This favourites recipes functionality needs you to have an account",
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.router.navigateByUrl("/");
          },
        },
        {
          text: 'Go to Login',
          role: 'confirm',
          handler: () => {
            this.router.navigateByUrl("/login");
          },
        },
      ],
    });
    await alert.present();
  }

  async presentErrorGetFirebaseData() {
    const alert = await this.alertController.create({
      header: 'Data access error',
      subHeader: 'An error has occurred while accessing your data in the database',
      message: 'check internet connection',
      buttons: [{
        text: 'OK',
        handler: () => {
        },
      },],
    });
    await alert.present();
  }
  async presentErrorMaxQueries() {
    const alert = await this.alertController.create({
      header: 'The maximum number of daily requests has been reached',
      subHeader: 'Tomorrow you will again have prescription requests available',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigateByUrl("/home");
        },
      },],
    });
    await alert.present();
  }
  async presentUnexpectedError() {
    const alert = await this.alertController.create({
      header: 'An unexpected error has occurred',
      subHeader: 'Please check your Internet connection and try again.',
      buttons: [{
        text: 'OK',
        handler: () => {
        },
      },],
    });
    await alert.present();
  }
}
