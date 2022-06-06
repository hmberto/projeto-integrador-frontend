import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Order } from '../../models/order';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../login/auth.service';

@Injectable()
export class TrackOrderService {
  order: Order;

  constructor(private apiService: ApiService, 
    private authenticatedService: AuthService,
    private router: Router) { }

  orderData(orderId, session) {
    const url = "https://projeto-integrador-myorder.herokuapp.com/orders/" + orderId + "/" + session;

    this.apiService.get(url).then((result: any) => {
      const keys = Object.keys(result);
      
      if(keys.length < 1) {
        this.router.navigate(['usuario']);
      }
      else {
        const loading = (<HTMLSelectElement>document.getElementById("loadingA"));
        const container = (<HTMLSelectElement>document.getElementById("container"));

        loading.classList.remove("class-flex");
        loading.classList.add("class-hide");

        container.classList.remove("class-hide");

        const order = result[`order-${orderId}`];
        
        const deliveryTime = order['tempoEntrega'];
        const splitedTime = deliveryTime.split("-");
        
        order.tempoEntrega = this.userTime(order['dataCompra'], splitedTime[0]) + " - " + this.userTime(order['dataCompra'], splitedTime[1]);
        this.order = <Order>order;
      }
    });
  }

  userTime(orderDate, deliveryTime) {
    var data = new Date(orderDate);
    let dt = "";
    
    data.setMinutes(data.getMinutes() + parseInt(deliveryTime));

    if (data.getHours() < 10 && data.getMinutes() < 10) {
      dt = "0" + data.getHours() + ":0" + data.getMinutes();
    }
    else if (data.getMinutes() < 10) {
      dt = data.getHours() + ":0" + data.getMinutes();
    }
    else if (data.getHours() < 10) {
      dt = "0" + data.getHours() + ":" + data.getMinutes();
    }
    else {
      dt = data.getHours() + ":" + data.getMinutes();
    }

    return dt;
  }

  myOrder(): Order {
    return this.order;
  }

  get userAuthenticated(): boolean {
    return this.authenticatedService.userAuthenticated;
  }
}
