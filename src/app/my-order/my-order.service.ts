import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Order } from '../../models/order';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../login/auth.service';

@Injectable()
export class MyOrderService {

  panelOpenState = false;
  private orders: Order[];

  constructor(private apiService: ApiService, private authenticatedService: AuthService) { }

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

      this.orders = <Order[]>array;
    });
  }

  get userAuthenticated(): boolean {
    return this.authenticatedService.userAuthenticated;
  }

  myOrders(): Order[] {
    return this.orders;
  }
}
