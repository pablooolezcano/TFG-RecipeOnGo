import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent  implements OnInit {

  registerName : string = "";
  registerEmail: string = "";
  registerPasswd : string = "";
  constructor() { }

  ngOnInit() {}

  register(){
    let inputName = document.getElementById("register-name") as HTMLInputElement;
    this.registerName = inputName.value;
    console.log(this.registerName);

    let inputEmail = document.getElementById("register-email") as HTMLInputElement;
    this.registerEmail = inputEmail.value;
    console.log(this.registerEmail);

    let inputPasswd = document.getElementById("register-passwd") as HTMLInputElement;
    this.registerPasswd = inputPasswd.value;
    console.log(this.registerPasswd);
  }

}
