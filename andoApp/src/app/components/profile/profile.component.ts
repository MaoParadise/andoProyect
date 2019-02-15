import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/authentication/authentication-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { SetupService } from 'src/app/services/setup/setup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private auth: AuthenticationServiceService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private setup: SetupService
    ) { }


  user: any = {
    EMAIL: '',
    USER: '',
    PASSWORD: '',
    PUBLICNAME: '',
    URLPROFILEPICTURE: 'no-profile',
    ACTIVEPROFILE: 0
  }



  ngOnInit() {
    this.confirmUser();
  }

  confirmUser(){

    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.auth.showUser(params.id)
      .subscribe((res)=>{
        this.user = res;
      },
      (err)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/login']);
          }
        }
      });
    }else{

      this.router.navigate(['/login']);
    }
  }


  updateUser(){
    delete this.user.PASSWORD;
    this.auth.updateUser(this.user.EMAIL,this.user).subscribe(
      res =>{
        this.setup.getSessionOrLocalProfileImage(this.setup.getCondition(), this.user.URLPROFILEPICTURE);
        window.location.href = "/main";
      }, 
      err => console.error(err)
    )
  }



}
