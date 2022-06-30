import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  constructor(private router: Router) { }

  submitButton(): void {
    let name = (<HTMLInputElement>document.getElementById("name")).value;
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let feedback = (<HTMLInputElement>document.getElementById("feedback")).value;

    if (!name) {
      alert('Por favor, informe o seu nome');
      return;
    }

    if (!email) {
      alert('Por favor, informe o seu email');
      return;
    }

    if (!feedback) {
      alert('Por favor, inclua o seu feedback');
      return;
    }

    const url = "https://projeto-integrador-user.herokuapp.com/user/experience/contact";

    const body = JSON.stringify({
      name: name,
      email: email,
      message: feedback
    });

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(body);

    xhttp.addEventListener('loadend', () => {
      alert('Obrigado por nos enviar seu feedback!!');
      this.router.navigate(['']);
    });
  }
}