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
      this.getData(pharmacyId);
    }
  }

  getData(pharmacyId) {
    const notLocation = (<HTMLSelectElement>document.getElementById('not-location'));
    const container = (<HTMLSelectElement>document.getElementById('container'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));

    container.classList.add("class-hide");

    loading.classList.add("class-flex");
    loading.classList.remove("class-hide");

    notLocation.classList.add("class-hide");
    notLocation.classList.remove("class-flex");

    const url = "https://projeto-integrador-pharmacy.herokuapp.com/pharmacy/" + pharmacyId;
    this.pharmacyService.getProducts(url);
  }

  getProducts(url) {
    this.pharmacyService.getProducts(url);
  }

  get pharmacyName() {
    return this.pharmacyService.pharmacyName;
  }

  get pharmacyImg() {
    return this.pharmacyService.pharmacyImg;
  }

  get products(): Product[] {
    return this.pharmacyService.gettedProducts;
  }

  productClick(product: Product): void {
    this.router.navigate(['adicionar'], { queryParams: { id: product.id, pharmacyId: product.pharmacyId, pharmacy: product.pharmacy, pharmacyPage: true } });
  }
}