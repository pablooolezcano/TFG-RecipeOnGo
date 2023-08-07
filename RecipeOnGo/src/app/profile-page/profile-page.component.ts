import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    //esto tengo que ponerlo en el ngOnInit de ionic, y en los demás igual
    if(!localStorage.getItem('user_login_uid')){
      this.router.navigateByUrl("/login");
    }
  }

  logOut(){
    localStorage.removeItem('user_login_uid');
    this.router.navigateByUrl("/home");
  }

  changePassword(){

  }
}
