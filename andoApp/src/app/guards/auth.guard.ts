import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from '../services/authentication/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthenticationServiceService, private router: Router){

  }

  canActivate(): boolean{
    if(this.auth.isLoggedIn){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
