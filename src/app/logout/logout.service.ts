import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LogoutService {

  private isUserAuthenticated: boolean = false;

  displayMenu = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) { }

  async makeLogout() {
    let id = "";

    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    const session = window.localStorage.getItem("session");

    if(email != null && email != "null") {
      id = email;
    }
    else if (session != null && session != "null") {
      id = session;
    }
    else {
      this.router.navigate(['']);
    }

    const url = "https://projeto-integrador-user.herokuapp.com/user/logout/" + id;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", url, true);
    xhttp.send();

    xhttp.addEventListener('loadend', () => {
      if(xhttp.status == 204) {
        window.localStorage.setItem("session", null);
      }
      this.router.navigate(['']);
    });
  }

  async calcIdade(dataNasc) {
    var dataAtual = new Date();
    var anoAtual = dataAtual.getFullYear();
    var anoNascParts = dataNasc.split('-');
    var diaNasc =anoNascParts[2];
    var mesNasc =anoNascParts[1];
    var anoNasc =anoNascParts[0];
    var idade = anoAtual - anoNasc;
    var mesAtual = dataAtual.getMonth() + 1; 
    if(mesAtual < mesNasc){
      idade--; 
    } 
    else {
      if(mesAtual == mesNasc){ 
        if(new Date().getDate() < diaNasc ){ 
          idade--; 
        }
      }
    } 

    if(idade > 18) {
      return false;
    }
    else {
      return true;
    }
    
  }

  get userAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }
}
