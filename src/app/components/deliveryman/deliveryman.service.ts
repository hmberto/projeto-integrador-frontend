import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DeliverymanService {
  constructor(private router: Router, private http: HttpClient) { }
}
