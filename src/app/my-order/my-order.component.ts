import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order';
import { MyOrderService } from './my-order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  constructor(private router: Router, private service: MyOrderService) { }

  newItems = [];

  ngOnInit() {
    const session = window.localStorage.getItem("session");
    if(session == null || session == "null") {
      this.router.navigate(['login'], { queryParams: { pedidos: 'true' } });
    }
    else {
      this.service.orderData(session);
    }
  }

  get orders(): Order[] {
    this.newItems = this.service.myOrders();

    this.newItems.sort(function (x, y) {
      return y.idCompra - x.idCompra;
    });

    return this.service.myOrders();
  }

  trackOrder(orderId: string) {
    this.router.navigate(['pedido'], { queryParams: { orderId: orderId } });
  }
}
