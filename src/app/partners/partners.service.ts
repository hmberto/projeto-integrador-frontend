import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Deliveryman } from '../../models/deliveryman';


@Injectable()
export class PartnersService {
  constructor(private router: Router, private http: HttpClient) { }
}
