import { Component, OnInit } from '@angular/core';
import {AuthenticationServiceService} from '../../services/authentication/authentication-service.service'
import { Router } from '@angular/router';
import { SetupService } from 'src/app/services/setup/setup.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

 
  CurrentUser = this.setup.getUser(this.setup.getCondition());
  CurrentProfileImage = this.setup.getProfileImage(this.setup.getCondition());

  constructor(
    private auth: AuthenticationServiceService, 
    private router: Router,
    private setup: SetupService
    ) { }

  Auto: boolean = this.auth.isLoggedIn;

  ngOnInit() {
  }

  showProfile(username:string){
    this.router.navigate([`profile/${username}`]);
  }

}
