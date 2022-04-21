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
    const session = window.localStorage.getItem("session");

    const userCep = window.localStorage.getItem("userCep");

    const latitude = window.localStorage.getItem("latitude");
    const longitude = window.localStorage.getItem("longitude");

    if(latitude != null && latitude != "null" && longitude != null && longitude != "null") {
      const url = "https://projeto-integrador-products.herokuapp.com/product/all-products/20/" + latitude + "/" + longitude;
      this.productService.getProducts(url);
    }
    else if(userCep != null && userCep != "null") {
      this.productService.getByCep();
    }
    else if(session != null && session != "null") {
      const url = "https://projeto-integrador-products.herokuapp.com/product/all-products/20/" + session;
      this.productService.getProducts(url);
    }
    else {
      this.productService.showLocationNotFound();
    }
  }

  getProducts(url) {
    this.productService.getProducts(url);
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
