import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Order } from '../../../../models/order';
import { ApiService } from '../../../../core/services/api.service';
import { IMyOrderService } from './my-order.service.interface';

@Injectable({
  providedIn: 'root',
})
export class MyOrderService implements IMyOrderService {
  private orders: Order[];

  constructor(private apiService: ApiService) { }

  async orderData(session) {
    const url = `https://projeto-integrador-myorder.herokuapp.com/orders/${session}`;

    this.apiService.get(url).then((object: any[]) => {
      const array = Object.keys(object)
        .map((key) => {
            return object[key];
        });

      array.forEach((order: Order) => {
        order.products = Object.keys(order.products)
          .map((key) => {
              return order.products[key];
          });
      });

      const loading = (<HTMLSelectElement>document.getElementById('loading'));
      const container = (<HTMLSelectElement>document.getElementById('container'));

      loading.classList.add("class-hide");
      loading.classList.remove("class-flex");

      container.classList.remove("class-hide");

      this.orders = <Order[]>array;
    });
  }

  myOrders(): Order[] {
    return this.orders;
  }
}
