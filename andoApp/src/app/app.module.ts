import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule } from '@angular/forms';

// imports of interceptors
import { TokenInterceptorService } from './services/token/token-interceptor.service';
import { NotFoundComponent } from './not-found/not-found.component';


//External
import {NgxPaginationModule} from 'ngx-pagination';
import { MediaModalComponent } from './components/profile/media-modal/media-modal.component';
import { CookieService } from 'ngx-cookie-service';
import { ClickOutsideModule } from 'ng4-click-outside';

// Testings components 
import { CookietestComponent } from './components/testing/cookietest/cookietest.component';
import { MediaTestComponent } from './components/testing/media-test/media-test.component';


//-- normal components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MainComponent } from './components/main/main.component';
import { MediaComponent } from './components/media/media.component';
import { ListComponent } from './components/main/list/list.component';
import { ImageScaleComponent } from './components/main/list/ImageScale.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AuthMessageComponent } from './components/authentication/auth-message/auth-message.component';
import { AuthenticationServiceService } from './services/authentication/authentication-service.service';
import { MediaLibraryComponent } from './components/profile/media-library/media-library.component';
import { ConfigurationsComponent } from './components/profile/configurations/configurations.component';
import { InformationModalComponent } from './components/profile/information-modal/information-modal.component';
import { AddModalComponent } from './components/profile/add-modal/add-modal.component';
import { SpinnerLoaderComponent } from './components/gadgets/spinner-loader/spinner-loader.component';
import { EmbedComponent } from './components/media/embed/embed.component';





@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainComponent,
    MediaComponent,
    ListComponent,
    ImageScaleComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    AuthMessageComponent,
    NotFoundComponent,
    MediaLibraryComponent,
    MediaModalComponent,
    ConfigurationsComponent,
    CookietestComponent,
    InformationModalComponent,
    AddModalComponent,
    SpinnerLoaderComponent,
    MediaTestComponent,
    EmbedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ClickOutsideModule
  ],
  providers: [AuthenticationServiceService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
    }, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
