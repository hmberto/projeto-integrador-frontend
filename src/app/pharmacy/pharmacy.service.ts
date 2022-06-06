import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';

@Injectable()
export class PharmacyService {
  gettedProducts: Product[] = [];
  pharmacyName = [];
  pharmacyImg = [];

  imgColor(imgPath) {
    let handleEventColorHex = (c) => {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    const banner = (<HTMLSelectElement>document.getElementById('max-width-banner'));

    var corMaisComum = null;
    var frequenciaCorMaisComum = 0;

    var img = new Image();
    img.src = imgPath;
    img.style.display = "none";
    img.onload = function() {
      document.body.append(img)
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var context = canvas.getContext('2d');

      context.drawImage(img, 0, 0);

      var map = context.getImageData(0, 0, img.width, img.height).data;

      var hex, r,g,b;
      var histograma = {};
      for (var i = 0, len = map.length; i < len; i += 4) {
        r = 5 * (Math.round(map[i] / 5));
        g = 5 * (Math.round(map[i+1] / 5));
        b = 5 * (Math.round(map[i+2] / 5));
    
        hex = "#" + handleEventColorHex(r) + handleEventColorHex(g) + handleEventColorHex(b);
    
        if (histograma[hex] === undefined) {
            histograma[hex] = 1;
        } else {
            histograma[hex]++;
        }
      }

      for (var cor in histograma) {
        if (frequenciaCorMaisComum < histograma[cor]) {
          corMaisComum = cor;
          frequenciaCorMaisComum = histograma[cor];
        }
      }

      banner.style.backgroundColor = corMaisComum;
      console.log(corMaisComum);
    };
  }
  
  getProducts(url) {
    const container = (<HTMLSelectElement>document.getElementById('container'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();

    xhttp.addEventListener('loadend', () => {
      this.gettedProducts = [];
      this.pharmacyName = [];
      this.pharmacyImg = [];
      if(xhttp.status == 200) {
        const json = JSON.parse(xhttp.response);

        this.pharmacyImg.push(json['pharmacyImage']);
        this.pharmacyName.push(json['pharmacyName']);

        const pharmacies = json['products'];
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
