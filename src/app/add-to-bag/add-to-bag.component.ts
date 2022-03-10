import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { PRODUCTS } from '../../mock/products-mock';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-to-bag',
  templateUrl: './add-to-bag.component.html',
  styleUrls: ['./add-to-bag.component.css']
})
export class AddToBagComponent implements OnInit, OnDestroy {
  product: Product;
  subscription: Subscription;

  products = PRODUCTS;

  constructor(private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(params => {
      const id = params['id'];
      this.product = this.getProduct(id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProduct(id: string): Product {
    return this.products.find(product => product.id === id);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Seu produto foi adicionado no carrinho. Continue comprando mais produtos e aproveitando os melhores preços');
    this.router.navigate(['products']);
  }

  cancelButton(): void {
    this.router.navigate(['products']);
  }
}
