import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  saveUserPreferences(data:any, currentMail: string){
    let DataSend: any = [];
    for(let i = 0; i < data.length; i++){
      DataSend.push(
        {
        EMAIL: currentMail,
        IDCATEGORY: data[i].IDCATEGORY,
        DATEPREFERENCE: 'CURRENT_TIMESTAMP'
        }
      )
    }
    return this.http.post(`${this.API_URI}/categorys/preference/`, DataSend);
  }

  makeUserPreferences(data:any){
    return this.http.post(`${this.API_URI}/categorys/make/`, data[1]);
  }


}
