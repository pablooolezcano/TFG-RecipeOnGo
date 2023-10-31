import { Component, OnInit, ViewChild } from '@angular/core';
import { SpooncularApiService } from '../services/spooncular-api.service';
import { Router, NavigationExtras } from '@angular/router';
import type { IonInput } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss'],
})
export class SearchRecipeComponent  implements OnInit {

  imageUrl : string = "";
  recipeTitle: string = "";
  searchText: string = "";
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  recipes: any = "";
  advanceSearchRecipes: any = [];
  existResult: boolean = false;
  existRandom: boolean = true;
  user_uid: string | null = "";

  constructor(private apiService: SpooncularApiService, private router: Router, private alertController: AlertController) { }

  ionViewWillEnter(){}

  ngOnInit() {
    if(this.existRandom == true){
      this.apiService.getRandomRecipes().subscribe(
        (response) => {
          this.recipes = response;
          let randomRecipes = this.recipes['recipes'];
          this.recipes = randomRecipes;
          this.existResult = true;
          this.existRandom = false;
        },
        (error) => {
          if(error.status == 402){
            this.presentErrorMaxQueries();
          }else{
            this.presentUnexpectedError();
          }
        });
        this.existRandom = false;
    }
  }

  showRecipesSuggestions(){
    this.apiService.getRandomRecipes().subscribe(
      (response) => {
        this.recipes = response;
        let randomRecipes = this.recipes['recipes'];
        this.recipes = randomRecipes;
        this.existResult = true;
        this.existRandom = false;
      },
      (error) => {
        if(error.status == 402){
          this.presentErrorMaxQueries();
        }else{
          this.presentUnexpectedError();
        }
      });
  }

  goDetail(item: any){
    const navigationExtras: NavigationExtras = {
      state: {
        data: item
      }
    };
    this.router.navigate(['/recipe-detail', item.id], navigationExtras);
  }

  showSearchBar(){
    this.existResult = false;
  }

  onInputText(ev: any) {
    const value = ev.target!.value;
    this.ionInputEl.value = this.searchText = value;
  }

  search(event: any){
    console.log(event.detail.value)
    this.searchText = event.detail.value;
    if(this.searchText !== ""){
      this.apiService.getRecipes(this.searchText).subscribe(
        (response) => {
          if(response !== undefined && response.length > 0){
            this.recipes = response; 
            this.recipeTitle = response[0].title;
            this.imageUrl = response[0].image;
            this.existResult = true;
          }else{
            this.presentErrorSearchInput();
          }
        },
        (error) => {
          if(error.status == 402){
            this.presentErrorMaxQueries();
          }else{
            this.presentUnexpectedError();
          }
        }
      );
    }

  }
  async presentErrorSearchInput() {
    const alert = await this.alertController.create({
      header: 'Error en los datos proporcionados',
      subHeader: 'Introduzca bien los ingredientes, en un formato como: chicken, cheese, milk, etc',
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
  async presentNoResultError() {
    const alert = await this.alertController.create({
      header: 'No results found for the data provided.',
      buttons: [{
        text: 'OK',
        handler: () => {
        },
      },],
    });
    await alert.present();
  }
  async presentAdvanceSearchAlert() {
    const alert = await this.alertController.create({
      header: "Please fill the advanced search form",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'Search',
          role: 'confirm',
          handler: (data) => {
            console.log(data);
            const defaultValues = [1, 2000, 1000, 1];
            [3, 4, 5, 6].forEach((index) => {
              if (data[index] === '') {
                data[index] = defaultValues[index - 3];
              }
            });
            console.log(data);
            this.apiService.getAdvanceQueryRecipes(data[0], data[1], data[2], data[3], data[4], data[5], data[6]).subscribe(
              (response) => {
                this.advanceSearchRecipes = response;
                if(this.advanceSearchRecipes.totalResults == 0){
                  this.presentNoResultError();
                }else{

                  this.recipes = this.advanceSearchRecipes.results;
                  this.existResult = true;
                  console.log(this.advanceSearchRecipes);
                  console.log(this.advanceSearchRecipes.totalResults);
                }
              }
            )
          },
        },
      ],
      inputs: [
        {
          label: 'Ingredients',
          type: 'text',
          placeholder: 'Ingredients (ex. chicken, cheese)',
        },
        {
          label: 'Excluded Ingredients',
          type: 'text',
          placeholder: 'Excluded Ingredients (ex. egg, tuna)',
        },
        {
          label: 'Intolerances',
          type: 'text',
          placeholder: 'Intolerances (ex. gluten, diary)',
        },
        {
          label: 'Min Calories',
          type: 'number',
          placeholder: 'Min Calories (ex. 100)',
        },
        {
          label: 'Max Calories',
          type: 'number',
          placeholder: 'Max Calories (ex. 500)',
        },
        {
          label: 'Max Fat grams',
          type: 'number',
          placeholder: 'Max Fat grams (ex. 20)',
        },
        {
          label: 'Min Protein grams',
          type: 'number',
          placeholder: 'Min Protein grams (ex. 10)',
        },
      ]
    });
    await alert.present();
  }
}
