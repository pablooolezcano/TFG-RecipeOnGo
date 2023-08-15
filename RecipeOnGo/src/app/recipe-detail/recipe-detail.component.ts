import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { SpooncularApiService } from '../services/spooncular-api.service';
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { getFirestore, doc,getDoc, setDoc, updateDoc } from "firebase/firestore";
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent  implements OnInit {

  recipeTitle: string = "";
  imageUrl: string = "";
  missingIngredients: any = "";
  usedIngredients: any = "";
  recipeIntructions: any;
  recipeId: number = 0;
  favRecipesList: any = [];
  isFavorite: boolean = false;
  user_uid: string | null = localStorage.getItem('user_login_uid');

  constructor(private router: Router, private apiService: SpooncularApiService) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
  if ( navigation && navigation.extras.state) {
    const data = navigation.extras.state['data'];

    this.recipeId = data.id;
    this.recipeTitle = data.title;
    this.imageUrl = data.image;
    this.missingIngredients = data.missedIngredients;
    this.usedIngredients = data.usedIngredients;

    //GET RECIPE INSTRUCTIONS
    this.apiService.getRecipeIntructions(data.id).subscribe(
      (response) => {
        console.log(typeof response);
        let array = Object.entries(response);
        this.recipeIntructions = array['0']['1']['steps'];
        //algunas recetas tienen un segundo elemento: array['1'], que tiene las serving suggestion, a ve que hago con eso
        console.log(array);
        array['0']['1']['steps'].forEach((item: any) => {
        })

      },
    );
    this.getFireDatabaseDoc();
  }
  }
  async getFireDatabaseDoc(){
    const db = getFirestore();
    const docRef = doc(db, "favourites", "" + this.user_uid);

    try{
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        this.favRecipesList = docSnap.data()['ids'];
        //console.log(this.shoppingList)
      }
    } catch(error) {
      console.log(error)
    }
  }
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      const firebaseConfig = environment.firebaseConfig;
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      let list;
      if(this.favRecipesList){
        list = this.favRecipesList;
        list.push(this.recipeId);
      } else{
        list = [];
        list.push(this.recipeId);
      }
      if (this.user_uid != null) {
        const docRef = doc(db, "favourites", "" + this.user_uid);
        let data = {
          "ids": list
        };
        setDoc(docRef, data);
      }
      this.getFireDatabaseDoc();
    }
  }

}
