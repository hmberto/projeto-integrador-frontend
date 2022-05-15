import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactUsService {

  constructor(private router: Router, private http: HttpClient) { }

}
