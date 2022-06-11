import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Deliveryman } from '../../models/deliveryman';


@Injectable()
export class RegisterDeliverymanService {

  private isUserAuthenticated: boolean = false;

  displayMenu = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) { }

  async makeSignup(deliveryman: Deliveryman) {
    const nameField = (<HTMLSelectElement>document.getElementById('name'));
    const cpfField = (<HTMLSelectElement>document.getElementById('cpf'));
    const cmhField = (<HTMLSelectElement>document.getElementById('cnh'));
    const categoryField = (<HTMLSelectElement>document.getElementById('category'));

    const container = (<HTMLSelectElement>document.getElementById('register-box'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));

    const notfication = (<HTMLSelectElement>document.getElementById('div-not'));
    const notficationText = (<HTMLSelectElement>document.getElementById('notification'));

    var complement2 = "";

    container.classList.add("class-hide");

    loading.classList.add("class-flex");
    loading.classList.remove("class-hide");

    categoryField.disabled = true;
    nameField.disabled = true;
    cpfField.disabled = true;
    cmhField.disabled = true;

    const url = 'https://projeto-integrador-user.herokuapp.com/user/';
    const json = JSON.stringify({
      name:deliveryman.name,
      cpf:deliveryman.cpf,
      cnh:deliveryman.cnh,
      category:deliveryman.category
  });

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(json);

    xhttp.addEventListener('loadend', () => {
      if(xhttp.status == 201) {
        this.router.navigate(['login']);
      }
      else {
        container.classList.remove("class-hide");

        loading.classList.remove("class-flex");
        loading.classList.add("class-hide");

        notficationText.innerText="OCORREU UM ERRO";
        notfication.classList.remove("hide-div-not");

        categoryField.disabled = false;
        nameField.disabled = false;
        cpfField.disabled = false;
        cmhField.disabled = false;
      }
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

    if(idade >= 18) {
      return true;
    }
    else {
      return false;
    }
    
  }

  async checkData(deliveryman: Deliveryman) {
    const notfication = (<HTMLSelectElement>document.getElementById('div-not'));
    const notficationText = (<HTMLSelectElement>document.getElementById('notification'));
    notfication.classList.add("hide-div-not");

    if(deliveryman.name == undefined || deliveryman.name == "" ||
      deliveryman.cpf == undefined || deliveryman.cpf == "" ||
      deliveryman.cnh == undefined || deliveryman.cnh == "" ||
      deliveryman.category == undefined || deliveryman.category == "") {
      notficationText.innerText="PREENCHA TODOS OS CAMPOS";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    if(deliveryman.name.length >= 50) {
      notficationText.innerText="NOME MUITO GRANDE";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    let testName = deliveryman.name.split(" ");
    if(testName.length < 2) {
      notficationText.innerText="INSIRA SEU SOBRENOME";
      notfication.classList.remove("hide-div-not");
      return false;
    }
    else {
      if(testName[0].length < 3) {
        notficationText.innerText="NOME MUITO PEQUENO";
        notfication.classList.remove("hide-div-not");
        return false;
      }
      else if(testName[testName.length - 1].length < 3) {
        notficationText.innerText="SOBRENOME MUITO PEQUENO";
        notfication.classList.remove("hide-div-not");
        return false;
      }
    }

    var re = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ \\s]+?$/i;
    let nameRegex = re.test(deliveryman.name);
    if(!nameRegex) {
      notficationText.innerText="NOME INVÁLIDO";
      notfication.classList.remove("hide-div-not");
      return false;
    }

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

    return true;
  }

  get userAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }
}
