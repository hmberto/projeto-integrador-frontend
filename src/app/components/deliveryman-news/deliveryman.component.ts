import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DeliverymanNewsService } from './deliveryman.service';
import { Deliveryman } from '../../../models/deliveryman';
import { DeliverymanOrders } from '../../../models/deliveryman-orders';

@Component({
  selector: 'app-deliveryman',
  templateUrl: './deliveryman.component.html',
  styleUrls: ['./deliveryman.component.css']
})
export class DeliverymanNewsComponent implements OnInit {
  constructor(private deliverymanNewsService: DeliverymanNewsService,
    private router: Router) { }

  user: Deliveryman = new Deliveryman();

  ngOnInit() {
    this.deliverymanNewsService.initiate();
  }

  makeDelivery(orderId) {
    this.deliverymanNewsService.makeDelivery(orderId);
  }

  redirect(i) {
    if(i == 0) {
      this.router.navigate(["parceiros/entregador/entregar"]);
    }
    else if(i == 1) {
      this.router.navigate(["parceiros/entregador/novas"]);
    }
  }

  get getOrders(): DeliverymanOrders[] {
    this.deliverymanNewsService.orders.sort(function (x, y) {
      return x.orderId - y.orderId;
    });
    return this.deliverymanNewsService.orders;
  }

  get getUser(): Deliveryman[] {
    return this.deliverymanNewsService.deliveryman;
  }
}