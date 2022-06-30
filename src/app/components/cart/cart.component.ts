import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private router: Router,
    private cartService: CartService) {}

  ngOnInit() {
    this.showEmptycart();
  }

  showEmptycart() {
    const emptyCart = (<HTMLSelectElement>document.getElementsByClassName("empty-cart"));
    const container = (<HTMLSelectElement>document.getElementById("container"));

    if(this.cartService.cartTotal() == "0.00") {
      emptyCart[0].classList.remove("hide-empty-box");
      container.classList.add("hide-empty-box");
    }
    else {
      container.classList.remove("hide-empty-box");
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
    return this.cartService.cartTotal().toString().replace(".", ",");
  }
  
  get getCart(): Product[] {
    let uniqueProducts: { [id: string]: Product } = {};

    const products = this.cartService.getItems();    
    products.forEach(product => {
      let newQuantity = products.filter((_) => _.id === product.id).length;
      product.qnt = newQuantity.toString();
      uniqueProducts[product.id] = product;
    });

    return Object.keys(uniqueProducts)
      .map(id => uniqueProducts[id])
      .sort((x, y) => parseInt(x.id) - parseInt(y.id));
  }

  goCheckout() {
    const session = window.localStorage.getItem("session");
    if(!session) {
      this.router.navigate(['login'], { queryParams: { checkout: 'true' } });
    }
    else {
      this.router.navigate(['checkout']);
    }
  }
}
