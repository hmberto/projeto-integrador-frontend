import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';

import { User } from '../../../models/user';


@Injectable()
export class RecoveryService {

  private isUserAuthenticated: boolean = false;

  displayMenu = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  async newPass(user: User, email, token) {
    const notfication = (<HTMLSelectElement>document.getElementById('div-not'));
    const notficationText = (<HTMLSelectElement>document.getElementById('notification'));
    notfication.classList.add("hide-div-not");
    notfication.classList.add("red-c");
    notfication.classList.remove("green-c");

    const senhaC = (<HTMLSelectElement>document.getElementById('senha-c'));

    if(user.password == undefined || user.password == "") {
      notficationText.innerText="PREENCHA TODOS OS CAMPOS";
      notfication.classList.remove("hide-div-not");
      return;
    }

    if(user.password.length < 8) {
      notficationText.innerText="SENHA MUITO PEQUENA";
      notfication.classList.remove("hide-div-not");
      return;
    }

    if(user.password.length >= 25) {
      notficationText.innerText="SENHA MUITO GRANDE";
      notfication.classList.remove("hide-div-not");
      return;
    }

    var re = /^[A-Za-z0-9-_.!@#]+?$/i;
    let passRegex = re.test(user.password);
    if(!passRegex) {
      notficationText.innerText="SENHA INVÁLIDA";
      notfication.classList.remove("hide-div-not");
      return;
    }

    if(!(user.password == senhaC.value)) {
      notficationText.innerText="SENHAS DIFERENTES";
      notfication.classList.remove("hide-div-not");
      return;
    }
    
    const contaiver = (<HTMLSelectElement>document.getElementById('container'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));

    contaiver.classList.remove("class-flex");
    contaiver.classList.add("class-hide");
    
    loading.classList.add("class-flex");
    loading.classList.remove("class-hide");
    
    const pass1 = (<HTMLSelectElement>document.getElementById('senha'));
    const pass2 = (<HTMLSelectElement>document.getElementById('senha-c'));
    const btnLogin = (<HTMLSelectElement>document.getElementById('btn-login'));
    pass1.disabled = true;
    pass2.disabled = true;
    btnLogin.disabled = true;
    
    const loginEndPoint = 'https://projeto-integrador-user.herokuapp.com/user/change-password';
    const body = JSON.stringify({
      email: email,
      token: token,
      newPass: user.password
    });

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", loginEndPoint, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(body);

    xhttp.addEventListener('loadend', () => {
      this.router.navigate(['login']);
    });
  }

  get userAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }

}
