import { Injectable } from '@angular/core';
import { SetupService } from '../setup/setup.service';
import { HttpClient } from '@angular/common/http';
import { GeneralValitationService } from '../general-valitation.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  API_URI = this.setup.API_URI;


  //these variables are for the component infromation-modal of the folder profile

  localDataReferenceString: string = '';
  dataReferenceString: string = '';
  dataReference: any;
  dataPush: any = [];
  NonedataPush: any = [];
  InvalidDataPush: any = [];
  maxData: number = 0;
  //--------------------------------------------------------


  constructor(
    private http: HttpClient, 
    private setup: SetupService,
    private generalValidation: GeneralValitationService
    ) { }

  restartInformationModalVariables(){
    this.localDataReferenceString = ''
    this.dataReferenceString = '';
    this.dataPush= [];
    this.NonedataPush = [];
    this.InvalidDataPush = [];
    this.maxData = 0;
  }

  getUploadReferences(id:number, email: string){
    return this.http.post(`${this.API_URI}/reference/get/`,{
      IDMEDIA: id,
      EMAIL: email
    })
  }

  setUploadReferences(condition:boolean, id:number, email: string, reference: string){
    if(condition){
      return this.http.post(`${this.API_URI}/reference/insert/`,{
        IDMEDIA: id,
        EMAIL: email,
        REFERENCEUPLOADSTRING: reference
      });
    }else{
      return this.http.put(`${this.API_URI}/reference/update/`,{
        IDMEDIA: id,
        EMAIL: email,
        REFERENCEUPLOADSTRING: reference
      });
    }
  }

  addPushData(){
    if(this.dataReferenceString != 'no-references'){
      let ArrayString = this.generalValidation.separateAndReplaceAndMinus(this.dataReferenceString);
      for(let i = 0; i < ArrayString.length; i++){
        this.dataPush.push(
          {
            NAMEREFERENCE : ArrayString[i]
          }
        )
        this.maxData++;
      }
    }
  }

}
