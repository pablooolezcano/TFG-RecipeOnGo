import { Component, OnInit, ViewChild } from '@angular/core';
import { SpooncularApiService } from '../services/spooncular-api.service';
import { Router, NavigationExtras } from '@angular/router';
import type { IonInput } from '@ionic/angular';
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

  constructor(private apiService: SpooncularApiService, private router: Router) { }

  ionViewWillEnter(){

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
    // let searchBarText = this.mySearchBar.value;
    // console.log(searchBarText);

    let inputText = document.getElementById("search_text") as HTMLInputElement;
    //this.searchText = inputText.value;
    this.searchText = event.detail.value;
    console.log(typeof this.searchText);
    let recipeResponse = {};
    this.apiService.getRecipes(this.searchText).subscribe(
      (response) => {
        //recipeResponse = response;
        this.recipes = response; 
        this.recipeTitle = response[0].title;
        this.imageUrl = response[0].image;
        console.log(this.recipeTitle);
        this.existResult = true;
        // Haz lo que necesites con los datos de la respuesta
      },
    );
  }

  showSearchBar(){
    this.existResult = false;
  }
}
