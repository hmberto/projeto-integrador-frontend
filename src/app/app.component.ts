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
    const cart = window.localStorage.getItem("cart");
    const getCart = JSON.parse(cart);
    
    if(getCart != null) {
      this.cartService.items = getCart;
    }

    this.qnt = [];
    this.qnt.push(this.cartService.items.length);
    return this.qnt;
  }

  ngOnInit(){
    if(window.location.protocol == "http:" && window.location.host != "localhost:4200") {
      window.location.href = "https://" + window.location.host
    }
    
    this.updateNav();

    this.eventListSearch()

    document.getElementById('logged4').addEventListener("click", () => {
      menu.classList.add("hide-menu-mobile");
      fixedNavDois.classList.remove('top-fixed');
    });

    document.getElementById('logged6').addEventListener("click", () => {
      menu.classList.add("hide-menu-mobile");
      fixedNavDois.classList.remove('top-fixed');
    });

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
        document.getElementById("nav-menu-logo").classList.remove("wdt-a");
        document.getElementById("nav-menu-logo").classList.add("wdt-b");
      }
      else {
        menu.classList.add("hide-menu-mobile");
        fixedNavDois.classList.remove('top-fixed');
        document.getElementById("nav-menu-logo").classList.add("wdt-a");
        document.getElementById("nav-menu-logo").classList.remove("wdt-b");
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

  eventListSearch() {
    const search1 = (<HTMLSelectElement>document.getElementById('txtSearch'));
    const search2 = (<HTMLSelectElement>document.getElementById('txtSearchMobile'));

    let handleEvent = (event: KeyboardEvent) => {
      var key = event.which || event.keyCode;
      if (key == 13) {
        this.search();
      }
    }
    
    search1.addEventListener('keyup', function(e){
      var key = e.which || e.keyCode;
      if (key == 13) {
        handleEvent(<any>e);
      }
    });

    search2.addEventListener('keyup', function(e){
      var key = e.which || e.keyCode;
      if (key == 13) {
        handleEvent(<any>e);
      }
    });
  }

  search() {
    const search1 = (<HTMLSelectElement>document.getElementById('txtSearch'));
    const search2 = (<HTMLSelectElement>document.getElementById('txtSearchMobile'));
    if(search1.value.length > 0) {
      window.location.href = window.location.protocol + "//" + window.location.host + "/pesquisar?pesquisa=" + search1.value
    }
    else if(search2.value.length) {
      window.location.href = window.location.protocol + "//" + window.location.host + "/pesquisar?pesquisa=" + search2.value
    }
  }

  showSearch() {
    const search2 = (<HTMLSelectElement>document.getElementById('txtSearchMobile'));

    if(document.getElementById("divSearchMobile").classList.contains("hide-search")) {
      document.getElementById("divSearchMobile").classList.remove("hide-search");
      document.getElementById("divSearchMobile").classList.add("show-search");
      search2.focus();
    }
    else {
      document.getElementById("divSearchMobile").classList.remove("show-search");
      document.getElementById("divSearchMobile").classList.add("hide-search");
    }
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
    }
    else {
      document.getElementById('logged1').classList.remove('show-cadastro');
      document.getElementById('logged2').classList.add('show-cadastro');
      document.getElementById('logged3').classList.remove('show-cadastro');
      document.getElementById('logged4').classList.add('show-cadastro');

      document.getElementById('logged5').classList.add('show-cadastro');
      document.getElementById('logged6').classList.add('show-cadastro');
    }
  }
}
