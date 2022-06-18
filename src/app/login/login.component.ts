import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    const session = window.localStorage.getItem("session");
    if(session != null && session != "null") {
      this.router.navigate(['']);
    }

    const userField = document.getElementById("usuario");
    const passField = document.getElementById("senha");
    userField.focus();

    userField.addEventListener('keyup', function(e){
      var key = e.which || e.keyCode;
      if (key == 13) {
        passField.focus();
      }
    });

    let handleEvent = (event: KeyboardEvent) => {
      var key = event.which || event.keyCode;
      if (key == 13) {
        if(!(<HTMLSelectElement>document.getElementById('btn-login')).disabled) {
          this.authService.makeLogin(this.user);
        }
      }
    }
    
    passField.addEventListener('keyup', function(e){
      var key = e.which || e.keyCode;
      if (key == 13) {
        handleEvent(<any>e);
      }
    });
  }

  makeLogin() {
    this.authService.makeLogin(this.user);
  }
}