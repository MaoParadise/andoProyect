import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';
import { SetupService } from '../setup/setup.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  API_URI = 'http://localhost:3000/api';
  loggedInStatus = false;
  public userLoggedMail: string;
  public userLoggedName: string;

  constructor(
    private http: HttpClient,
    private router:Router,
    private setup: SetupService) { }


  getUserLoggedIn(){
    return JSON.parse(localStorage.getItem('currentMail'))
  }

  get isLoggedIn(){
    if(this.setup.getCondition()){
      return !!this.setup.getToken(this.setup.getCondition());
    }else{
      return !!this.setup.getToken(this.setup.getCondition());
    }
  }



  saveUser(email, user, password, publicname, profilepic){
    return this.http.post(`${this.API_URI}/users`, {
      EMAIL: email,
      USER: user,
      PASSWORD: password,
      PUBLICNAME: publicname,
      URLPROFILEPICTURE: profilepic
    });
  }

  updateUser(username: string, updatedUser: User): Observable<any> {
    return this.http.put(`${this.API_URI}/users/${username}`, updatedUser);
  }


  
  checkUser(username, password, value: boolean){

    return this.http.post(`${this.API_URI}/users/auth/user`, {
      username: username,
      password: password,
    },{
      observe: 'body',
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json',
      withCredentials: value
    });

  }

  showUser(username: string){
    return this.http.get(`http://localhost:3000/api/users/${username}`);
  }


  showUserAlone(username: string){
    return this.http.get(`http://localhost:3000/api/users/alone/${username}`);
  }

  getToken(condition: boolean){
    return this.setup.getToken(condition);
  }


}
