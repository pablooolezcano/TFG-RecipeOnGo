import { Component, OnInit } from '@angular/core';
import { SpooncularApiService } from '../services/spooncular-api.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss'],
})
export class SearchRecipeComponent  implements OnInit {

  imageUrl : string = "";
  recipeTitle: string = "";
  searchText: string = "";
  recipes: any = "";
  existResult: boolean = false;
  
  constructor(private apiService: SpooncularApiService, private router: Router) { }

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

  search(){
    let inputText = document.getElementById("search_text") as HTMLInputElement;
    this.searchText = inputText.value;
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
}
