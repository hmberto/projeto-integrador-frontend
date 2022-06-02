import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Order } from '../../models/order';

@Injectable()
export class OrderService {
  gettedOrder: Order[] = [];

  private isUserAuthenticated: boolean = false;

  displayMenu = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  orderData(orderId, session) {
    this.gettedOrder = [];
    
    const url = "https://projeto-integrador-myorder.herokuapp.com/orders/" + orderId + "/" + session;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();

    xhttp.addEventListener('loadend', () => {
      if(xhttp.status == 200) {
        const json = JSON.parse(xhttp.response);
        console.log(url)
        const jsonOrder = json['order-' + orderId];

        const timeD = jsonOrder['tempoEntrega'];
        const timeSplit = timeD.split("-");

        const orderDate = jsonOrder['dataCompra'];

        const deliveryTime = this.userTime(orderDate, timeSplit[0]) + " - " + this.userTime(orderDate, timeSplit[1]);
        
        const item: Order = {
          nomeFarmacia: jsonOrder['nomeFarmacia'],
          cnpjFarmacia: jsonOrder['cnpjFarmacia'],
          distanciaFarmacia: jsonOrder['distanciaFarmacia'],
          valorEntrega: jsonOrder['valorEntrega'].replace(".", ","),
          localEntrega: jsonOrder['localEntrega'],
          dataCompra: jsonOrder['dataCompra'],
          numeroCartao: jsonOrder['numeroCartao'],
          bandeiraCartao: jsonOrder['bandeiraCartao'],
          tempoEntrega: deliveryTime,
          idFarmacia: jsonOrder['idFarmacia'],
          idCompra: jsonOrder['idCompra'],
          totalProdutos: jsonOrder['totalProdutos'].replace(".", ","),
          totalPedido: jsonOrder['totalPedido'].replace(".", ","),
          dataEntrega: jsonOrder['dataEntrega'],
          status: jsonOrder['status']
        }

        console.log(item)

        this.gettedOrder.push(item);
      }
      else {
        this.router.navigate(['']);
      }
    });
  }

  userTime(orderDate, deliveryTime) {
    var data = new Date(orderDate);
    let dt = "";
    
    data.setMinutes(data.getMinutes() + parseInt(deliveryTime));

    if(data.getHours() < 10 && data.getMinutes() < 10) {
      dt = "0" + data.getHours() + ":0" + data.getMinutes();
    }
    else if(data.getMinutes() < 10) {
      dt = data.getHours() + ":0" + data.getMinutes();
    }
    else if(data.getHours() < 10) {
      dt = "0" + data.getHours() + ":" + data.getMinutes();
    }
    else {
      dt = data.getHours() + ":" + data.getMinutes();
    }

    return dt;
  }

  get userAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }
}
