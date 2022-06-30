import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Product } from '../../../models/product';

@Injectable()
export class PharmacyService {
  products: Product[] = [];
  pharmacyName: string = '';
  pharmacyImg: string = '';

  constructor(private apiService: ApiService) { }

  getProducts(url: string) {
    this.apiService.get(url).then((object: any) => {
      this.pharmacyImg = object.pharmacyImage;
      this.pharmacyName = object.pharmacyName;

      const array = Object.keys(object.products)
        .map((key) => {
            return object.products[key];
        });

      const loading = (<HTMLSelectElement>document.getElementById('loading'));
      const container = (<HTMLSelectElement>document.getElementById('container'));

      loading.classList.add("class-hide");
      loading.classList.remove("class-flex");
      container.classList.remove("class-hide");

      this.products = <Product[]>array;
    }).catch(() => {
      this.showLocationNotFound();
    });
  }

  showLocationNotFound() {
    const notLocation = (<HTMLSelectElement>document.getElementById('not-location'));
    const container = (<HTMLSelectElement>document.getElementById('container'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));

    notLocation.classList.remove("class-hide");
    notLocation.classList.add("class-flex");

    container.classList.remove("class-flex");
    container.classList.add("class-hide");

    loading.classList.remove("class-flex");
    loading.classList.add("class-hide");
  }
}
