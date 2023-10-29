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
  existResult: boolean = false;
  existRandom: boolean = true;
  user_uid: string | null = "";

  constructor(private apiService: SpooncularApiService, private router: Router, private alertController: AlertController) { }

  ionViewWillEnter(){
    //this.user_uid = localStorage.getItem('user_login_uid');

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
    }
  }
  ionViewWillLeave(){
    //this.existRandom = false;
  }

  ngOnInit() {
    
    
    //console.log(this.apiService.getRecipes().pipe());
  }

  goDetail(item: any){
    const navigationExtras: NavigationExtras = {
      state: {
        data: item
      }
    };
    this.router.navigate(['/recipe-detail', item.id], navigationExtras);
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
  showSearchBar(){
    this.existResult = false;
  }
}
