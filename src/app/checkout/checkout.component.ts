import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from './checkout.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-cart',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private appComponent: AppComponent,
    private router: Router,
    private cartService: CartService,
    private checkoutService: CheckoutService) { }

  newPrice = [];
  newItems = [];
  itemsId = [];

  ngOnInit() {
    const session = window.localStorage.getItem("session");
    if(session == null || session == "null") {
      this.router.navigate(['login'], { queryParams: { checkout: 'true' } });
    }

    this.appComponent.updateNav();

    this.validateCartDB();

    this.showEmptycart();

    this.cardData();
  }

  cardData() {
    const cardNumber = (<HTMLSelectElement>document.getElementById("cardNumber"));
    cardNumber.value="5523 3652 3698 6989"

    const cardName = (<HTMLSelectElement>document.getElementById("cardName"));
    cardName.value="Usuário Teste"

    const cardDate = (<HTMLSelectElement>document.getElementById("cardDate"));
    cardDate.value="08/28"

    const cardCvv = (<HTMLSelectElement>document.getElementById("cardCvv"));
    cardCvv.value="326"

    const cardDoc = (<HTMLSelectElement>document.getElementById("cardDoc"));
    cardDoc.value="233.155.236-85"

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

  validateCartDB() {
    this.itemsId = [];
    let pharmacyName = "";
    for(let i = 0; i < this.cartService.items.length; i++) {
      if(this.itemsId.includes(this.cartService.items[i].id)) {}
      else {
        this.itemsId.push(this.cartService.items[i].id);
        pharmacyName = this.cartService.items[i].pharmacy;
      }
    }

    this.checkoutService.validateCartDB(this.itemsId, pharmacyName);
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

  goBack() {
    this.router.navigate(['carrinho']);
  }

  goCheckout() {
    const cardNumber = (<HTMLSelectElement>document.getElementById("cardNumber")).value;
    const cardName = (<HTMLSelectElement>document.getElementById("cardName")).value;
    const cardDate = (<HTMLSelectElement>document.getElementById("cardDate")).value;
    const cardCvv = (<HTMLSelectElement>document.getElementById("cardCvv")).value;
    const cardDoc = (<HTMLSelectElement>document.getElementById("cardDoc")).value;

    // this.router.navigate(['checkout']);
  }
}
