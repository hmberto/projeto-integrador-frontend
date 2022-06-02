import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TrackOrderService } from './track-order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {

  constructor(private orderService: TrackOrderService,
    private router: Router) { }

  ngOnInit() {
    const session = window.localStorage.getItem("session");
    if (!session) {
      this.router.navigate(['login'], { queryParams: { checkout: 'true' } });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('orderId');
    if (!myParam) {
      this.router.navigate(['']);
    }
    
    this.orderData(myParam, session);
  }

  get order(): Order {
    return this.orderService.order;
  }

  orderData(orderId, session) {
    this.orderService.orderData(orderId, session);
  }

  backClick() {
    this.router.navigate(['myOrder']);
  }
}