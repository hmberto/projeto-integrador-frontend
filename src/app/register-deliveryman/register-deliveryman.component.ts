import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RegisterDeliverymanService } from './register-deliveryman.service';
import { Deliveryman } from '../../models/deliveryman';

@Component({
  selector: 'app-register-deliveryman',
  templateUrl: './register-deliveryman.component.html',
  styleUrls: ['./register-deliveryman.component.css']
})
export class RegisterDeliverymanComponent implements OnInit {

  deliveryman: Deliveryman = new Deliveryman();

  constructor(private registerDeliverymanService: RegisterDeliverymanService,
    private router: Router) { }

  ngOnInit() {
    this.deliveryman.category = 'A';

    document.getElementById('name').focus();
  }

  makeSignup() {
    let t = this.registerDeliverymanService.checkData(this.deliveryman);
    if(t['__zone_symbol__value'] == true) {
      this.registerDeliverymanService.makeSignup(this.deliveryman);
    }
  }
}
