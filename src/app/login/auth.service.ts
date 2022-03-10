import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';

import { User } from '../../models/user';


@Injectable()
export class AuthService {

  private isUserAuthenticated: boolean = false;

  displayMenu = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  makeLogin(user: User): void {

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
