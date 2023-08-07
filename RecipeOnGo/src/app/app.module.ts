import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SearchRecipeComponent } from './search-recipe/search-recipe.component';
import { ShoppingCartPageComponent } from './shopping-cart-page/shopping-cart-page.component';
import { FavouritesPageComponent } from './favourites-page/favourites-page.component';
import { FooterComponent } from './common/footer/footer.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
@NgModule({
  declarations: [AppComponent, LoginPageComponent, RegisterPageComponent, SearchRecipeComponent, ShoppingCartPageComponent, FavouritesPageComponent, FooterComponent, RecipeDetailComponent, ProfilePageComponent],
  imports: [BrowserModule, IonicModule.forRoot(),HttpClientModule ,AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
