import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(private authService: AuthenticationService, private router: Router) {

  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean  {
    return this.authService.isAuthenticated();
  }
}