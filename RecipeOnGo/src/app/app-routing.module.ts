import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageModule } from './home/home.module';
import {HomePage} from './home/home.page';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SearchRecipeComponent } from './search-recipe/search-recipe.component';
import { ShoppingCartPageComponent } from './shopping-cart-page/shopping-cart-page.component';
import { FavouritesPageComponent } from './favourites-page/favourites-page.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
const routes: Routes = [
  {
    // path: 'home',
    // loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    path: 'home', component: HomePage
  },
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'search-recipe', component: SearchRecipeComponent},
  {path: 'shopping-cart', component: ShoppingCartPageComponent},
  {path: 'favourites', component: FavouritesPageComponent},
  {path: 'recipe-detail/:id', component: RecipeDetailComponent},
  {path: 'profile', component: ProfilePageComponent},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
