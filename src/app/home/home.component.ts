import { Component } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Pharmacy } from '../../models/pharmacy';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private appComponent: AppComponent,
  private homeService: HomeService) { }

  newPharmacies = [];
  orderPharmacies = [];
  
  ngOnInit() {
    this.appComponent.updateNav();
    this.geoLocation();
    this.validate();
  }

  validate() {
    const session = window.localStorage.getItem("session");

    const userCep = window.localStorage.getItem("userCep");

    // window.localStorage.setItem("latitude", null);
    // window.localStorage.setItem("longitude", null);

    const latitude = window.localStorage.getItem("latitude");
    const longitude = window.localStorage.getItem("longitude");

    if(latitude != null && latitude != "null" && longitude != null && longitude != "null") {
      const url = "https://projeto-integrador-pharmacy.herokuapp.com/pharmacy/home/20/" + latitude + "/" + longitude;
      this.homeService.getPharmacies(url);
    }
    else if(userCep != null && userCep != "null") {
      this.getByCep();
    }
    else if(session != null && session != "null") {
      const url = "https://projeto-integrador-pharmacy.herokuapp.com/pharmacy/home/20/" + session;
      this.homeService.getPharmacies(url);
    }
    else {
      this.homeService.askForCep();

      const cepfield = (<HTMLSelectElement>document.getElementById('cepfield'));

      let getByCep = () => {
        this.getByCep();
      };

      cepfield.addEventListener('keyup', function(e){
        var key = e.which || e.keyCode;

        var re = /^[0-9]{8}?$/i;
        let cep1Regex = re.test(cepfield.value);

        var re = /^[0-9]{5}[-][0-9]{3}?$/i;
        let cep2Regex = re.test(cepfield.value);

        if (key == 13 && cepfield.value.length == 8 && cep1Regex || key == 13 && cepfield.value.length == 9 && cep2Regex) {
          getByCep();
        }
      });

      cepfield.focus();  
    }
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

    if (cep.length == 8 || cep.length == 9) {
      const contaiver = (<HTMLSelectElement>document.getElementById('container'));
      const loading = (<HTMLSelectElement>document.getElementById('loading'));
      const askcep = (<HTMLSelectElement>document.getElementById('askcep'));

      contaiver.classList.add("class-hide");
      contaiver.classList.remove("class-flex");
      askcep.classList.add("class-hide");
      askcep.classList.remove("class-flex");

      loading.classList.add("class-flex");
      loading.classList.remove("class-hide");

      this.homeService.getByCep();
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

  newFilter(t) {
    this.orderPharmacies = [];
    document.getElementById("order-1").classList.remove("order-a");
    document.getElementById("order-1").classList.remove("order-b");
    document.getElementById("order-2").classList.remove("order-a");
    document.getElementById("order-2").classList.remove("order-b");
    document.getElementById("order-4").classList.remove("order-a");
    document.getElementById("order-4").classList.remove("order-b");
    if(t == 1) {
      this.newPharmacies.sort(function (x, y) {
        document.getElementById("order-1").classList.add("order-b");
        return x.random - y.random;
      });
    }
    else if(t == 2) {
      this.orderPharmacies.push(t);
      this.newPharmacies.sort(function (x, y) {
        document.getElementById("order-2").classList.add("order-b");
        return x.orderFee - y.orderFee;
      });
    }
    else if(t == 3) {
      this.orderPharmacies.push(t);
      this.newPharmacies.sort(function (x, y) {
        document.getElementById("order-3").classList.add("order-b");
        return x.orderDistance - y.orderDistance;
      });
    }
    else if(t == 4) {
      this.orderPharmacies.push(t);
      this.newPharmacies.sort(function (x, y) {
        document.getElementById("order-4").classList.add("order-b");
        return x.orderTime - y.orderTime;
      });
    }
  }

  get gettedPharmacies(): Pharmacy[] {
    this.newPharmacies = [];
    for(let i = 0; i < this.homeService.gettedPharmacies.length; i++) {
        this.newPharmacies.push(this.homeService.gettedPharmacies[i]);
    }

    if(this.orderPharmacies[0] != undefined) {
      this.newFilter(this.orderPharmacies[0]);
    }
    else {
      this.newFilter(1);
    }
    
    return this.newPharmacies;
  }
}
