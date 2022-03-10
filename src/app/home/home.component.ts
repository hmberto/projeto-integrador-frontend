import { Component } from '@angular/core';
import { PHARMACY } from '../../mock/pharmacy-mock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  pharmacies = PHARMACY;

  constructor() { }

}
