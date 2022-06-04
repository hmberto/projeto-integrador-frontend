import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../products/product.service';
import { filter } from 'rxjs-compat/operator/filter';

@Component({
  selector: 'app-add-to-bag',
  templateUrl: './add-to-bag.component.html',
  styleUrls: ['./add-to-bag.component.css']
})
export class AddToBagComponent implements OnInit, OnDestroy {
  newItemsFilter: Product[] = [];

  product: Product;
  subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(params => {
      const id = params['id'];
      const pharmacy = params['pharmacy'];
      this.product = this.getProduct(id, pharmacy);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProduct(id: string, pharmacy: string): Product {
    return this.productService.gettedProducts.find(product => product.id === id && product.pharmacy === pharmacy);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('pesquisa');
    
    if(myParam != null) {
      this.router.navigate(['pesquisar'], { queryParams: { pesquisa: myParam } });
    }
    else {
      this.router.navigate(['produtos']);
    }
  }

  getItems() {
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
