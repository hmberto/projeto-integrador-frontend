import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { SearchService } from './search.service';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  product: Product;
  constructor(private router: Router,
    private searchService: SearchService,
    private productService: ProductService) { }

  ngOnInit() {
    const latitude = window.localStorage.getItem("latitude");

    this.validate();

    if(latitude == null || latitude == "null") {
      this.geoLocation();
    }
  }

  geoLocation() {
    let validateHome = () => {
      this.validate();
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    function showPosition(position) {
      window.localStorage.setItem("latitude", position.coords.latitude);
      window.localStorage.setItem("longitude", position.coords.longitude);

      validateHome();
    }
  }

  validate() {
    const notLocation = (<HTMLSelectElement>document.getElementById('not-location'));
    const container = (<HTMLSelectElement>document.getElementById('container'));
    const h2name = (<HTMLSelectElement>document.getElementById('search-name'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('pesquisa');
    
    h2name.textContent="Pesquisando por: " + myParam

    container.classList.add("class-hide");

    loading.classList.add("class-flex");
    loading.classList.remove("class-hide");

    notLocation.classList.add("class-hide");
    notLocation.classList.remove("class-flex");

    const session = window.localStorage.getItem("session");

    const userCep = window.localStorage.getItem("userCep");

    const latitude = window.localStorage.getItem("latitude");
    const longitude = window.localStorage.getItem("longitude");

    if(session != null && session != "null") {
      const url = "https://projeto-integrador-products.herokuapp.com/product/search/20/" + session + "/" + myParam;
      this.productService.getProducts(url);
    }
    else if(latitude != null && latitude != "null" && longitude != null && longitude != "null") {
      const url = "https://projeto-integrador-products.herokuapp.com/product/search/20/" + latitude + "/" + longitude + "/" + myParam;
      this.productService.getProducts(url);
    }
    else if(userCep != null && userCep != "null") {
      this.productService.getByCep();
    }
    else {
      this.productService.showLocationNotFound();
    }
  }

  getProducts(url) {
    this.productService.getProducts(url);
  }

  get productsGetted(): Product[] {
    return this.productService.gettedProducts;
  }

  productClick(product: Product): void {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('pesquisa');
    
    this.router.navigate(['adicionar'], { queryParams: { id: product.id, pharmacy: product.pharmacy, pharmacyId: product.pharmacyId, pesquisa: myParam } });
  }
}
