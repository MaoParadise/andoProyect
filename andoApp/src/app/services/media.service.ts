import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Media } from '../models/Media';
import { SafeHtml } from '@angular/platform-browser';
import { SetupService } from './setup/setup.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  API_URI = this.setup.API_URI;

  public dataLibrary : any;
  public dataEmbed: any;
  public index: number = 0;

  constructor(private http: HttpClient, private setup: SetupService) { }

  getMediaLike(query){

    return this.http.post(`${this.API_URI}/media/search`, {
      query: query
    });

  }

  saveUpload(mail:string, media: Media, numberEpisode: number, embedFrame: string, quality: string){
    return this.http.post(`${this.API_URI}/media/upload`, {
      email : mail,
      media : media,
      episode : numberEpisode,
      embedFrame : embedFrame,
      quality: quality
    });
  }

  getMediaLibrary(email: string) {
    return this.http.get(`${this.API_URI}/media/library/${email}`);
  }

  getEmbedsFrames(id: number, email: string, numberEpisode: string){
    return this.http.post(`${this.API_URI}/media/embed`, {
      id : id,
      email : email,
      numberEpisode : numberEpisode,
    });
  }



}
