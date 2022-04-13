import { Router } from '@angular/router';
import { AuthService } from './login/auth.service';
import { Component } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  displayMenu: boolean = false;

  constructor(private authService: AuthService,
    private cartService: CartService,
    private router: Router) {

  }

  qnt = [];

  get getQnt(): Product[] {
    this.qnt = [];
    this.qnt.push(this.cartService.items.length);
    return this.qnt;
  }

  ngOnInit(){
    this.updateNav();
  }

  updateNav() {
    const session = window.localStorage.getItem("session");
    if(session != null && session != "null") {
      document.getElementById('logged1').classList.add('show-cadastro');
      document.getElementById('logged2').classList.remove('show-cadastro');
      document.getElementById('logged3').classList.add('show-cadastro');
      document.getElementById('logged4').classList.remove('show-cadastro');

      document.getElementById('logged5').classList.remove('show-cadastro');
      document.getElementById('logged6').classList.remove('show-cadastro');

      document.getElementById('logged4').addEventListener("click", () => {
        menu.classList.add("hide-menu-mobile");
        fixedNavDois.classList.remove('top-fixed');
      });

      document.getElementById('logged6').addEventListener("click", () => {
        menu.classList.add("hide-menu-mobile");
        fixedNavDois.classList.remove('top-fixed');
      });
    }
    else {
      document.getElementById('logged1').classList.remove('show-cadastro');
      document.getElementById('logged2').classList.add('show-cadastro');
      document.getElementById('logged3').classList.remove('show-cadastro');
      document.getElementById('logged4').classList.add('show-cadastro');

      document.getElementById('logged5').classList.add('show-cadastro');
      document.getElementById('logged6').classList.add('show-cadastro');
    }

    this.authService.displayMenu.subscribe(displayMenu => this.displayMenu = displayMenu);

    const menu = document.getElementById('nav-mobile-2');
    const menuIco = document.getElementById('nav-menu-ico');
    const logoMenu = document.getElementById('nav-menu-logo');
    const logoMenuA = document.getElementById('nav-menu-logo-1');
    const liMenu = document.getElementsByClassName('li-menu-mobile');
    const fixedNavDois = document.getElementById('hide-nav-2');

    menuIco.addEventListener("click", () => {
      var verifyclass = menu.classList.contains("hide-menu-mobile");

      if(verifyclass) {
        menu.classList.remove("hide-menu-mobile");
        fixedNavDois.classList.add('top-fixed');
      }
      else {
        menu.classList.add("hide-menu-mobile");
        fixedNavDois.classList.remove('top-fixed');
      }
    });

    logoMenu.addEventListener("click", () => {
      this.router.navigate(['']);
    });

    logoMenuA.addEventListener("click", () => {
      this.router.navigate(['']);
    });

    for(let i = 0; i < liMenu.length; i++) {
      liMenu[i].addEventListener("click", () => {
        menu.classList.add("hide-menu-mobile");
        fixedNavDois.classList.remove('top-fixed');
      });
    }
  }
}
