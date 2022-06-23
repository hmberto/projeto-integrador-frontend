import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Register } from '../../../models/register';


@Injectable()
export class UserPService {

  private isUserAuthenticated: boolean = false;

  displayMenu = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) { }

  async saveUser(register: Register) {
    const nameField = (<HTMLSelectElement>document.getElementById('name'));
    const numberField = (<HTMLSelectElement>document.getElementById('number'));
    const complementField = (<HTMLSelectElement>document.getElementById('complement'));
    const zipCodeField = (<HTMLSelectElement>document.getElementById('zipcode'));
    const sexField = (<HTMLSelectElement>document.getElementById('sex'));
    const sendBtn = (<HTMLSelectElement>document.getElementById('sendBtn'));

    const container = (<HTMLSelectElement>document.getElementById('register-box'));
    const divorders = (<HTMLSelectElement>document.getElementById('divorders'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));

    const notfication = (<HTMLSelectElement>document.getElementById('div-not'));
    const notficationText = (<HTMLSelectElement>document.getElementById('notification'));

    notfication.classList.add("red-c");
    notfication.classList.remove("green-c");

    var complement2 = "";
    if(register.complement == undefined || register.complement == "") {
      complement2 = "NULL";
    }
    else {
      if(register.complement.length >= 50) {
        notficationText.innerText="COMPLEMENTO MUITO GRANDE";
        notfication.classList.remove("hide-div-not");
        return;
      }
  
      var re = /^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ . - \\s]+?$/i;
      let complementRegex = re.test(register.complement);
      if(!complementRegex) {
        notficationText.innerText="COMPLEMENTO INVÁLIDO";
        notfication.classList.remove("hide-div-not");
        return;
      }

      complement2 = register.complement;
    }

    container.classList.add("class-hide");
    divorders.classList.add("class-hide");

    loading.classList.add("class-flex");
    loading.classList.remove("class-hide");

    nameField.disabled = true;
    numberField.disabled = true;
    complementField.disabled = true;
    zipCodeField.disabled = true;
    sexField.disabled = true;
    sendBtn.disabled = true;

    const updateUser = 'https://projeto-integrador-user.herokuapp.com/user/update';
    
    const json = JSON.stringify({
      email:register.email,
      name:register.name,
      street:register.street,
      number:register.number,
      complement:complement2,
      zipCode:register.zipCode,
      state:register.state,
      city:register.city,
      district:register.district,
      sex:register.sex
    });

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", updateUser, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(json);
    
    xhttp.addEventListener('loadend', () => {
      if(xhttp.status == 204) {
        container.classList.remove("class-hide");
        divorders.classList.remove("class-hide");

        loading.classList.remove("class-flex");
        loading.classList.add("class-hide");

        notficationText.innerText="CADASTRO ATUALIZADO";
        notfication.classList.remove("hide-div-not");
        notfication.classList.remove("red-c");
        notfication.classList.add("green-c");

        nameField.disabled = false;
        numberField.disabled = false;
        complementField.disabled = false;
        zipCodeField.disabled = false;
        sexField.disabled = false;
        sendBtn.disabled = false;
      }
      else {
        container.classList.remove("class-hide");
        divorders.classList.remove("class-hide");

        loading.classList.remove("class-flex");
        loading.classList.add("class-hide");

        notficationText.innerText="OCORREU UM ERRO";
        notfication.classList.remove("hide-div-not");

        nameField.disabled = false;
        numberField.disabled = false;
        complementField.disabled = false;
        zipCodeField.disabled = false;
        sexField.disabled = false;
        sendBtn.disabled = false;
      }
    });
  }

  async getCep(cep, register: Register) {
    const cepFild = (<HTMLSelectElement>document.getElementById('zipcode'));

    const url = "https://viacep.com.br/ws/" + cep + "/json/";
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();

    cepFild.disabled = true;

    xhttp.addEventListener('loadend', () => {
      const container = (<HTMLSelectElement>document.getElementById('register-box'));
      const divorders = (<HTMLSelectElement>document.getElementById('divorders'));
      const loading = (<HTMLSelectElement>document.getElementById('loading'));

      container.classList.remove("class-hide");
      divorders.classList.remove("class-hide");

      loading.classList.remove("class-flex");
      loading.classList.add("class-hide");

      var endereco = JSON.parse(xhttp.response);
      cepFild.disabled = false;
      if(endereco['cep'] != undefined) {
        var newCep = endereco['cep'];
        var newRua = endereco['logradouro'];
        var newBairro = endereco['bairro'];
        var newCidade = endereco['localidade'];
        var newEstado = endereco['uf'];

        register.zipCode=newCep;
        register.street=newRua;
        register.district=newBairro;
        register.state=newEstado;
        register.city=newCidade;
      }
      else {
        register.zipCode="";
        register.street="";
        register.district="";
        register.state="";
        register.city="";
      }
    });
  }

  getUser(register: Register) {
    const session = window.localStorage.getItem("session");
    const getUser = 'https://projeto-integrador-user.herokuapp.com/user/get-user/' + session;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", getUser, true);
    xhttp.send();

    xhttp.addEventListener('loadend', () => {
      if(xhttp.status == 200) {
        var resp = JSON.parse(xhttp.response);

        var complement = resp['complement'];
        if(complement == "NULL") {
          complement = "";
        }

        const json = {
          name:resp['name'],
          email:resp['email'],
          number:resp['number'],
          complement:complement,
          zipCode:resp['zipCode'],
          cpf:resp['cpf'],
          birthDate:resp['birthDate'],
          sex:resp['sex']
        };

        this.setFields(json, register);
        this.getCep(json['zipCode'], register);
      }
      else {
        window.localStorage.setItem("session", null);
        this.router.navigate(['']);
      }
    });
  }

  setFields(user, register: Register) {
    register.name = user['name'];
    register.email = user['email'];
    register.zipCode = user['zipCode'];
    register.number = user['number'];
    register.complement = user['complement'];
    register.cpf = user['cpf'];
    register.birthDate = user['birthDate'];
    register.sex = user['sex'];
  }

  async checkData(register: Register) {
    const notfication = (<HTMLSelectElement>document.getElementById('div-not'));
    const notficationText = (<HTMLSelectElement>document.getElementById('notification'));
    notfication.classList.add("hide-div-not");

    notfication.classList.add("red-c");
    notfication.classList.remove("green-c");

    if(register.name == undefined || register.name == "" ||
      register.street == undefined || register.street == "" ||
      register.state == undefined || register.state == "" ||
      register.zipCode == undefined || register.zipCode == "" ||
      register.city == undefined || register.city == "" ||
      register.district == undefined || register.district == "" ||
      register.number == undefined || register.number == "") {
      notficationText.innerText="PREENCHA TODOS OS CAMPOS";
      notfication.classList.remove("hide-div-not");
      return false;
    }
    
    if(register.number.length >= 10) {
      notficationText.innerText="NÚMERO MUITO GRANDE";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    if(register.number.length < 1) {
      notficationText.innerText="NÚMERO MUITO PEQUENO";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    var re = /^[0-9]+?$/i;
    let numberRegex = re.test(register.number);
    if(!numberRegex) {
      notficationText.innerText="NÚMERO INVÁLIDO";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    if(register.name.length >= 50) {
      notficationText.innerText="NOME MUITO GRANDE";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    let testName = register.name.split(" ");
    if(testName.length < 2) {
      notficationText.innerText="INSIRA SEU SOBRENOME";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    var re = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ \\s]+?$/i;
    let nameRegex = re.test(register.name);
    if(!nameRegex) {
      notficationText.innerText="NOME INVÁLIDO";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    return true;
  }

  get userAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }
}
