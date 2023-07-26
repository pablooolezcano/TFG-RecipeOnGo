import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { environment } from 'src/environments/environment';
import { inject } from '@angular/core';
//import { Firestore, collectionData, collection, getFirestore, addDoc } from '@angular/fire/firestore';
import { Firestore, collection, addDoc } from 'firebase/firestore';
import { getFirestore, doc, getDocs, setDoc, deleteField, updateDoc } from "firebase/firestore";
import { } from '@angular/fire/functions';
//import { setDoc } from '@angular/fire/firestore';
@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
})
export class ShoppingCartPageComponent  implements OnInit {

  shoppingList: any;
  aux: any;
  inputText: string = "";
  //firestore: Firestore = inject(Firestore);

  constructor() { }

  ngOnInit() {
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    
    //const dbRef = collection(db, "shopping-lists");
    //this.shoppingList = collectionData(itemCollection);
    console.log("Hola");
    this.getFireDatabase();
    //debugger


    // Initialize Realtime Database and get a reference to the service
    // const db = getDatabase();
    // const shoppingListResponse = ref(db, 'shopping-list/' + 1);

    // onValue(shoppingListResponse, (snapshot) => {
    //   console.log(snapshot.val());
    //   this.aux = snapshot.val();
    //   const data = Object.values(snapshot.val());
    //   console.log(data);
    //   this.shoppingList = data;
    // });
  }
  
  async getFireDatabase(){
    const db = getFirestore();
    const colRef = collection(db, "shopping-lists");
    const docsSnap = await getDocs(colRef);
    docsSnap.forEach(doc => {
      this.shoppingList = doc.data()['list'];
      //console.log(doc.data());
    })
    console.log(this.shoppingList);
  }
  add_to_database(){
    // Initialize Firebase
    let inputText = document.getElementById("input_text") as HTMLInputElement;
    this.inputText = inputText.value;
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    //const colRef = collection(db, "shopping-lists");
    console.log(this.shoppingList);
    this.shoppingList.push(this.inputText);
    //esto de aqui debe ser con el user_uid
    const docRef = doc(db, "shopping-lists", "22YyBDzCYfDiH7zUPXWS");
    let data = {
      "list": this.shoppingList
    };
    setDoc(docRef, data);

  console.log("Done ?");
  }
  deleteList(){
    console.log("Deleting");
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const docRef = doc(db, "shopping-lists", "22YyBDzCYfDiH7zUPXWS");
    const data = {
      "list": deleteField()
    }
    updateDoc(docRef, data)
  }

  //si todo va bien xd:
  deleteListItem(){

  }

}
