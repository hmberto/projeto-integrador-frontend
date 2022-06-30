import { ActivatedRoute,Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { RecoveryService } from './recovery.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  user: User = new User();

  subscription: Subscription;

  constructor(private recoveryService: RecoveryService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let email = "";
    let token = "";
    this.subscription = this.activatedRoute.queryParams.subscribe(params => {
      email = params['email'];
      token = params['token'];
      
      if(email == undefined || token == undefined || email == "" || token == "") {
        this.router.navigate(['']);
      }

      if(email.length <= 10 || email.length >= 60 || token.length != 100) {
        this.router.navigate(['']);
      }
  
      var re = /^[A-Za-z0-9-_.]+@[A-Za-z0-9]+\.[a-z]+?$/i;
      let emailRegex = re.test(email);
      if(!emailRegex) {
        this.router.navigate(['']);
      }
    });

    const passField = document.getElementById("senha");
    const passFieldC = document.getElementById("senha-c");
    passField.focus();

    let handleEvent = (event: KeyboardEvent) => {
      var key = event.which || event.keyCode;
      if (key == 13) {
        if(!(<HTMLSelectElement>document.getElementById('btn-login')).disabled) {
          this.recoveryService.newPass(this.user, email, token);
        }
      }
    }
    
    passField.addEventListener('keyup', function(e){
      var key = e.which || e.keyCode;
      if (key == 13) {
        passFieldC.focus();
      }
    });

    passFieldC.addEventListener('keyup', function(e){
      var key = e.which || e.keyCode;
      if (key == 13) {
        handleEvent(<any>e);
      }
    });
  }

  newPass() {
    this.subscription = this.activatedRoute.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];
      
      this.recoveryService.newPass(this.user, email, token);
    });
  }
}