import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

import { UserPService } from './user.service';
import { Register } from '../../models/register';

@Component({
  selector: 'app-cadastro',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserPComponent implements OnInit {

  register: Register = new Register();

  constructor(private userPService: UserPService,
    private router: Router) { }

  ngOnInit() {
    const contaiver = (<HTMLSelectElement>document.getElementById('register-box'));
    const loading = (<HTMLSelectElement>document.getElementById('loading'));

    const session = window.localStorage.getItem("session");
    if(session == null || session == "null") {
      this.router.navigate(['']);
    }

    contaiver.classList.add("class-hide");

    loading.classList.add("class-flex");
    loading.classList.remove("class-hide");

    const fildZipCode = document.getElementById('zipcode');
    fildZipCode.addEventListener("keyup", () => {
      const valueZipCode = (<HTMLSelectElement>document.getElementById('zipcode')).value;

      let ValidateZipCode1 = valueZipCode.match(/[0-9]{8}/gi);
      let ValidateZipCode2 = valueZipCode.match(/[0-9]{5}[-][0-9]{3}/gi);

      if(valueZipCode.length == 8 && ValidateZipCode1 || valueZipCode.length == 9 && ValidateZipCode2) {
        this.userPService.getCep(valueZipCode, this.register);
      }
    });

    this.userPService.getUser(this.register);
  }

  myOrders() {
    this.router.navigate(['pedidos']);
  }

  saveUser() {
    let t = this.userPService.checkData(this.register);
    if(t['__zone_symbol__value'] == true) {
      this.userPService.saveUser(this.register);
    }
  }
}
