import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';

@Injectable()
export class ProductService {
  gettedProducts: Product[] = [];

  getProducts() {
    this.gettedProducts = [];
    const contaiver = (<HTMLSelectElement>document.getElementById('box-products'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));

    const url = "https://projeto-integrador-products.herokuapp.com/product/all-pharmacies/20/6NTYW45C32EJ44GWDNSGSQCIECHB4NXHODWT2GF1TKSLL8QD6J1NVXLOGTPO75C2CO2PQNA52ZRQQIR84BFN9ZE7P69BNCCGVDOK";
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();

    xhttp.addEventListener('loadend', () => {
      const json = JSON.parse(xhttp.response);
      const pharmaciesCounter = Object.keys(json);

      for(let i = 0; i < pharmaciesCounter.length; i++) {
        const pharmacies = json[pharmaciesCounter[i]];
        const productsCounter = Object.keys(pharmacies);

        productsCounter.forEach(function(product) {
          const item: Product = {
            id: pharmacies[product]['id'],
            name: pharmacies[product]['name'],
            pharmacy: pharmacies[product]['pharmacy'],
            price: pharmacies[product]['price'],
            amount: pharmacies[product]['amount'],
            quantity: 0,
            image: pharmacies[product]['image'],
            description: pharmacies[product]['description']
          }

          handleEvent(<any>item);
        });
      }

      contaiver.classList.remove("class-hide");

      loading.classList.remove("class-flex");
      loading.classList.add("class-hide");
    });

    let handleEvent = (newProduct: Product) => {
      this.gettedProducts.push(newProduct);
    }
  }
}
