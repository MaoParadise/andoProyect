import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SetupService } from '../setup/setup.service';

@Injectable({
  providedIn: 'root'
})
export class PublicMediaService {

  API_URI = this.setup.API_URI;

  constructor(
    private http: HttpClient, 
    private setup: SetupService
  ) { }

  getPublicEmbedsFrames(id: number, numberEpisode: string){
    return this.http.post(`${this.API_URI}/media/publicEmbed`, {
      id : id,
      numberEpisode : numberEpisode,
    });
  }


  processPublicFrame(data: any){
    var map = {};
    var result = [];
    for(let i= 0, length = data.length; i < length ; i++ ){
      if(!(data[i].EMAIL in map)){ 
        map[data[i].EMAIL] = true;
        result.push(data[i].EMAIL);
      }
    }
    return result;
  }


  getFramesByMail(data: any, mail: string){
    var result = [];
    for(let i= 0, length = data.length; i < length ; i++ ){
      if(data[i].EMAIL == mail){ 
        result.push(data[i]);
      }
    }
    return result;
  }

}
