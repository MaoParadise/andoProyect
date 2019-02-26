import { Injectable } from '@angular/core';
import { Media } from 'src/app/models/Media';
import { HttpClient } from '@angular/common/http';
import { SetupService } from '../setup/setup.service';
import { GeneralValitationService } from '../general-valitation.service';
import { SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class LibraryAddedService {

  uploadProccess: boolean = true;
  frameProccess: boolean = false;
  completeProccess: boolean = false;
  PARCIALTITLE : string = '';
  PARCIALEPISODE: number = 0;
  _media: Media = {
    IDMEDIA: 0,
    TITLE: '',
    DESCRIPTION: '',
    TOTALEPISODES: 0
  };
  rawFrameEmbed = '';
  frameEmbed: SafeHtml;


  constructor(
    private http: HttpClient, 
    private setup: SetupService,
    private generalValidation: GeneralValitationService
    ) { }

  restarInformation(){
    this.uploadProccess = true;
    this.frameProccess = false;
    this.completeProccess = false;
    this.PARCIALEPISODE = 0;
    this.PARCIALTITLE= '';
    this._media = {
      IDMEDIA: 0,
      TITLE: '',
      DESCRIPTION: '',
      TOTALEPISODES: 0
    };
    this.rawFrameEmbed = '';
  }
}
