import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
})
export class ShoppingCartPageComponent  implements OnInit {

  shoppingList: any;
  aux: any;
  inputText: string = "";

  constructor() { }

  ngOnInit() {
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    // Initialize Realtime Database and get a reference to the service
    const db = getDatabase();
    const shoppingListResponse = ref(db, 'shopping-list/' + 1);

    onValue(shoppingListResponse, (snapshot) => {
      console.log(snapshot.val());
      this.aux = snapshot.val();
      const data = Object.values(snapshot.val());
      console.log(data);
      this.shoppingList = data;
    });
  }
  database(){
    // Initialize Firebase
    let inputText = document.getElementById("input_text") as HTMLInputElement;
    this.inputText = inputText.value;
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    // Initialize Realtime Database and get a reference to the service
    const db = getDatabase();
    const data = this.aux;
    //tengo que recuperar todo el documento, y añadir lo nuevo y set el doc ded nuevo??
    
    // set(ref(db, 'shopping-list/' + 1), {
    //   shopping_list_item: this.inputText,

    // });
  console.log("Done ?");
  }

}
