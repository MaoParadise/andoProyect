import { Component, OnInit } from '@angular/core';
import { SpinnerLoaderService } from 'src/app/services/gadgets/spinner-loader/spinner-loader.service';

@Component({
  selector: 'app-spinner-loader',
  templateUrl: './spinner-loader.component.html',
  styleUrls: ['./spinner-loader.component.css']
})
export class SpinnerLoaderComponent implements OnInit {

  constructor(
    private _spinnerService: SpinnerLoaderService
  ) { }

  ngOnInit() {
    
  }

  

}
