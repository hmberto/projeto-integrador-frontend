import { Injectable, EventEmitter } from '@angular/core';
import { Pharmacy } from '../../models/pharmacy';

@Injectable()
export class HomeService {
  gettedPharmacies: Pharmacy[] = [];

  getPharmacies(url) {
    const contaiver = (<HTMLSelectElement>document.getElementById('container'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));
    const askcep = (<HTMLSelectElement>document.getElementById('askcep'));

    contaiver.classList.add("class-hide");
    contaiver.classList.remove("class-flex");
    askcep.classList.add("class-hide");
    askcep.classList.remove("class-flex");

    loading.classList.add("class-flex");
    loading.classList.remove("class-hide");

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();

    xhttp.addEventListener('loadend', () => {
      const json = JSON.parse(xhttp.response);
      const pharmaciesCounter = Object.keys(json);

      this.gettedPharmacies = [];

      pharmaciesCounter.forEach(function(product) {
        const item: Pharmacy = {
          name: json[product]['name'],
          image: "assets/pharmacies/" + json[product]['imgpath'],
          distance: json[product]['distance'],
          time: json[product]['time'],
          tax: json[product]['fee']
        }

        handleEvent(<any>item);
      });

      contaiver.classList.remove("class-hide");
      askcep.classList.add("class-hide");
      askcep.classList.remove("class-flex");
      loading.classList.remove("class-flex");
      loading.classList.add("class-hide");
    });

    let handleEvent = (newPharmacy: Pharmacy) => {
      this.gettedPharmacies.push(newPharmacy);
    }
  }

  askForCep() {
    const askcep = (<HTMLSelectElement>document.getElementById('askcep'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));
    
    askcep.classList.remove("class-hide");
    askcep.classList.add("class-flex");

    loading.classList.remove("class-flex");
    loading.classList.add("class-hide");
  }

  getByCep() {
    let cep = "";
    const userCep = window.localStorage.getItem("userCep");
    if(userCep != null && userCep != "null") {
      cep = userCep;
    }
    else {
      const cepfield = (<HTMLSelectElement>document.getElementById('cepfield'));
      cep = cepfield.value;
    }
    const url = "https://viacep.com.br/ws/" + cep + "/json/";
    
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

        window.localStorage.setItem("userCep", cep);

        const url = "https://projeto-integrador-pharmacy.herokuapp.com/pharmacy/home/20/" + street + "/" + district + "/" + state + "/" + city;
        this.getPharmacies(url);
      }
    });
  }
}
