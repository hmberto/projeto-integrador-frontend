import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Deliveryman } from '../../models/deliveryman';
import { DeliverymanOrders } from '../../models/deliveryman-orders';

@Injectable()
export class DeliverymanNewsService {
  constructor(private router: Router, private http: HttpClient) { }

  user: Deliveryman = new Deliveryman();
  order: DeliverymanOrders = new DeliverymanOrders();

  orders = [];
  deliveryman = [];

  initiate() {
    this.orders = [];
    this.deliveryman = [];
    const deliveryman = JSON.parse(window.localStorage.getItem("deliverymanID"));
    
    const item: Deliveryman = {
      id: deliveryman['idEntregador'],
      name: deliveryman['nomeEntregador'],
      cpf: deliveryman['cpfEntregador'],
      cnh: deliveryman['cnhEntregador'],
      category: deliveryman['categoriaCnhEntregador']
    }

    this.deliveryman.push(item);
    this.getNewOrders(item);
  }

  getNewOrders(deliveryman: Deliveryman) {
    const deliverymanID = window.localStorage.getItem("deliverymanID");
    const url = "https://projeto-integrador-myorder.herokuapp.com/delivery/orders/" + deliveryman.id + "/4";

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

    xhttp.addEventListener('loadend', () => {
      this.orders = [];
      const res = JSON.parse(xhttp.response);
      const keyCounter = Object.keys(res);

      for(let i = 0; i < keyCounter.length; i++) {
        const order: DeliverymanOrders = {
          userAddress: res[keyCounter[i]]['userAddress'],
          pharmacyAddress: res[keyCounter[i]]['pharmacyAddress'],
          distance: res[keyCounter[i]]['distance'] + " km",
          orderId: res[keyCounter[i]]['orderId'],
          pharmacyName: res[keyCounter[i]]['pharmacyName'],
          pharmacyCNPJ: res[keyCounter[i]]['pharmacyCNPJ']
        }

        this.orders.push(order);
      }
    });
  }

  makeDelivery(order) {
    this.orders = [];
    
    const deliveryman = JSON.parse(window.localStorage.getItem("deliverymanID"));
    const deliverymanId = deliveryman['idEntregador'];

    const orderId = order.orderId;

    const url = "https://projeto-integrador-myorder.herokuapp.com/delivery/order/" + deliverymanId + "/" + orderId + "/14";

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

    xhttp.addEventListener('loadend', () => {
      if(xhttp.status == 200) {
        this.initiate();
      }
    })
  }
}
