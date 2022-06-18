import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PartnersService } from './partners.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  constructor(private partnersService: PartnersService,
    private router: Router) { }

  ngOnInit() {
    
  }
}