import { Component, OnInit } from '@angular/core';
import { SpooncularApiService } from '../services/spooncular-api.service';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss'],
})
export class SearchRecipeComponent  implements OnInit {

  imageUrl : string = "";
  recipeTitle: string = "";
  searchText: string = "";
  constructor(private apiService: SpooncularApiService) { }

  ngOnInit() {
    
    //console.log(this.apiService.getRecipes().pipe());
  }


  search(){
    let inputText = document.getElementById("search_text") as HTMLInputElement;
    this.searchText = inputText.value;
    console.log(typeof this.searchText);
    let recipeResponse = {};
    this.apiService.getRecipes(this.searchText).subscribe(
      (response) => {
        recipeResponse = response;
        console.log(recipeResponse);
        this.recipeTitle = response[0].title;
        this.imageUrl = response[0].image;
        console.log(this.recipeTitle);
        // Haz lo que necesites con los datos de la respuesta
      },
    );
    
  }
}
