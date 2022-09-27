import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SingupComponent } from './pages/singup/singup.component';
import { HeaderComponent } from './pages/header/header.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { ActivateGuardGuard } from './shared/guards/activate-guard.guard';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgxsModule } from '@ngxs/store';
import { AuthService } from './shared/service/auth-Service/auth.service';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { LoginState } from './pages/store/state/userDetails.state';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from 'ngx-ui-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SingupComponent,
    HeaderComponent,
    ContactusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirestoreModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    NgxsModule.forRoot([LoginState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxUiLoaderModule.forRoot({
      // bgsColor: 'red',
      // bgsPosition: POSITION.bottomCenter,
      // bgsSize: 40,
      // bgsType: SPINNER.rectangleBounce, // background spinner type
      // fgsType: SPINNER.chasingDots, // foreground spinner type
      // pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
      // pbThickness: 5, // progress bar thickness
    }),
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  providers: [ActivateGuardGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
