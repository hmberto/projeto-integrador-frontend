import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Register } from '../../models/register';


@Injectable()
export class CadastroService {

  private isUserAuthenticated: boolean = false;

  displayMenu = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) { }

  async makeLogin(register: Register) {
    const url = 'https://pharmacy-delivery.herokuapp.com/client/signup';
    const json = JSON.stringify({
      name:register.name,
      email:register.email,
      pass:register.pass,
      street:register.street,
      number:register.number,
      complement:register.complement,
      zipCode:register.zipCode,
      state:register.state,
      city:register.city,
      district:register.district,
      cpf:register.cpf,
      birthDate:register.birthDate,
      sex:register.sex
  });

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(json);

    xhttp.addEventListener('loadend', () => {
      if(xhttp.status == 201) {
        window.location.replace("/login");
      }
    });
  }

  async getCep(cep, cepFild, rua, bairro, estado, cidade) {
    const url = "https://viacep.com.br/ws/" + cep + "/json/";
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();

    cepFild.disabled = true;

    xhttp.addEventListener('loadend', () => {
      var endereco = JSON.parse(xhttp.response);

      if(endereco['cep'] != undefined) {
        cepFild.disabled = false;

        var newCep = endereco['cep'];
        var newRua = endereco['logradouro'];
        var newBairro = endereco['bairro'];
        var newCidade = endereco['localidade'];
        var newEstado = endereco['uf'];

        cepFild.value=newCep;
        rua.value=newRua;
        bairro.value=newBairro;
        estado.value=newEstado;
        cidade.value=newCidade;
      }
    });
  }

  get userAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }
}
