import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private router: Router,
    private cartService: CartService) { }

  newPrice = [];
  newItems = [];

  ngOnInit() {
    this.showEmptycart();
  }

  showEmptycart() {
    const emptyCart = (<HTMLSelectElement>document.getElementsByClassName("empty-cart"));
    const total = (<HTMLSelectElement>document.getElementsByClassName("price"));
    if(this.cartService.cartTotal() == "0.00") {
      emptyCart[0].classList.remove("hide-empty-box");
      total[0].classList.add("hide-empty-box");
      total[1].classList.add("hide-empty-box");
    }
    else {
      total[0].classList.remove("hide-empty-box");
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);

    this.showEmptycart();
  }

  clearCart() {
    this.cartService.clearCart();

    this.showEmptycart();
  }
  
  get cartTotal() {
    this.newPrice = [];
    this.newPrice.push(this.cartService.cartTotal().toString().replace(".", ","));
    return this.newPrice;
  }
  
  get getCart(): Product[] {
    this.newItems = [];
    for(let i = 0; i < this.cartService.items.length; i++) {
      if(this.newItems.filter((product) => product.id === this.cartService.items[i]['id']).length < 1) {
        let qnt = this.cartService.items.filter((product) => product.id === this.cartService.items[i]['id']).length;
        this.cartService.items[i].qnt = qnt + "";
        this.newItems.push(this.cartService.items[i]);
      }
    }
    
    this.newItems.sort(function (x, y) {
      return x.id - y.id;
    });
    return this.newItems;
  }

  goCheckout() {
    const session = window.localStorage.getItem("session");
    if(session != null && session != "null") {
      this.router.navigate(['checkout']);
    }
    else {
      this.router.navigate(['login'], { queryParams: { checkout: 'true' } });
    }
  }
}
