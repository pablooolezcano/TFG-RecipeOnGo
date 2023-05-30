import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Helloooo");
  }


  login(){
    let email = document.getElementById("login-email") as HTMLInputElement;
    console.log(email.value);
  }
}
