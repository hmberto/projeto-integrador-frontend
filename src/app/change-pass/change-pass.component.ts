import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

import { ChangePassService } from './change-pass.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  user: User = new User();

  constructor(private changePassService: ChangePassService,
    private router: Router) { }

  ngOnInit() {
    const userField = document.getElementById("usuario");
    userField.focus();

    let handleEvent = (event: KeyboardEvent) => {
      var key = event.which || event.keyCode;
      if (key == 13) {
        if(!(<HTMLSelectElement>document.getElementById('btn-login')).disabled) {
          this.changePassService.requestPass(this.user);
        }
      }
    }
    
    userField.addEventListener('keyup', function(e){
      var key = e.which || e.keyCode;
      if (key == 13) {
        handleEvent(<any>e);
      }
    });
  }

  requestPass() {
    this.changePassService.requestPass(this.user);
  }
}