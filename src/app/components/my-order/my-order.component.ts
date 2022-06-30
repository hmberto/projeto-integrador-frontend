import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../models/order';
import { MyOrderService } from './service/my-order.service';
import { IMyOrderService } from './service/my-order.service.interface';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
  providers: [{ provide: IMyOrderService, useClass: MyOrderService }],
})
export class MyOrderComponent implements OnInit {

  constructor(private router: Router, private service: IMyOrderService) { }

  ngOnInit() {
    const session = window.localStorage.getItem("session");
    if (session == null || session == "null") {
      this.router.navigate(['login'], { queryParams: { pedidos: 'true' } });
    }
    else {
      this.service.orderData(session);
    }
  }

  get orders(): Order[] {
    const orders = this.service.myOrders();
    return orders && orders.sort((x, y) =>
      parseInt(y.idCompra) - parseInt(x.idCompra)
    );
  }

  trackOrder(orderId: string) {
    this.router.navigate(['pedido'], { queryParams: { orderId: orderId } });
  }
}
