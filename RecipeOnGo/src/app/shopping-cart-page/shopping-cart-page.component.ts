import { Component, OnInit, ViewChild } from '@angular/core';
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { getFirestore, doc,getDoc, setDoc, updateDoc } from "firebase/firestore";
import type { IonInput } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
})
export class ShoppingCartPageComponent  implements OnInit {

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Yes',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.deleteList();
      },
    },
  ];
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  shoppingList: any = [""];
  aux: any;
  inputText: string = "";
  user_uid: string | null = "";

  constructor(private alertController: AlertController, private router: Router) { }

  ionViewWillEnter(){
    this.user_uid = localStorage.getItem('user_login_uid');
    this.getFireDatabaseDoc();

    if(!this.user_uid){
      this.presentNotLoginAlert();
    }
  }
  ngOnInit() {
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
  }
  
  async getFireDatabaseDoc(){
    const db = getFirestore();
    const docRef = doc(db, "shopping-lists", "" + this.user_uid);

    try{
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        this.shoppingList = docSnap.data()['list'];
        console.log(this.shoppingList)
      }
    } catch(error) {
      this.presentErrorGetFirebaseData();
      console.log(error)
    }
  }
  onInputText(ev: any) {
    const value = ev.target!.value;
    this.ionInputEl.value = this.inputText = value;
  }

  add_to_database(){

    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    let list;
    // let inputText = document.getElementById("input_text") as HTMLInputElement;
    // this.inputText = inputText.value;
    if(this.inputText != ""){
      list = this.shoppingList;
      list.push(this.inputText);
    }
    if(this.user_uid != null){
      const docRef = doc(db, "shopping-lists", "" + this.user_uid);
    let data = {
      "list": list
    };
    setDoc(docRef, data);
    }

  }
  deleteList(){
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const docRef = doc(db, "shopping-lists", "" + this.user_uid);
    this.shoppingList = [""];
    const data = {
      "list": this.shoppingList
    }
    updateDoc(docRef, data)
  }

  //si todo va bien xd:
  deleteListItem(item: string) {
    console.log("Holi");
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    let list = [];
    if (this.shoppingList) {
      list = this.shoppingList;
      if (list.includes(item)) {
        console.log(item)
        let index = list.indexOf(item);
        list.splice(index, 1);
        const docRef = doc(db, "shopping-lists", "" + this.user_uid);
        let data = {
          "list": list
        };
        updateDoc(docRef, data);
      }
    }
  }

  async presentNotLoginAlert() {
    const alert = await this.alertController.create({
      mode: "ios",
      header: "Please register or login",
      subHeader: "This shopping list functionality needs you to have an account",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
            this.router.navigateByUrl("/");
          },
        },
        {
          text: 'Go to Login',
          role: 'confirm',
          handler: () => {
            console.log();
            this.router.navigateByUrl("/login");
          },
        },
      ],
    });
    await alert.present();
  }
  async presentErrorGetFirebaseData() {
    const alert = await this.alertController.create({
      header: 'Data access error',
      subHeader: 'An error has occurred while accessing your data in the database',
      buttons: [{
        text: 'OK',
        handler: () => {
        },
      },],
    });
    await alert.present();
  }

  //Get All Documents from a FireStoreCollection:
  // const colRef = collection(db, "shopping-lists");
    // const docsSnap = await getDocs(colRef);
    // docsSnap.forEach(doc => {

    //   this.shoppingList = doc.data()['list'];
    //   //console.log(doc.data());
    // })
}
