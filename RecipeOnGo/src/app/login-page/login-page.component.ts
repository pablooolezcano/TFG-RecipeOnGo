import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent  implements OnInit {

  loginEmail : string = "";
  loginPasswd : string = "";
  constructor() { }

  ngOnInit() {
    console.log("Helloooo");
  }


  login(){
    let inputEmail = document.getElementById("login-email") as HTMLInputElement;
    this.loginEmail = inputEmail.value;
    console.log(this.loginEmail);

    let inputPasswd = document.getElementById("login-passwd") as HTMLInputElement;
    this.loginPasswd = inputPasswd.value;
    console.log(this.loginPasswd);
  }
}
