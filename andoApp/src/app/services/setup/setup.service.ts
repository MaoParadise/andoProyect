import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  API_URI: string = 'http://localhost:3000/api';

  constructor() { }

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
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('CurrentUser', user);
    }

  }

  getSessionOrLocalStoragesLoginUser(condition: boolean, profileImage: string, email: string){
    if(condition){
        localStorage.setItem('profileImage', profileImage);
        localStorage.setItem('currentMail', email);
        localStorage.setItem('currentPreferences', 'no-references');
    }else{
        sessionStorage.setItem('profileImage', profileImage);
        sessionStorage.setItem('currentMail', email);
        sessionStorage.setItem('currentPreferences', 'no-references');
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
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('CurrentUser', user);
        sessionStorage.setItem('currentMail', email);
        sessionStorage.setItem('profileImage','no-profile'); 
        sessionStorage.setItem('currentPreferences', 'no-references');
    }
  }
//-------------------------------------------------------------------------------------------------
setCurrentPreferences(condition:boolean, preferences: string){
  if(condition){
    localStorage.setItem('currentPreferences', preferences); 
  }else{
    sessionStorage.setItem('currentPreferences', preferences); 
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
      sessionStorage.setItem('profileImage', profileImage); 
  }
}

getCurrentPreferences(condition:boolean){
  if(condition){
    return localStorage.getItem('currentPreferences');
  }else{
    return sessionStorage.getItem('currentPreferences');
  }
}


getUser(condition:boolean){
    if(condition){
      return localStorage.getItem('CurrentUser');
    }else{
      return sessionStorage.getItem('CurrentUser');
    }
  }

  getMail(condition:boolean){
    if(condition){
      return localStorage.getItem('currentMail');
    }else{
      return sessionStorage.getItem('currentMail');
    }
  }

  getProfileImage(condition:boolean){
    if(condition){
      return localStorage.getItem('profileImage');
    }else{
      return sessionStorage.getItem('profileImage');
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
      sessionStorage.removeItem('CurrentUser');
      sessionStorage.removeItem('profileImage');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('currentMail');
      sessionStorage.removeItem('currentPreferences');
    }
    window.location.href = "/main";
  }

  changeOfSession(condition: boolean){
    if(condition){
      localStorage.setItem('CurrentUser', sessionStorage.getItem('CurrentUser'));
      localStorage.setItem('profileImage', sessionStorage.getItem('profileImage'));
      localStorage.setItem('token', sessionStorage.getItem('token'));
      localStorage.setItem('currentMail', sessionStorage.getItem('currentMail'));
      localStorage.setItem('currentPreferences', sessionStorage.getItem('currentPreferences'));

      sessionStorage.removeItem('CurrentUser');
      sessionStorage.removeItem('profileImage');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('currentMail');
      sessionStorage.removeItem('currentPreferences');
    }else{
      sessionStorage.setItem('CurrentUser', localStorage.getItem('CurrentUser'));
      sessionStorage.setItem('profileImage', localStorage.getItem('profileImage'));
      sessionStorage.setItem('token', localStorage.getItem('token'));
      sessionStorage.setItem('currentMail', localStorage.getItem('currentMail'));
      sessionStorage.setItem('currentPreferences', localStorage.getItem('currentPreferences'));

      localStorage.removeItem('CurrentUser');
      localStorage.removeItem('profileImage');
      localStorage.removeItem('token');
      localStorage.removeItem('currentMail');
      localStorage.removeItem('currentPreferences');
    }
  }
  


}
