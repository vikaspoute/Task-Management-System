import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import urlList from '../models/Urls';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginStatusChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  // Generate token
  public login(loginData: any) {
    return this.http.post(`${urlList.authenticator.LOGIN}`, loginData);
  }

  // Get current user
  public getCurrentUser(email: string) {
    return this.http.get(`${urlList.authenticator.CURRENT_USER}/`+`${email}`);
  }

  // Login user
  public setUserLoginToken(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  // User is login or not logged
  public isUserLogin() {
    const token = localStorage.getItem('token');
    return token == undefined || token == '' || token == null ? false : true;
  }

  // User login
  public userLogin() {
    this.loginStatusChange.next(true); // Emit login event
  }

  // User logout
  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatusChange.next(false); // Emit logout event
    return true;
  }

  // set user details in local storage
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  // get user details from local storage
  public getUser() {
    const rawValue = localStorage.getItem('user');
    if (rawValue != null) {
      return JSON.parse(rawValue);
    } else {
      this.logOut();
      return null;
    }
  }

  // Get login status change observable
  public getLoginStatusChangeObservable() {
    return this.loginStatusChange.asObservable();
  }
}
