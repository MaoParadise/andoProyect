import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralValitationService {

  constructor() { }


  validateSpecialChar(text){
    let out: boolean = true;
    var filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890_-';

    for (var i=0; i<text.length; i++){
      if(out){
       if (!(filtro.indexOf(text.charAt(i)) > -1)) {
        out = false;
       }
      }
    }
    return out;
  }
  

  lookRepeat( dataPush: any ,push : any){
    let repeat = 0;
    for(let i = 0; i < dataPush.length ; i++){
      if(dataPush[i].NAMECATEGORY == push.NAMECATEGORY){
        repeat++;
      }
    }
    if(repeat > 1){
      return true;
    }else{
      return false;
    }
  }


  ItsPresent(NoneDataPush: any, noneData: any){
    let itsPresent: boolean = false;
    for(let i = 0; i < NoneDataPush.length; i++){
      if(NoneDataPush[i].NAMECATEGORY == noneData){
        itsPresent = true;
        return itsPresent;
      }
    }
    return itsPresent;
  }

  separateAndReplace(sentence: string){
    return sentence.replace(/ /g, "").split(';')
  }


}
