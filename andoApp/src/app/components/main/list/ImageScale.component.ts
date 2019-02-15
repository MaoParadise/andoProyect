import { Component, Input } from '@angular/core';
import { trigger,style,transition,animate, state } from '@angular/animations';

@Component({
    selector: 'app-image-scale',
    template: `<img class='img img-fluid' [@Esc]='escala' (mouseover)="escalar($event)" (mouseout)="desescalar()" [(src)]="src" >`,
    styleUrls: ['./list.component.css'],
    animations: [
      trigger('Esc', [
        state(
          'escalar',
          style({
            transform: 'scale(1.25)',
            zIndex: 15600000
          })
        ),
        state(
          'desescalar',
          style({
            transform: 'scale(1)',
            zIndex: 0
          })
        ),
        transition('* => *', animate('500ms ease')),
      ]),
    ],
  })
  export class ImageScaleComponent {
    @Input() src = '';
    escala: string;
  
    constructor() {
    }
    escalar(event) {
      this.escala = 'escalar';
    }
  
    desescalar() {
      this.escala = 'desescalar';
    }
  }