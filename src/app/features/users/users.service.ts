import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Users } from './models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = `${environment.API_BASE_URL}/users`;
  users: Users[] = [];

  /*
  
  this is how we can also use rest call.
  
    httpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
    });
  
    options = {
      headers: this.httpHeaders,
    };
  
    constructor(private httpClient: HttpClient) { }
  
    getUsers(): Observable<Users[]> {
      const url = `${this.baseUrl}`;
      return this.httpClient.get<Users[]>(url, this.options);
    }
  
    getUserByID(id: number): Observable<Users[]> {
      const user: Users[] = []
      const url = `${this.baseUrl}/${id}`;
      return this.httpClient.get<Users>(url, this.options).pipe(
        map(post => {
          user.push(post);
          return user;
        })
      );
    }
  
    createUser(user: Users): Observable<any> {
      const url = `${this.baseUrl}`;
      return this.httpClient.post<any>(url, user, this.options);
    }
  
    updateUser(user: Users): Observable<any> {
      const url = `${this.baseUrl}/${user.id}`;
      return this.httpClient.put<any>(url, user, this.options);
    }
  
  
    deleteUser(id: number): Observable<any> {
      const url = `${this.baseUrl}/${id}`;
      return this.httpClient.delete<any>(url, this.options)
    }
  
    */

  getUsers(): Observable<Users[]> {
    return of(this.users);
  }

  getUserByUserName(userName: string): Observable<Users> {
    const user = this.users.find(user => user.username === userName);
    if (!user) {
      return of(null);
    }
    return of(user);
  }

  createUser(user: Users): Observable<any> {
    if (user) {
      this.users.push(user);
    }
    return of({ createdUser: true });
  }

  updateUser(user: Users): Observable<any> {
    const isUser = this.users.find(x => x.username.trim() === user.username.trim());
    if (!isUser) {
      return of(null);
    }
    isUser.email = user.email;
    isUser.name = user.name;
    isUser.username = user.username
    return of({ updatedUser: true });

  }


  deleteUser(userName: string): Observable<any> {
    const index = this.users.findIndex(x => x.username.trim() === userName.trim());
    if (index < 0) {
      return of(null);
    }
    this.users.splice(index, 1);
    return of({ isDeleted: true })
  }

}
