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


}
