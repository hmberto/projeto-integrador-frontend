import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Deliveryman } from '../../models/deliveryman';


@Injectable()
export class LoginDeliverymanService {

  private isUserAuthenticated: boolean = false;

  displayMenu = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) { }

  async makeLogin(deliveryman: Deliveryman) {
    const notfication = (<HTMLSelectElement>document.getElementById('div-not'));
    const notficationText = (<HTMLSelectElement>document.getElementById('notification'));
    notfication.classList.add("hide-div-not");

    if(deliveryman.cpf.length >= 15) {
      notficationText.innerText="CPF MUITO GRANDE";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    if(deliveryman.cpf.length < 11) {
      notficationText.innerText="CPF MUITO PEQUENO";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    if(deliveryman.cpf.length >= 12) {
      if(deliveryman.cpf.length <= 13) {
        notficationText.innerText="CPF INVÁLIDO";
        notfication.classList.remove("hide-div-not");
        return false;
      }
    }

    var re = /^[0-9]+?$/i;
    let cpf1Regex = re.test(deliveryman.cpf);
    if(deliveryman.cpf.length == 11 && !cpf1Regex) {
      notficationText.innerText="CPF INVÁLIDO";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    var re = /^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}?$/i;
    let cpf2Regex = re.test(deliveryman.cpf);
    if(deliveryman.cpf.length == 14 && !cpf2Regex) {
      notficationText.innerText="CPF INVÁLIDO";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    if(deliveryman.cpf == undefined || deliveryman.cpf == "") {
      notficationText.innerText="PREENCHA TODOS OS CAMPOS";
      notfication.classList.remove("hide-div-not");
      return;
    }

    if(deliveryman.cpf.length <= 10) {
      notficationText.innerText="CPF MUITO PEQUENO";
      notfication.classList.remove("hide-div-not");
      return;
    }
    console.log(deliveryman.cpf)
    const container = (<HTMLSelectElement>document.getElementById('container'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));

    container.classList.remove("class-flex");
    container.classList.add("class-hide");

    loading.classList.add("class-flex");
    loading.classList.remove("class-hide");

    const usuario = (<HTMLSelectElement>document.getElementById('usuario'));
    const senha = (<HTMLSelectElement>document.getElementById('senha'));
    const btnLogin = (<HTMLSelectElement>document.getElementById('btn-login'));
    usuario.disabled = true;
    senha.disabled = true;
    btnLogin.disabled = true;

    var newLogin = window.localStorage.getItem("newLogin");
    if(newLogin == "false") {
      newLogin = "false";
    }
    else {
      newLogin = "true"
    }

    const loginEndPoint = 'https://projeto-integrador-user.herokuapp.com/user/login';
    const body = JSON.stringify({
      cpf: deliveryman.name
    });
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", loginEndPoint, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(body);

    xhttp.addEventListener('loadend', () => {
      if(xhttp.status == 200) {
        let session = JSON.parse(xhttp.response);

        window.localStorage.setItem("session", session['session']);
        window.localStorage.setItem("newLogin", "false");

        const urlParams = new URLSearchParams(window.location.search);
        const checkout = urlParams.get('checkout');
        const orderId = urlParams.get('orderId');
        const pedidos = urlParams.get('pedidos');
        if(checkout == "true") {
          this.router.navigate(['checkout']);
        }
        else if(orderId != "null" && orderId != null) {
          this.router.navigate(['pedido'], { queryParams: { orderId: orderId } });
        }
        else if(pedidos == "true") {
          this.router.navigate(['pedidos']);
        }
        else {
          this.router.navigate(['']);
        }
      }
      else {
        usuario.disabled = false;
        senha.disabled = false;
        btnLogin.disabled = false;

        container.classList.remove("class-hide");
        container.classList.add("class-flex");

        loading.classList.remove("class-flex");
        loading.classList.add("class-hide");

        usuario.focus();

        notficationText.innerText="DADOS INVÁLIDOS";
        notfication.classList.remove("hide-div-not");
      }
    });
  }

  get userAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }

}
