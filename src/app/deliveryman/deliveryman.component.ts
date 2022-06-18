import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DeliverymanService } from './deliveryman.service';
import { Deliveryman } from '../../models/deliveryman';

@Component({
  selector: 'app-deliveryman',
  templateUrl: './deliveryman.component.html',
  styleUrls: ['./deliveryman.component.css']
})
export class DeliverymanComponent implements OnInit {
  constructor(private deliverymanService: DeliverymanService,
    private router: Router) { }

  user: Deliveryman = new Deliveryman();
  deliveryman = [];

  ngOnInit() {
    const deliveryman = JSON.parse(window.localStorage.getItem("deliverymanID"));
    
    const item: Deliveryman = {
      id: deliveryman['idEntregador'],
      name: deliveryman['nomeEntregador'],
      cpf: deliveryman['cpfEntregador'],
      cnh: deliveryman['cnhEntregador'],
      category: deliveryman['categoriaCnhEntregador']
    }

    this.deliveryman.push(item);
  }

  get getUser(): Deliveryman[] {
    return this.deliveryman;
  }
}