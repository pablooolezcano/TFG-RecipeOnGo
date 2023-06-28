import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpooncularApiService {

  constructor(private http: HttpClient) { }
//parameter: ingredients: Array<string>   ingredient: string
  getRecipes(test: string): Observable<any> {
    const apiKey = '15b9af73d0d44a19b7cc19073dfcf8a9';
    // recipes by ingredients:

    const url = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=15b9af73d0d44a19b7cc19073dfcf8a9&ingredients='+ test + '&number=4';

    //URL que funcicionó en Insomnia: https://api.spoonacular.com/recipes/complexSearch?apiKey=15b9af73d0d44a19b7cc19073dfcf8a9&query=chicken
    return this.http.get(url);
  }

  //Get Analyzed Recipe Instructions
  getRecipeIntructions(id: number){
    const apiKey = '15b9af73d0d44a19b7cc19073dfcf8a9';

    const url = 'https://api.spoonacular.com/recipes/' + id + '/analyzedInstructions?apiKey=15b9af73d0d44a19b7cc19073dfcf8a9';
    return this.http.get(url);
  }
}
