import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';

@Injectable()
export class ProductService {
  gettedProducts: Product[] = [];

  getProducts(url) {
    this.gettedProducts = [];
    const container = (<HTMLSelectElement>document.getElementById('container'));
    const notLocation = (<HTMLSelectElement>document.getElementById('not-location'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();

    xhttp.addEventListener('loadend', () => {
      if(xhttp.status == 200) {
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
              pharmacyId: pharmacies[product]['pharmacyId'],
              price: pharmacies[product]['price'],
              amount: pharmacies[product]['amount'],
              image: pharmacies[product]['image'],
              description: pharmacies[product]['description'],
              qnt: "0"
            }

            handleEvent(<any>item);
          });
        }

        container.classList.remove("class-hide");

        loading.classList.remove("class-flex");
        loading.classList.add("class-hide");
      }
      else {
        this.showLocationNotFound();
      }
    });

    let handleEvent = (newProduct: Product) => {
      this.gettedProducts.push(newProduct);
    }
  }

  getByCep() {
    const userCep = window.localStorage.getItem("userCep");

    const url = "https://viacep.com.br/ws/" + userCep + "/json/";
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();

    xhttp.addEventListener('loadend', () => {
      var endereco = JSON.parse(xhttp.response);
      if(endereco['cep'] != undefined) {
        const address = JSON.parse(xhttp.response);
        
        let street = address['logradouro'];
        let district = address['bairro'];
        let state = address['uf'];
        let city = address['localidade'];

        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('pesquisa');

        let urlP = "https://projeto-integrador-products.herokuapp.com/product/all-products/20/" + street + "/" + district + "/" + state + "/" + city;
        if(myParam != null) {
          urlP = "https://projeto-integrador-products.herokuapp.com/product/search/20/" + street + "/" + district + "/" + state + "/" + city + "/" + myParam;
        }

        this.getProducts(urlP);
      }
      else {
        this.showLocationNotFound()
      }
    });
  }

  showLocationNotFound() {
    const notLocation = (<HTMLSelectElement>document.getElementById('not-location'));
    const contaiver = (<HTMLSelectElement>document.getElementById('box-products'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));

    notLocation.classList.remove("class-hide");
    notLocation.classList.add("class-flex");

    contaiver.classList.remove("class-flex");
    contaiver.classList.add("class-hide");

    loading.classList.remove("class-flex");
    loading.classList.add("class-hide");
  }
}
