import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookietest',
  templateUrl: './cookietest.component.html',
  styleUrls: ['./cookietest.component.css']
})
export class CookietestComponent implements OnInit {

  constructor(private cookieMaker: CookieService) { }

  ngOnInit() {
  }

  createCookie(){
    this.cookieMaker.set('test', 'Hello World');
    this.cookieMaker.set('profileImage', 's');
    this.cookieMaker.set('currentMail', 's');
    this.cookieMaker.set('currentPreferences', 'no-references');
    console.log(this.cookieMaker.get('test'));
  }

}
