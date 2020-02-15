import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../BackendConfig/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InnerPagesGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn ===  true) {
      window.alert('You should log out to access this page ');
      this.router.navigate(['Profile'])
    }
    return true;
  }
}