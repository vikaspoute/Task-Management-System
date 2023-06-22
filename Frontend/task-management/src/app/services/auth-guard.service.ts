import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private loginService: LoginService) { }

  public isLoggedIn() {
    return this.loginService.isUserLogin();
  }
}
