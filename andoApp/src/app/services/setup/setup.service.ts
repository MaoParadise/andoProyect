import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  API_URI: string = 'http://192.168.0.18:3000/api';

  constructor(
    private cookieMaker: CookieService
  ) { }

  // this is the condition with you can set the value of the sessions variables, between LocalStorage and SessionStorage
  createCondition(){
    if(localStorage.getItem('condition') == '' || localStorage.getItem('condition') == null){
      localStorage.setItem('condition', 'true');
    }
  }

  getAPI_URI(){
    return this.API_URI;
  }


//----------------- you can open the sessions variables of the login with this functions-----------

  getSessionOrLocalStoragesLoginData(condition: boolean, token: string, user: string){
    
    if(condition){
        localStorage.setItem('token', token);
        localStorage.setItem('CurrentUser', user);
    }else{
        this.cookieMaker.set('token', token);
        this.cookieMaker.set('CurrentUser', user);
    }

  }

  getSessionOrLocalStoragesLoginUser(condition: boolean, profileImage: string, email: string){
    if(condition){
        localStorage.setItem('profileImage', profileImage);
        localStorage.setItem('currentMail', email);
        localStorage.setItem('currentPreferences', 'no-references');
    }else{
        this.cookieMaker.set('profileImage', profileImage);
        this.cookieMaker.set('currentMail', email);
        this.cookieMaker.set('currentPreferences', 'no-references');
    }
  }
  
//-------------------------------------------------------------------------------------------------


//----------------- you can open the sessions variables of the register with this function-----------
  getSessionOrLocalStoragesRegister(condition: boolean, token: string, user: string, email: string){
    if(condition){
        localStorage.setItem('token', token);
        localStorage.setItem('CurrentUser', user);
        localStorage.setItem('currentMail', email);
        localStorage.setItem('profileImage','no-profile'); 
        localStorage.setItem('currentPreferences', 'no-references');
    }else{
        this.cookieMaker.set('token', token);
        this.cookieMaker.set('CurrentUser', user);
        this.cookieMaker.set('currentMail', email);
        this.cookieMaker.set('profileImage','no-profile'); 
        this.cookieMaker.set('currentPreferences', 'no-references');
    }
  }
//-------------------------------------------------------------------------------------------------
setCurrentPreferences(condition:boolean, preferences: string){
  if(condition){
    localStorage.setItem('currentPreferences', preferences); 
  }else{
    this.cookieMaker.set('currentPreferences', preferences); 
  }
}

setCondition(condition:boolean){
  if(condition){
    localStorage.setItem('condition', condition+''); 
  }else{
    localStorage.setItem('condition', condition+'');  
  }
}




getSessionOrLocalProfileImage(condition: boolean, profileImage: string){
  if(condition){
      localStorage.setItem('profileImage', profileImage); 
  }else{
      this.cookieMaker.set('profileImage', profileImage); 
  }
}

getToken(condition: boolean){
  if(condition){
    return localStorage.getItem('token');
  }else{
    return this.cookieMaker.get('token');
  }
}

getCurrentPreferences(condition:boolean){
  if(condition){
    return localStorage.getItem('currentPreferences');
  }else{
    return this.cookieMaker.get('currentPreferences');
  }
}


getUser(condition:boolean){
    if(condition){
      return localStorage.getItem('CurrentUser');
    }else{
      return this.cookieMaker.get('CurrentUser');
    }
  }

  getMail(condition:boolean){
    if(condition){
      return localStorage.getItem('currentMail');
    }else{
      return this.cookieMaker.get('currentMail');
    }
  }

  getProfileImage(condition:boolean){
    if(condition){
      return localStorage.getItem('profileImage');
    }else{
      return this.cookieMaker.get('profileImage');
    }
  }

  getCondition(){
    var stringValue = localStorage.getItem('condition');
    var boolValue = getBoolean(stringValue); //returns true
    function getBoolean(value){
      switch(value){
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
          return true;
        default: 
          return false;
        }
    }
    return boolValue;
  }


// Funcition of Logout
  userLogout(condition: boolean){
    if(condition){
      localStorage.removeItem('CurrentUser');
      localStorage.removeItem('profileImage');
      localStorage.removeItem('token');
      localStorage.removeItem('currentMail');
      localStorage.removeItem('currentPreferences');
    }else{
      this.cookieMaker.delete('CurrentUser');
      this.cookieMaker.delete('profileImage');
      this.cookieMaker.delete('token');
      this.cookieMaker.delete('currentMail');
      this.cookieMaker.delete('currentPreferences');
    }
    window.location.href = "/main";
  }

  changeOfSession(condition: boolean){
    if(condition){
      localStorage.setItem('CurrentUser', this.cookieMaker.get('CurrentUser'));
      localStorage.setItem('profileImage', this.cookieMaker.get('profileImage'));
      localStorage.setItem('token', this.cookieMaker.get('token'));
      localStorage.setItem('currentMail', this.cookieMaker.get('currentMail'));
      localStorage.setItem('currentPreferences', this.cookieMaker.get('currentPreferences'));

      this.cookieMaker.delete('CurrentUser');
      this.cookieMaker.delete('profileImage');
      this.cookieMaker.delete('token');
      this.cookieMaker.delete('currentMail');
      this.cookieMaker.delete('currentPreferences');
    }else{
      this.cookieMaker.set('CurrentUser', localStorage.getItem('CurrentUser'));
      this.cookieMaker.set('profileImage', localStorage.getItem('profileImage'));
      this.cookieMaker.set('token', localStorage.getItem('token'));
      this.cookieMaker.set('currentMail', localStorage.getItem('currentMail'));
      this.cookieMaker.set('currentPreferences', localStorage.getItem('currentPreferences'));

      localStorage.removeItem('CurrentUser');
      localStorage.removeItem('profileImage');
      localStorage.removeItem('token');
      localStorage.removeItem('currentMail');
      localStorage.removeItem('currentPreferences');
    }
  }
  


}
