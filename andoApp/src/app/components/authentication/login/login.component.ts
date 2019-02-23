import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthenticationServiceService } from 'src/app/services/authentication/authentication-service.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralValitationService } from 'src/app/services/general-valitation.service';
import { SetupService } from 'src/app/services/setup/setup.service';
import { CategoryService } from 'src/app/services/added/category.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: any = {
    EMAIL: '',
    USER: '',
    PASSWORD: '',
    PUBLICNAME: '',
    URLPROFILEPICTURE: 'no-profile',
    ACTIVEPROFILE: 0,
    PREFERENCESTRING: ''
  }

  data: any ={
    message: '',
    success: false,
    user: ''
  }

  prefData: any;
  pref: string = ''

  constructor(
    private auth: AuthenticationServiceService,
    private valitate: GeneralValitationService, 
    private setup: SetupService,
    private preferences: CategoryService
    ) { }

  ngOnInit() {

  }

  messageHtml = document.querySelector(".registerMessage");
  message = 'Este es un mensaje';

  emailError = '';
  passwordError = '';

  showMessage(message){
    document.querySelector(".registerMessage").setAttribute('style',`display: block;`);
    document.querySelector('.loginForm').setAttribute('style',`display: none`);
    this.message = message;
  }

  showEmailError(message){
    document.querySelector("#emailError").setAttribute('style',`display: block`);
    this.emailError = message
  }
  hideEmailError(){
    document.querySelector("#emailError").setAttribute('style',`display: none`);
  }
  showPasswordError(message){
    document.querySelector("#passwordError").setAttribute('style',`display: block`);
    this.passwordError = message
  }
  hidePasswordError(){
    document.querySelector("#passwordError").setAttribute('style',`display: none`);
  }

  validateUser(){
    let emailBool = false;
    let passwordBool = false;

    if(this.user.EMAIL == ''){
      this.showEmailError('Este campo es obligatorio');
      emailBool = false;
    }else if(this.valitate.validateSpecialChar(this.user.EMAIL) == false){
      this.showEmailError('El campo de usuario no permite caracteres especiales');
      emailBool = false;
    }else{
      emailBool = true;
      this.hideEmailError();
    }

    if(this.user.PASSWORD == ''){
      this.showPasswordError('La contraseña es un campo obligatorio');
      passwordBool = false;
    }else{
      passwordBool = true;
      this.hidePasswordError();
    }

    if(emailBool && passwordBool){
      this.auth.checkUser(this.user.EMAIL,this.user.PASSWORD, false).subscribe(
        (res) =>{
          this.data = res;
          if(this.data.success){
            this.setup.createCondition();
            this.setup.getSessionOrLocalStoragesLoginData(this.setup.getCondition(),this.data.token, this.data.user)
            this.auth.showUser(this.data.user).subscribe(
              (res)=>{
                this.user = res;
                console.log(this.user);
                this.setup.getSessionOrLocalStoragesLoginUser(this.setup.getCondition(),this.user.URLPROFILEPICTURE,this.user.EMAIL, this.user.PREFERENCESTRING);
              },(err) =>{
                this.auth.showUserAlone(this.data.user).subscribe(
                  (res)=>{
                    this.user = res;
                    console.log(this.user);
                    this.setup.getSessionOrLocalStoragesLoginUser(this.setup.getCondition(),this.user.URLPROFILEPICTURE,this.user.EMAIL, '');
                  },(err) =>{
                    console.log(err)
                  }
                );
              }
            );
            
            window.location.href = "/main";
            console.log(this.auth.isLoggedIn);
          }else{
            this.showMessage('Ocurrió un error en la autentificación de tus datos, verifica que la contraseña o el usuario que ingresaste coincidan con los que tenemos registrados')
          }

          
        },
        (err)=>{
          console.log(err);
        }
      )
      
    }


  }  

}
