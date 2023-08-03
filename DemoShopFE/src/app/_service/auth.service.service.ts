import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private accessToken: string|any;

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  login(username: string, password: string) {
    return this.http.post('http://localhost:4000/api/users/login', { username, password });
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }





  register(
    username: string,
    email: string,
    full_name: string,
    phone: string,
    address: string,
    gender: string,
    birthday: Number,
    password: string,
    password_confirmation: string,

  ): Observable<any> {
    const url = 'http://localhost:4000/api/users/register'; // URL đến mock API
    const body = {
      username,
      email,
      full_name,
      phone,
      address,
      gender,
      birthday,
      password,
      password_confirmation,

    }; // Body của request

    return this.http.post(url, body); // Gửi request và trả về response dưới dạng Observable
  }
  //adding product in
  // checkDuplicateUsername(username: string) {
  //   return this.http.get<any>(`http://localhost:4000/api/users/${username}`);
  // }

  // checkDuplicateEmail(email: string) {
  //   return this.http.get<any>(`/api/check-email/${email}`);
  // }

  // checkDuplicateFullName(fullName: string) {
  //   return this.http.get<any>(`/api/check-fullname/${fullName}`);
  // }
}


