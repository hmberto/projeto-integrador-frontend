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
    const nameField = (<HTMLSelectElement>document.getElementById('name'));
    const emailField = (<HTMLSelectElement>document.getElementById('email'));
    const passField = (<HTMLSelectElement>document.getElementById('pass'));
    const numberField = (<HTMLSelectElement>document.getElementById('number'));
    const complementField = (<HTMLSelectElement>document.getElementById('complement'));
    const zipCodeField = (<HTMLSelectElement>document.getElementById('zipcode'));
    const cpfField = (<HTMLSelectElement>document.getElementById('cpf'));
    const birthDateField = (<HTMLSelectElement>document.getElementById('birthdate'));
    const sexField = (<HTMLSelectElement>document.getElementById('sex'));
    const sendBtn = (<HTMLSelectElement>document.getElementById('sendBtn'));

    const contaiver = (<HTMLSelectElement>document.getElementById('register-box'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));

    const notfication = (<HTMLSelectElement>document.getElementById('div-not'));
    const notficationText = (<HTMLSelectElement>document.getElementById('notification'));

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

    contaiver.classList.add("class-hide");

    loading.classList.add("class-flex");
    loading.classList.remove("class-hide");

    nameField.disabled = true;
    emailField.disabled = true;
    passField.disabled = true;
    numberField.disabled = true;
    complementField.disabled = true;
    zipCodeField.disabled = true;
    cpfField.disabled = true;
    birthDateField.disabled = true;
    sexField.disabled = true;
    sendBtn.disabled = true;


    const url = 'https://projeto-integrador-user.herokuapp.com/user/signup';
    const json = JSON.stringify({
      name:register.name,
      email:register.email,
      pass:register.pass,
      street:register.street,
      number:register.number,
      complement:complement2,
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
        this.router.navigate(['login']);
      }
      else {
        contaiver.classList.remove("class-hide");

        loading.classList.remove("class-flex");
        loading.classList.add("class-hide");

        notficationText.innerText="OCORREU UM ERRO";
        notfication.classList.remove("hide-div-not");

        nameField.disabled = false;
        emailField.disabled = false;
        passField.disabled = false;
        numberField.disabled = false;
        complementField.disabled = false;
        zipCodeField.disabled = false;
        cpfField.disabled = false;
        birthDateField.disabled = false;
        sexField.disabled = false;
        sendBtn.disabled = false;
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
      cepFild.disabled = false;
      if(endereco['cep'] != undefined) {

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

  async checkData(register: Register) {
    const notfication = (<HTMLSelectElement>document.getElementById('div-not'));
    const notficationText = (<HTMLSelectElement>document.getElementById('notification'));
    notfication.classList.add("hide-div-not");

    if(register.email == undefined || register.email == "" ||
      register.pass == undefined || register.pass == "" ||
      register.name == undefined || register.name == "" ||
      register.cpf == undefined || register.cpf == "" ||
      register.street == undefined || register.street == "" ||
      register.state == undefined || register.state == "" ||
      register.zipCode == undefined || register.zipCode == "" ||
      register.city == undefined || register.city == "" ||
      register.district == undefined || register.district == "" ||
      register.birthDate == undefined || register.birthDate == "" ||
      register.number == undefined || register.number == "") {
      notficationText.innerText="PREENCHA TODOS OS CAMPOS";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    if(register.email.length <= 10) {
      notficationText.innerText="E-MAIL MUITO PEQUENO";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    if(register.email.length >= 60) {
      notficationText.innerText="E-MAIL MUITO GRANDE";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    var re = /^[A-Za-z0-9-_.]+@[A-Za-z0-9]+\.[A-Za-z .]+?$/i;
    let emailRegex = re.test(register.email);
    if(!emailRegex) {
      notficationText.innerText="E-MAIL INVÁLIDO";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    if(register.pass.length < 8) {
      notficationText.innerText="SENHA MUITO PEQUENA";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    if(register.pass.length >= 25) {
      notficationText.innerText="SENHA MUITO GRANDE";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    var re = /^[A-Za-z0-9-_.!@#]+?$/i;
    let passRegex = re.test(register.pass);
    if(!passRegex) {
      notficationText.innerText="SENHA INVÁLIDA";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    if(this.calcIdade(register.birthDate)['__zone_symbol__value'] == false) {
      notficationText.innerText="É NECESSÁRIO TER A IDADE MÍNIMA DE 18 ANOS";
      notfication.classList.remove("hide-div-not");
      return;
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

    if(register.cpf.length >= 15) {
      notficationText.innerText="CPF MUITO GRANDE";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    if(register.cpf.length < 11) {
      notficationText.innerText="CPF MUITO PEQUENO";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    if(register.cpf.length >= 12) {
      if(register.cpf.length <= 13) {
        notficationText.innerText="CPF INVÁLIDO";
        notfication.classList.remove("hide-div-not");
        return false;
      }
    }

    var re = /^[0-9]+?$/i;
    let cpf1Regex = re.test(register.cpf);
    if(register.cpf.length == 11 && !cpf1Regex) {
      notficationText.innerText="CPF INVÁLIDO";
      notfication.classList.remove("hide-div-not");
      return false;
    }

    var re = /^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}?$/i;
    let cpf2Regex = re.test(register.cpf);
    if(register.cpf.length == 14 && !cpf2Regex) {
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
