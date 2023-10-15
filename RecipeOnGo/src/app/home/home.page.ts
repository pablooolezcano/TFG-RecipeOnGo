import { Component } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isLogged: boolean = false;
  constructor(private router: Router) { }

  ionViewWillEnter(){
    if(localStorage.getItem('user_login_uid')){
      this.isLogged = true;
    }
  }

  ngOnInit() {
    
  }

}
