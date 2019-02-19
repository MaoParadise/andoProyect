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
  public addEmbed: boolean;
  public index: number = 0;
  public frameActive: number = 0;
  public updateEmbed: boolean = false;



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

  saveUploadEmbed(id: Media, mail:string, numberEpisode: number, embedFrame: string, quality: string){
    return this.http.post(`${this.API_URI}/media/uploadEmbed`, {
      id: id,
      email : mail,
      numberEpisode : numberEpisode,
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

  updatedFrames(id: number, embedFrame: string, quality: string){
    return this.http.put(`${this.API_URI}/media/updateEmbed/`, {
      id : id,
      embedFrame : embedFrame,
      quality : quality,
    });
  }

  deleteFrames(id){
    return this.http.delete(`${this.API_URI}/media/deleteEmbed/${id}`);
  }

  noFrameAvailables( ){
    this.dataEmbed = [{
      DATEUPLOAD: "2010-01-01T01:00:00.000Z",
      EMAIL: this.dataLibrary[this.index].EMAIL,
      EMBEDFRAME: `<div> No frames availables </div>`,
      IDFRAME: 0,
      IDMEDIA: this.dataLibrary[this.index].IDMEDIA,
      NUMBEREPISODE: this.dataLibrary[this.index].NUMBEREPISODE,
      QUALITY: null,
      STATEFRAME: 0,
      STATEUPLOAD: 1,
      UPDATEUPLOAD: "2010-01-01T01:00:00.000Z",
      URLFRAME: null
    }];
    this.addEmbed = false;
    this.frameActive = 0;
    this.updateEmbed = true;
  }

}
