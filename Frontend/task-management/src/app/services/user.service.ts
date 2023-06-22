import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import urlList from '../models/Urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  public addUser(user: User): Observable<User> {
    return this.http.post<any>(urlList.user.CREATE_USER, user);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(urlList.user.GET_USERS);
  }

  public getUserById(userId: number): Observable<User> {
    return this.http.get<User>(urlList.user.GET_USER_BY_ID + userId);
  }
}
