import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { PRODUCTS } from '../../mock/products-mock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = PRODUCTS;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get drogariaSpProducts(): Product[] {
    return this.products.filter((product) => product.pharmacy === 'Drogaria São Paulo');
  }

  get ultrafarmaProducts(): Product[] {
    return this.products.filter(product => product.pharmacy === 'Ultrafarma');
  }

  get pagueMenosProducts(): Product[] {
    return this.products.filter(product => product.pharmacy === 'Pague Menos');
  }

  get drogaRaiaProducts(): Product[] {
    return this.products.filter(product => product.pharmacy === 'Droga Raia');
  }

  productClick(product: Product): void {
    this.router.navigate(['adicionar'], { queryParams: { id: product.id } });
  }
}
