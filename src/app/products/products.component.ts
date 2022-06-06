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
  product: Product;
  constructor(private router: Router,
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
    const contaiver = (<HTMLSelectElement>document.getElementById('box-products'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));

    contaiver.classList.add("class-hide");

    loading.classList.add("class-flex");
    loading.classList.remove("class-hide");

    notLocation.classList.add("class-hide");
    notLocation.classList.remove("class-flex");

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
    return this.productService.gettedProducts.filter((product) => product.pharmacy === 'Drogaria São Paulo' && product.pharmacyId === '14');
  }

  get ultrafarmaProducts(): Product[] {
    return this.productService.gettedProducts.filter(product => product.pharmacy === 'Ultrafarma' && product.pharmacyId === '24');
  }

  get pagueMenosProducts(): Product[] {
    return this.productService.gettedProducts.filter(product => product.pharmacy === 'Pague Menos' && product.pharmacyId === '34');
  }

  get drogaRaiaProducts(): Product[] {
    return this.productService.gettedProducts.filter(product => product.pharmacy === 'Droga Raia' && product.pharmacyId === '4');
  }

  productClick(product: Product): void {
    this.router.navigate(['adicionar'], { queryParams: { id: product.id, pharmacyId: product.pharmacyId, pharmacy: product.pharmacy, pharmacyPage: false } });
  }

  seePharmacy(product: Product): void {
    this.router.navigate(['farmacia'], { queryParams: { id: product[0].pharmacyId } });
  }
}
