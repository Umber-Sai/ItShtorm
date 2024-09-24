import { ElementRef, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  navPoints = NavPoints;


  navigateTo(id: NavPoints) : void {
    console.log(this.router.url)
    if(this.router.url !== '/') {
      this.router.navigate(['/']);
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if(el) {
        el!.scrollIntoView({'behavior': 'smooth'})
      }
    }, 10)
    
  }
}
