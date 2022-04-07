import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  
  addToCart(newProduct: Product) {
    let qnt = this.items.filter((product) => product.id === newProduct.id).length;
    if(qnt < 10 && this.items.length + 1 <= 20) {
      this.items.push(newProduct);
    }
  }

  removeFromCart(product: Product) {
    this.items.splice(this.items.indexOf(product), 1);
  }

  getItems() {
      return this.items;
  }

  clearCart() {
      this.items = [];
      return this.items;
  }

  cartTotal() {
    let price = 0;
    for(let i = 0; i < this.items.length; i++) {
      let rep1 = this.items[i]['price'].replace("R$ ", "");
      let rep2 = rep1.replace(",", ".");

      price = price + parseFloat(rep2);
    }
    return price.toFixed(2);
  }
}
