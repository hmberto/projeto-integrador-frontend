import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  trackOrder() {
    this.router.navigate(['pedido']);
  }

}
