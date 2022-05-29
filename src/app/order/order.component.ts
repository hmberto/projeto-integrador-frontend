import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  constructor(private OrderService: OrderService,
    private router: Router) { }

  newPrice = [];

  ngOnInit() {}

  get orderNumber() {
    this.newPrice = [];

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('orderId');

    this.newPrice.push(myParam);
    return this.newPrice;
  }
}