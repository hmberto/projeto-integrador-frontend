import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../models/user';


@Injectable()
export class AuthService {

  private isUserAuthenticated: boolean = false;

  displayMenu = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) { }

  async makeLogin(user: User) {
    var newLogin = window.localStorage.getItem("newLogin");
    if(newLogin == "false") {
      newLogin = "false";
    }
    else {
      newLogin = "true"
    }

    const loginEndPoint = 'https://pharmacy-delivery.herokuapp.com/client/login';
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    const body = JSON.stringify({
      email: user.name,
      pass: user.password,
      newLogin: newLogin
    });
    
    const response = await this.http.post(loginEndPoint, body, {headers: headers}).toPromise();

    let session = response['session'];

    if(session.length == 100) {
      window.localStorage.setItem("session", session);
      window.localStorage.setItem("newLogin", "false");
      window.location.replace("/");
    }

    if (user.name === 'test@test.com' && user.password === '123456') {
      this.isUserAuthenticated = true;

      this.displayMenu.emit(true);

      this.router.navigate(['/']);

    } else {
      this.isUserAuthenticated = false;

      this.displayMenu.emit(false);
    }
  }

  get userAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }

}
