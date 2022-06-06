import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Injectable()
export class NewCartService {

  private isUserAuthenticated: boolean = false;

  displayMenu = new EventEmitter<boolean>();

  constructor(private cartService: CartService) { }

  get userAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }
}
