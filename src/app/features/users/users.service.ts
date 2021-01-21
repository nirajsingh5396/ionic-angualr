import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Users } from './models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = `${environment.API_BASE_URL}/users`;

  /**
   * Setting headers if required
   */

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
}
