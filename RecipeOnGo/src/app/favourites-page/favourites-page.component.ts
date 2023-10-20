import { Component, OnInit } from '@angular/core';
import { getFirestore, doc,getDoc, setDoc, updateDoc } from "firebase/firestore";
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
export class FavouritesPageComponent  implements OnInit {

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

  ionViewWillEnter(){
    this.user_uid = localStorage.getItem('user_login_uid');
    this.getFireDatabaseDoc();

    if(!this.user_uid){
      this.presentNotLoginAlert();
    }
  }
  ngOnInit() {
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
  }

  async getFireDatabaseDoc(){
    const db = getFirestore();
    const docRef = doc(db, "favourites", "" + this.user_uid);

    try{
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        this.favouritesIdsList = docSnap.data()['ids'];
        console.log(this.favouritesIdsList)
      }
    } catch(error) {
      this.presentErrorGetFirebaseData();
      console.log(error)
    }
    this.favouriteRecipes = [];
    // this.favouritesIdsList.forEach(recipeId => {
    //   this.apiService.getFavouriteRecipes(recipeId).subscribe(
    //     (response) => {
    //       console.log(response);
    //       this.favouriteRecipes.push(response);
    //     }
    //   )
    // });

    this.apiService.getFavouriteRecipes(this.favouritesIdsList.toString()).subscribe(
          (response) => {
            console.log(response);
            //this.favouriteRecipes.push(response);
            this.favouriteRecipes = response;
          });

    console.log(this.favouriteRecipes);
  }
  goDetail(item: any){
    const navigationExtras: NavigationExtras = {
      state: {
        data: item
      }
    };
    this.router.navigate(['/recipe-detail', item.id], navigationExtras);
  }

  goToSearch(){
    this.router.navigateByUrl("/search-recipe");
  }

  deleteFavList(){
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
      mode: "ios",
      header: "Please register or login",
      subHeader: "This favourites recipes functionality needs you to have an account",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
            this.router.navigateByUrl("/");
          },
        },
        {
          text: 'Go to Login',
          role: 'confirm',
          handler: () => {
            console.log();
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
      buttons: [{
        text: 'OK',
        handler: () => {
        },
      },],
    });
    await alert.present();
  }
}
