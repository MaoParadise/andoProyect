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
  
}
