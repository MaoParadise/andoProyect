import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/authentication/authentication-service.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';
import { GeneralValitationService } from 'src/app/services/general-valitation.service';
import { SetupService } from 'src/app/services/setup/setup.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    EMAIL: '',
    USER: '',
    PASSWORD: '',
    PUBLICNAME: '',
    URLPROFILEPICTURE: 'no-profile',
    ACTIVEPROFILE: 0
  }

  passwordValue: string = '';

  data: any ={
    message: '',
    success: false
  }

  constructor(
    private auth: AuthenticationServiceService, 
    private router: Router, 
    private valitate: GeneralValitationService,
    private setup: SetupService
    ) { 

  }

  ngOnInit() {
    document.querySelector("#emailError").setAttribute('style',`display: none`);
    document.querySelector("#userError").setAttribute('style',`display: none`);
    document.querySelector("#passwordError").setAttribute('style',`display: none`);
  }


// method and Atributtes of the formularie HTML

  messageHtml = document.querySelector(".registerMessage");
  message = 'Este es un mensaje';

  emailError = '';
  userError = '';
  passwordError = '';
  passwordError2 = '';
  showMessage(){
    document.querySelector(".registerMessage").setAttribute('style',`height: 600px; display: block;`);
    document.querySelector('.registerUser').setAttribute('style',`display: none`);
  }
  showEmailError(message){
    document.querySelector("#emailError").setAttribute('style',`display: block`);
    this.emailError = message
  }
  hideEmailError(){
    document.querySelector("#emailError").setAttribute('style',`display: none`);
  }
  showUserError(message){
    document.querySelector("#userError").setAttribute('style',`display: block`);
    this.userError = message
  }
  hideUserError(){
    document.querySelector("#userError").setAttribute('style',`display: none`);
  }
  showPasswordError(message){
    document.querySelector("#passwordError").setAttribute('style',`display: block`);
    this.passwordError = message
  }
  hidePasswordError(){
    document.querySelector("#passwordError").setAttribute('style',`display: none`);
  }
  showPasswordError2(message){
    document.querySelector("#passwordError2").setAttribute('style',`display: block`);
    this.passwordError2 = message
  }
  hidePasswordError2(){
    document.querySelector("#passwordError2").setAttribute('style',`display: none`);
  }
// ---------------------------------------------------------------------


// variables of the formularie html

  saveUser(){
    let userBool = false;
    let emailBool = false;
    let passwordBool = false;
    let passwordBool2 = false;

// Validacion de los campos 
    if(this.user.EMAIL == ''){
      this.showEmailError('El campo de email es obligatorio');
      emailBool = false;
    }else if(!(this.user.EMAIL.indexOf('@') > -1)){
     this.showEmailError('El campo email no es un correo electrónico');
     emailBool = false;
    }else{
      this.hideEmailError();
      emailBool = true;
    }
    
    if(this.user.USER == ''){
      this.showUserError('El campo de usuario es obligatorio');
      userBool = false;
    }else if(this.valitate.validateSpecialChar(this.user.USER) == false){
      this.showUserError('El campo de usuario no permite caracteres especiales');
      userBool = false;
    }else{
      userBool = true;
      this.hideUserError();
    }

    if(this.user.PASSWORD == ''){
      this.showPasswordError('La contraseña es un campo obligatorio');
      passwordBool = false;
    }else{
      passwordBool = true;
      this.hidePasswordError();
    }

    if(this.user.PASSWORD != this.passwordValue){
      this.showPasswordError2('Las contraseñas no coinciden ');
      document.querySelector("#passwordError2").classList.add("text-danger");
      passwordBool2 = false;
    }else if(this.passwordValue == ''){
      this.showPasswordError2('La contraseña es un campo obligatorio');
      document.querySelector("#passwordError2").classList.add("text-danger");
      passwordBool2 = false;
    }else{
      this.showPasswordError2('Las contraseñas coinciden ');
      document.querySelector("#passwordError2").classList.remove("text-danger");
      document.querySelector("#passwordError2").setAttribute('style',`color: #4BBF73;`);
      passwordBool2 = true;
    }
//--------------------------------------------------------------------

  if(userBool && emailBool && passwordBool && passwordBool2){
    this.auth.saveUser(this.user.EMAIL,this.user.USER,this.user.PASSWORD,this.user.PUBLICNAME,this.user.URLPROFILEPICTURE)
      .subscribe (
        res => {
          this.data = res;
          console.log(this.data.success);
          this.showMessage();
          if(this.data.success){
            this.setup.createCondition();
            this.setup.getSessionOrLocalStoragesRegister(this.setup.getCondition(), this.data.token, this.data.user,this.user.EMAIL);
            this.message = `Felicidades, ya puedes ingresar y empezar a personalizar tu perfil y contenido que quieres ver, recuerda que te llegara un correo de validación a la siguiente dirección : ${(this.data.user).substring(0,4)} ********* ${(this.data.user).substring(this.data.user.length - 6 , this.data.user.length)}`;
          }else{
            this.message = `Ocurrió un error inesperado al momento de procesar tu registro, revisa que no tengas una cuenta ya asociada al correo que ingresaste`;
          }
        },
        (err) =>{
          console.log(err);
          this.showMessage();
          this.message = 'Ocurrió un error inesperado al momento de procesar tu registro proveniente del servidor, intentelo mas tarde';
        } 
      )
  }
  } 



}
