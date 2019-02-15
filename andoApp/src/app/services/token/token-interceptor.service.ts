import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationServiceService } from '../authentication/authentication-service.service'
import { SetupService } from '../setup/setup.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private setup: SetupService
  ) { }

  intercept(req, next){
    let authService = this.injector.get(AuthenticationServiceService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken(this.setup.getCondition())}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
