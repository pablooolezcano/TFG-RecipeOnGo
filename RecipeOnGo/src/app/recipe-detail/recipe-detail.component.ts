import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { SpooncularApiService } from '../services/spooncular-api.service';

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

  isFavorite: boolean = false;

  constructor(private router: Router, private apiService: SpooncularApiService) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
  if ( navigation && navigation.extras.state) {
    const data = navigation.extras.state['data'];
    // Utiliza los datos pasados al componente de detalle
    // console.log(data.title);
    // console.log(data.id);
    this.recipeTitle = data.title;
    this.imageUrl = data.image;
    this.missingIngredients = data.missedIngredients;
    this.usedIngredients = data.usedIngredients;
    // ...

    //GET RECIPE INSTRUCTIONS
    this.apiService.getRecipeIntructions(data.id).subscribe(
      (response) => {
        console.log(typeof response);
        //tengo que sacar las cosas que necesito del objeto;
        let array = Object.entries(response);
        this.recipeIntructions = array['0']['1']['steps'];
        //algunas recetas tienen un segundo elemento: array['1'], que tiene las serving suggestion, a ve que hago con eso
        console.log(array);
        array['0']['1']['steps'].forEach((item: any) => {
          console.log(item.number, item.step);
          //console.log(item)
        })

      },
    );
    
  }
  }
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

}
