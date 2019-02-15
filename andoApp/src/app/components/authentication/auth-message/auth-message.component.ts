import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-message',
  templateUrl: './auth-message.component.html',
  styleUrls: ['./auth-message.component.css']
})
export class AuthMessageComponent implements OnInit {

  message: String = 'Este es un mensaje por defecto dispuesto a modo de ejemplificacion para el o los desarroladores';
  status: Boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
