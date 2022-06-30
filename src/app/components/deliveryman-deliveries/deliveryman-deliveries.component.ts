import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DeliverymanService } from './deliveryman-deliveries.service';
import { Deliveryman } from '../../../models/deliveryman';
import { DeliverymanOrders } from '../../../models/deliveryman-orders';

@Component({
  selector: 'app-deliveryman-deliveries',
  templateUrl: './deliveryman-deliveries.component.html',
  styleUrls: ['./deliveryman-deliveries.component.css']
})
export class DeliverymanComponent implements OnInit {
  constructor(private deliverymanService: DeliverymanService,
    private router: Router) { }

  user: Deliveryman = new Deliveryman();

  ngOnInit() {
    this.deliverymanService.initiate();
  }

  closeDelivery(orderId) {
    this.deliverymanService.closeDelivery(orderId);
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
    this.deliverymanService.orders.sort(function (x, y) {
      return x.orderId - y.orderId;
    });
    return this.deliverymanService.orders;
  }

  get getUser(): Deliveryman[] {
    return this.deliverymanService.deliveryman;
  }
}