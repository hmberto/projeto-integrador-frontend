import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';

@Injectable()
export class CheckoutService {

  private isUserAuthenticated: boolean = false;

  displayMenu = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  checkedProducts = [];

  validateCartDB(productsIds, pharmacyName) {
    const url = "https://projeto-integrador-myorder.herokuapp.com/validate";
    const body = JSON.stringify({
      products: productsIds,
      session: window.localStorage.getItem("session"),
      distance: "20",
      pharmacyName: pharmacyName
    });

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(body);

    xhttp.addEventListener('loadend', () => {
      if(xhttp.status == 200) {
        let handleEventUserAddress = (cep, numero, complemento, check) => {
          this.getAddress(cep, numero, complemento, check);
        }

        let resp = JSON.parse(xhttp.response);

        handleEventUserAddress(<any>resp['user']['cep'], <any>resp['user']['numero'], <any>resp['user']['complemento'], <any>0);
        handleEventUserAddress(<any>resp[pharmacyName]['cep'], <any>resp[pharmacyName]['numero'], <any>resp[pharmacyName]['complemento'], <any>1);

        const productsCounter = Object.keys(resp["products"]);

        let handleEvent = (product) => {
          this.checkedProducts.push(resp["products"][product]);
        }

        productsCounter.forEach(function(product) {
          handleEvent(<any>product);
        });

        const farmacyName = (<HTMLSelectElement>document.getElementById("farmacyName"));
        farmacyName.textContent =pharmacyName;

        const pharmacyDistance = (<HTMLSelectElement>document.getElementById("pharmacyDistance"));
        pharmacyDistance.textContent =resp[pharmacyName]['distancia'] + " - ";

        const deliveryFee = (<HTMLSelectElement>document.getElementById("deliveryFee"));
        const fee2 = (<HTMLSelectElement>document.getElementById("fee2"));
        deliveryFee.textContent =resp[pharmacyName]['fee'];
        fee2.textContent ="Entrega: " + resp[pharmacyName]['fee'];

        const deliveryTime = (<HTMLSelectElement>document.getElementById("deliveryTime"));
        deliveryTime.textContent =resp[pharmacyName]['time'] + " - ";

        const totalPrice = (<HTMLSelectElement>document.getElementById("totalPrice"));
        const totalProducts = (<HTMLSelectElement>document.getElementById("totalProducts"));

        const totalProductsValue = totalProducts.textContent.replace("Total Produtos: R$ ", "").replace(",", ".");
        const fee2Value = fee2.textContent.replace("Entrega: R$ ", "").replace(",", ".");

        let newString = "Total: R$ " + Math.round((parseFloat(totalProductsValue) + parseFloat(fee2Value)) * 100) / 100;

        totalPrice.textContent=newString.replace(".", ",");

        const loadingAddress = (<HTMLSelectElement>document.getElementById("loadingAddress"));
        const loadingTotal = (<HTMLSelectElement>document.getElementById("loadingTotal"));
        const deliveryInfo = (<HTMLSelectElement>document.getElementById("deliveryInfo"));
        const detalhes = (<HTMLSelectElement>document.getElementById("detalhes"));

        loadingAddress.classList.remove("class-flex");
        loadingAddress.classList.add("class-hide");

        loadingTotal.classList.remove("class-flex");
        loadingTotal.classList.add("class-hide");

        deliveryInfo.classList.remove("class-hide");
        detalhes.classList.remove("class-hide");

        const checkout = (<HTMLSelectElement>document.getElementById("checkout"));
        checkout.disabled=false;

        localStorage.setItem("pharmacyCnpj", resp[pharmacyName]['pharmacyCnpj']);
        localStorage.setItem("pharmacyId", resp[pharmacyName]['pharmacyId']);
      }
      else {
        window.localStorage.setItem("session", null);
        this.router.navigate(['login'], { queryParams: { checkout: 'true' } });
      }
    });
  }

  getAddress(cep, numero, complemento, check) {
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
        let newCep = address['cep'];

        let newAddress = street + ", " + numero + " - " + complemento + " - " + district + ", " + city + " - " + state + ", " + newCep;
        if(complemento == "" || complemento == "NULL") {
          newAddress = street + ", " + numero + " - " + district + ", " + city + " - " + state + ", " + newCep;
        }

        if(check == 0) {
          const userAddress = (<HTMLSelectElement>document.getElementById("userAddress"));
          userAddress.textContent =newAddress;
        }
        else if(check == 1) {
          const pharmacyAddress = (<HTMLSelectElement>document.getElementById("pharmacyAddress"));
          pharmacyAddress.textContent =newAddress;
        }
      }
    });
  }

  get userAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }
}
