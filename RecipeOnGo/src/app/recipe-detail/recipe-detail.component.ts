import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpooncularApiService } from '../services/spooncular-api.service';
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { getFirestore, doc,getDoc, setDoc } from "firebase/firestore";
import { IonToggle } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent  implements OnInit {

  @ViewChild('myToggle') myToggle!: IonToggle;

  recipeTitle: string = "";
  imageUrl: string = "";
  missingIngredients: any = [];
  usedIngredients: any = [];
  extendedIngredients: any = [];
  advancedRecipeInfo: any = [];
  caloriesInfo: string = "";
  fatsInfo: string = "";
  proteinsInfo: string = "";
  navFromFavs: boolean = false;
  navFromAdvanceSearch: boolean = false;
  recipeIntructions: any;
  recipeId: number = 0;
  favRecipesList: any = [];
  isFavorite: boolean = false;
  user_uid: string | null = localStorage.getItem('user_login_uid');

  constructor(private router: Router, private apiService: SpooncularApiService, private alertController: AlertController) { }

  ionViewWillEnter(){}

  ngOnInit() {
    this.extendedIngredients = [];
    this.usedIngredients = [];
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const data = navigation.extras.state['data'];

      this.recipeId = data.id;
      this.recipeTitle = data.title;
      this.imageUrl = data.image;

      if (data.extendedIngredients) {
        this.extendedIngredients = data.extendedIngredients;
        this.recipeIntructions = data.analyzedInstructions['0']['steps'];
        this.navFromFavs = true;
      } else if (data.usedIngredients) {
        this.missingIngredients = data.missedIngredients;
        this.usedIngredients = data.usedIngredients;
        //GET RECIPE INSTRUCTIONS
        this.apiService.getRecipeIntructions(data.id).subscribe(
          (response) => {
            let array = Object.entries(response);
            this.recipeIntructions = array['0']['1']['steps'];
            console.log("Intructions ONLY in NOrmal Search")
          },
        );
      } else if (data.nutrition) {
        this.navFromAdvanceSearch = true;
        console.log("Test when IS Advance Search")
        this.apiService.getOneRecipeInfo(this.recipeId).subscribe((response) => {
          this.advancedRecipeInfo = response;
          this.extendedIngredients = this.advancedRecipeInfo.extendedIngredients;
          console.log(this.extendedIngredients)
        })
        this.caloriesInfo = data.nutrition.nutrients.find((nutrient: any) => nutrient.name === 'Calories').amount.toFixed(1);
        this.proteinsInfo = data.nutrition.nutrients.find((nutrient: any) => nutrient.name === 'Protein').amount.toFixed(1);
        this.fatsInfo = data.nutrition.nutrients.find((nutrient: any) => nutrient.name === 'Fat').amount.toFixed(1);
        this.recipeIntructions = data.analyzedInstructions['0']['steps'];
      }
      this.getFireDatabaseDoc();
    }
  }
  async getFireDatabaseDoc(){
    //ver si puedo centralizar esto porq a veces da problemas con obtener datos
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();
    const docRef = doc(db, "favourites", "" + this.user_uid);

    try{
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        this.favRecipesList = docSnap.data()['ids'];
        console.log(this.favRecipesList)
        let list = this.favRecipesList;
        if (list.includes(this.recipeId)) {
            console.log(this.myToggle.checked);
            this.myToggle.checked = true;
          }
      }
    } catch(error) {
      this.presentErrorGetFirebaseData();
      console.log(error)
    }
  }
  toggleFavorite() {
    //aqui invierto el true/false porque está al reves idk why
    this.isFavorite = !this.myToggle.checked;
    console.log(this.isFavorite);

    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    let list;
    if (this.isFavorite) {
      if (this.favRecipesList) {
        list = this.favRecipesList;
        list.push(this.recipeId);
      } else {
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
    } else if (this.isFavorite == false) {
      if (this.favRecipesList) {
        list = this.favRecipesList;
        if (list.includes(this.recipeId)) {
          console.log(this.recipeId)
          let index = list.indexOf(this.recipeId);
          list.splice(index, 1);
          const docRef = doc(db, "favourites", "" + this.user_uid);
          let data = {
            "ids": list
          };
          setDoc(docRef, data);
        }
      }
    }
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
