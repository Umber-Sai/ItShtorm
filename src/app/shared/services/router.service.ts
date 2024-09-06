import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';



enum NavPoints {
  contacts = 'contacts',
  services = 'services',
  aboutUs = 'aboutUs',
  reviews = 'reviews',

}

@Injectable({
  providedIn: 'root'
})
export class RouterService {


  constructor(
    private router: Router
  ) { }

  navPoints = NavPoints;


  navigateTo(id: NavPoints) : void {
    this.router.navigate(['/']);
    setTimeout(() => {
      const el = document.getElementById(id);
      if(el) {
        el!.scrollIntoView({'behavior': 'smooth'})
      }
    }, 10)
    
  }
}
