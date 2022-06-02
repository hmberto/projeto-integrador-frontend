import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  constructor(private orderService: OrderService,
    private router: Router) { }

  newPrice = [];

  ngOnInit() {
    const session = window.localStorage.getItem("session");
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('orderId');
    if(session == null || session == "null") {
      this.router.navigate(['login'], { queryParams: { checkout: 'true' } });
    }
    if(myParam == null || myParam == "null") {
      this.router.navigate(['']);
    }
    
    this.orderData(myParam, session);
  }

  userTime() {
    this.orderService.userTime("2022-06-01 22:34:43", 15);
  }

  orderData(orderId, session) {
    this.orderService.orderData(orderId, session);
  }

  get order(): Order[] {
    return this.orderService.gettedOrder;
  }

  get orderNumber() {
    this.newPrice = [];

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('orderId');

    this.newPrice.push(myParam);
    return this.newPrice;
  }

  backClick() {
    this.router.navigate(['myOrder']);
  }
}