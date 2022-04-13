import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../models/user';


@Injectable()
export class ChangePassService {

  private isUserAuthenticated: boolean = false;

  displayMenu = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) { }

  async requestPass(user: User) {
    const notfication = (<HTMLSelectElement>document.getElementById('div-not'));
    const notficationText = (<HTMLSelectElement>document.getElementById('notification'));
    notfication.classList.add("hide-div-not");
    notfication.classList.add("red-c");
    notfication.classList.remove("green-c");

    if(user.name == undefined || user.name == "") {
      notficationText.innerText="PREENCHA TODOS OS CAMPOS";
      notfication.classList.remove("hide-div-not");
      return;
    }

    if(user.name.length <= 10) {
      notficationText.innerText="E-MAIL MUITO PEQUENO";
      notfication.classList.remove("hide-div-not");
      return;
    }

    var re = /^[A-Za-z0-9-_.]+@[A-Za-z0-9]+\.[a-z]+?$/i;
    let emailRegex = re.test(user.name);
    if(!emailRegex) {
      notficationText.innerText="E-MAIL INVÁLIDO";
      notfication.classList.remove("hide-div-not");
      return;
    }

    if(user.name.length >= 60) {
      notficationText.innerText="E-MAIL MUITO GRANDE";
      notfication.classList.remove("hide-div-not");
      return;
    }
    
    const contaiver = (<HTMLSelectElement>document.getElementById('container'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));

    contaiver.classList.remove("class-flex");
    contaiver.classList.add("class-hide");
    
    loading.classList.add("class-flex");
    loading.classList.remove("class-hide");
    
    const usuario = (<HTMLSelectElement>document.getElementById('usuario'));
    const btnLogin = (<HTMLSelectElement>document.getElementById('btn-login'));
    usuario.disabled = true;
    btnLogin.disabled = true;
    
    const loginEndPoint = 'https://projeto-integrador-user.herokuapp.com/user/new-password';
    const body = JSON.stringify({
      email: user.name
    });
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", loginEndPoint, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(body);

    xhttp.addEventListener('loadend', () => {
      // if(xhttp.status == 204) {
        usuario.disabled = false;
        btnLogin.disabled = false;

        contaiver.classList.remove("class-hide");
        contaiver.classList.add("class-flex");

        loading.classList.remove("class-flex");
        loading.classList.add("class-hide");

        usuario.focus();

        notficationText.innerText="E-MAIL ENVIADO";
        notfication.classList.remove("hide-div-not");
        notfication.classList.remove("red-c");
        notfication.classList.add("green-c");
      // }
    });
  }

  get userAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }

}
