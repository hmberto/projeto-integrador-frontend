import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../models/product';
import { ProductService } from '../products/product.service';
import { PharmacyService } from '../pharmacy/pharmacy.service';

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
    private productService: ProductService,
    private pharmacyService: PharmacyService) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(params => {
      const id = params['id'];
      const pharmacy = params['pharmacy'];
      const pharmacyId = params['pharmacyId'];
      const pharmacyPage = params['pharmacyPage'];
      this.product = this.getProduct(id, pharmacy, pharmacyId, pharmacyPage);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProduct(id: string, pharmacy: string, pharmacyId: string, pharmacyPage: string): Product {
    const productA = this.productService.products.find(product => product.id === id && product.pharmacy === pharmacy && product.pharmacyId === pharmacyId);
    const productB = this.pharmacyService.products.find(product => product.id === id && product.pharmacy === pharmacy && product.pharmacyId === pharmacyId);
    if(productA != undefined) {
      return productA;
    }
    else if(productB != undefined) {
      return productB;
    }
    else {
      if(pharmacyPage == "true") {
        this.router.navigate(['farmacia'], { queryParams: { id: pharmacyId } });
      }
      else {
        this.router.navigate(['produtos']);
      }
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);

    const urlParams = new URLSearchParams(window.location.search);
    const pesquisa = urlParams.get('pesquisa');
    const pharmacyPage = urlParams.get('pharmacyPage');

    if(pesquisa != null) {
      this.router.navigate(['pesquisar'], { queryParams: { pesquisa: pesquisa } });
    }
    else if(pharmacyPage == "true") {
      this.router.navigate(['farmacia'], { queryParams: { id: product.pharmacyId } });
    }
    else {
      this.router.navigate(['produtos']);
    }
  }

  cancelButton(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('pesquisa');
    const pharmacyPage = urlParams.get('pharmacyPage');
    const pharmacyId = urlParams.get('pharmacyId');

    if(myParam != null) {
      this.router.navigate(['pesquisar'], { queryParams: { pesquisa: myParam } });
    }
    else if(pharmacyPage == "true") {
      this.router.navigate(['farmacia'], { queryParams: { id: pharmacyId } });
    }
    else {
      this.router.navigate(['produtos']);
    }
  }
}
