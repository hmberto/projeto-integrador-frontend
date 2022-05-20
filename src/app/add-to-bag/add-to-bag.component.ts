import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-add-to-bag',
  templateUrl: './add-to-bag.component.html',
  styleUrls: ['./add-to-bag.component.css']
})
export class AddToBagComponent implements OnInit, OnDestroy {
  product: Product;
  subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private productService: ProductService) { }

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
    return this.productService.gettedProducts.find(product => product.id === id);
  }

  addToCart(product: Product) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('pesquisa');
    
    if(myParam != null) {
      this.router.navigate(['pesquisar'], { queryParams: { pesquisa: myParam } });
    }
    else {
      this.cartService.addToCart(product);
      this.router.navigate(['produtos']);
    }
  }

  getItems() {
    // console.log(this.cartService.getItems());
  }

  cancelButton(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('pesquisa');

    if(myParam != null) {
      this.router.navigate(['pesquisar'], { queryParams: { pesquisa: myParam } });
    }
    else {
      this.router.navigate(['produtos']);
    }
  }
}
