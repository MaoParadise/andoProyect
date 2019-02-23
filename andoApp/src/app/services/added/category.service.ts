import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { SetupService } from '../setup/setup.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_URI = this.setup.API_URI;

  constructor(private http: HttpClient, private setup: SetupService) { }

  getCategoryLike(query: string){
    return this.http.post(`${this.API_URI}/categorys/search/`, {
      query: query
    });
  }

  makeUserPreferences(dataString:string, currentMail: string){
    return this.http.post(`${this.API_URI}/categorys/preference/`, 
    {
      email: currentMail,
      data: dataString
    });
  }

  UpdateUserPreferences(PREFERENCESTRING:string, currentMail: string){
    return this.http.put(`${this.API_URI}/categorys/preference/${currentMail}`, 
    {
      PREFERENCESTRING: PREFERENCESTRING,
      DATE: null
    });
  }

  getPreferences(query: string){
    return this.http.post(`${this.API_URI}/categorys/get/preference/`, {
      query: query
    });
  }


}
