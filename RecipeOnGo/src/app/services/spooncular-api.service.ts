import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpooncularApiService {

  constructor(private http: HttpClient) { }

  // recipes by ingredients:
  getRecipes(ingredients: string): Observable<any> {
    const apiKey = '15b9af73d0d44a19b7cc19073dfcf8a9';
    const url = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=15b9af73d0d44a19b7cc19073dfcf8a9&ingredients='+ ingredients + '&number=8';
    return this.http.get(url);
  }

  getOneRecipeInfo(id: number){
    const url = 'https://api.spoonacular.com/recipes/' + id +'/information?apiKey=15b9af73d0d44a19b7cc19073dfcf8a9';
    return this.http.get(url);
  }
  //Get Analyzed Recipe Instructions
  getRecipeIntructions(id: number){
    const apiKey = '15b9af73d0d44a19b7cc19073dfcf8a9';
    const url = 'https://api.spoonacular.com/recipes/' + id + '/analyzedInstructions?apiKey=15b9af73d0d44a19b7cc19073dfcf8a9';
    return this.http.get(url);
  }

  getFavouriteRecipes(ids: string){
    const apiKey = '15b9af73d0d44a19b7cc19073dfcf8a9';
    const url = 'https://api.spoonacular.com/recipes/informationBulk?apiKey=15b9af73d0d44a19b7cc19073dfcf8a9&ids=' + ids.toString();
    return this.http.get(url);
  }

  getRandomRecipes(){
    const url = 'https://api.spoonacular.com/recipes/random?apiKey=15b9af73d0d44a19b7cc19073dfcf8a9&number=4'
    return this.http.get(url);
  }

  getAdvanceQueryRecipes(includedIngredients: string, excludedIngredients: string, intolerances: string, minCalories: number, maxCalories: number, maxFat: number, minProtein: number){
    const url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=15b9af73d0d44a19b7cc19073dfcf8a9&includeIngredients=' + includedIngredients + '&excludeIngredients=' + excludedIngredients + 
    '&intolerances=' + intolerances + '&maxCalories=' + maxCalories + '&minCalories=' + minCalories + '&maxFat=' + maxFat + '&minProtein=' + minProtein + '&number=4&addRecipeInformation=true';
    return this.http.get(url);
  }
}
