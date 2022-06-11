import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginDeliverymanService } from './login-deliveryman.service';
import { Deliveryman } from '../../models/deliveryman';

@Component({
  selector: 'app-login-deliveryman',
  templateUrl: './login-deliveryman.component.html',
  styleUrls: ['./login-deliveryman.component.css']
})
export class LoginDeliverymanComponent implements OnInit {

  deliveryman: Deliveryman = new Deliveryman();

  constructor(private loginDeliverymanService: LoginDeliverymanService,
    private router: Router) { }

  ngOnInit() {
    const userField = document.getElementById("usuario");
    userField.focus();

    let handleEvent = (event: KeyboardEvent) => {
      var key = event.which || event.keyCode;
      if (key == 13) {
        if(!(<HTMLSelectElement>document.getElementById('btn-login')).disabled) {
          this.loginDeliverymanService.makeLogin(this.deliveryman);
        }
      }
    }
    
    userField.addEventListener('keyup', function(e){
      var key = e.which || e.keyCode;
      if (key == 13) {
        handleEvent(<any>e);
      }
    });
  }

  makeLogin() {
    this.loginDeliverymanService.makeLogin(this.deliveryman);
  }
}