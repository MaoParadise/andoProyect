import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MediaComponent } from './components/media/media.component';
import { ListComponent } from './components/main/list/list.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';


// Guards of the authentication credencials and other things
import { AuthGuard } from './guards/auth.guard'
import { NotFoundComponent } from './not-found/not-found.component';
import { MediaLibraryComponent } from './components/profile/media-library/media-library.component';
import { ConfigurationsComponent } from './components/profile/configurations/configurations.component';
import { CookietestComponent } from './components/testing/cookietest/cookietest.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'

  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'media',
    component: MediaComponent
  },
  {
    path: 'list',
    component: ListComponent
  }
  ,
  {
    path: 'register',
    component: RegisterComponent
  }
  ,
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'library',
    component: MediaLibraryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: ConfigurationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'test',
    component: CookietestComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
  
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
