import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) { }

  newPrice = [];

  ngOnInit() {
    this.showEmptycart();
  }

  showEmptycart() {
    const emptyCart = (<HTMLSelectElement>document.getElementsByClassName("empty-cart"));
    const total = (<HTMLSelectElement>document.getElementsByClassName("price"));
    if(this.cartService.cartTotal() == "0.00") {
      emptyCart[0].classList.remove("hide-empty-box");
      total[0].classList.add("hide-empty-box");
    }
    else {
      total[0].classList.remove("hide-empty-box");
    }
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);

    this.showEmptycart();
  }
  
  get cartTotal() {
    this.newPrice = [];
    this.newPrice.push(this.cartService.cartTotal().toString().replace(".", ","));
    return this.newPrice;
  }
  
  get getCart(): Product[] {
    return this.cartService.getItems();
  }
}
