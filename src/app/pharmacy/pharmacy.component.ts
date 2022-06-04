import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { PharmacyService } from './pharmacy.service';

@Component({
  selector: 'app-products',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {
  product: Product;
  constructor(private router: Router,
    private pharmacyService: PharmacyService) { }

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
    const urlParams = new URLSearchParams(window.location.search);
    const pharmacyId = urlParams.get('id');
    if(pharmacyId == null || pharmacyId == "null" || pharmacyId == "") {
      this.router.navigate(['']);
    }
    else {
      this.getData();
    }
  }

  getData() {
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

    if(session != null && session != "null") {
      const url = "https://projeto-integrador-products.herokuapp.com/product/all-products/20/" + session;
      this.pharmacyService.getProducts(url);
    }
    else if(latitude != null && latitude != "null" && longitude != null && longitude != "null") {
      const url = "https://projeto-integrador-products.herokuapp.com/product/all-products/20/" + latitude + "/" + longitude;
      this.pharmacyService.getProducts(url);
    }
    else if(userCep != null && userCep != "null") {
      this.pharmacyService.getByCep();
    }
    else {
      this.pharmacyService.showLocationNotFound();
    }
  }

  getProducts(url) {
    this.pharmacyService.getProducts(url);
  }

  get drogariaSpProducts(): Product[] {
    return this.pharmacyService.gettedProducts.filter((product) => product.pharmacy === 'Drogaria São Paulo');
  }

  get ultrafarmaProducts(): Product[] {
    return this.pharmacyService.gettedProducts.filter(product => product.pharmacy === 'Ultrafarma');
  }

  get pagueMenosProducts(): Product[] {
    return this.pharmacyService.gettedProducts.filter(product => product.pharmacy === 'Pague Menos');
  }

  get drogaRaiaProducts(): Product[] {
    return this.pharmacyService.gettedProducts.filter(product => product.pharmacy === 'Droga Raia');
  }

  productClick(product: Product): void {
    this.router.navigate(['adicionar'], { queryParams: { id: product.id, pharmacy: product.pharmacy } });
  }
}