import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class OrderService {

  private isUserAuthenticated: boolean = false;

  displayMenu = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  get userAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }
}
