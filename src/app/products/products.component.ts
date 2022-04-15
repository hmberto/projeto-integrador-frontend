import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts();
  }

  get drogariaSpProducts(): Product[] {
    return this.productService.gettedProducts.filter((product) => product.pharmacy === 'Drogaria São Paulo');
  }

  get ultrafarmaProducts(): Product[] {
    return this.productService.gettedProducts.filter(product => product.pharmacy === 'Ultrafarma');
  }

  get pagueMenosProducts(): Product[] {
    return this.productService.gettedProducts.filter(product => product.pharmacy === 'Pague Menos');
  }

  get drogaRaiaProducts(): Product[] {
    return this.productService.gettedProducts.filter(product => product.pharmacy === 'Droga Raia');
  }

  productClick(product: Product): void {
    this.router.navigate(['adicionar'], { queryParams: { id: product.id } });
  }
}
