import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  constructor(private router: Router, private http: HttpClient) { }

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

    alert('Obrigado por nos enviar o seu feedback !!');
    
    // Publish the feedback to back end
    // this.http.post('sendFeedback', body, options)
    this.router.navigate(['produtos']);
  }
}