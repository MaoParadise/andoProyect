import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerLoaderService {

  constructor(
    
  ) { }

  start(){
    document.querySelector('.spinner-container').setAttribute('style',`display: block`);
    document.querySelector('.spinner').setAttribute('style',`display: block`);
  }

  stop(){
    document.querySelector('.spinner-container').setAttribute('style',`display: none`);
    document.querySelector('.spinner').setAttribute('style',`display: none`);
  }

  stopTimer(interval: number){
    setInterval(()=>{
      document.querySelector('.spinner-container').setAttribute('style',`display: none`);
      document.querySelector('.spinner').setAttribute('style',`display: none`);
    }, interval)
  }

}
