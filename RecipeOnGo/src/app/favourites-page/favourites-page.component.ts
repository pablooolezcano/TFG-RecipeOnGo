import { Component, OnInit } from '@angular/core';
import { getFirestore, doc,getDoc, setDoc, updateDoc } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { SpooncularApiService } from '../services/spooncular-api.service';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrls: ['./favourites-page.component.scss'],
})
export class FavouritesPageComponent  implements OnInit {

  user_uid: string | null = localStorage.getItem('user_login_uid');
  favouritesIdsList: Array<any> = [];
  favouriteRecipes: Array<any> = [];
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
  constructor(private apiService: SpooncularApiService, private router: Router) { }

  ngOnInit() {
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    
    this.getFireDatabaseDoc();
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
      console.log(error)
    }
    this.favouritesIdsList.forEach(recipeId => {
      this.apiService.getFavouriteRecipes(recipeId).subscribe(
        (response) => {
          console.log(response);
          this.favouriteRecipes.push(response);
        }
      )
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
}
