import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  isLogged: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('user_login_uid')){
      this.isLogged = true;
    }
  }

}
