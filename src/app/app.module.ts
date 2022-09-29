import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';

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
import { NgChartsModule } from 'ng2-charts';
// import { GraphComponent } from './pages/graph/graph.component';
import { FinancialChartComponent } from './pages/Charts/financial-chart/financial-chart.component';
import { PieChartComponent } from './pages/Charts/pie-chart/pie-chart.component';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { BarChartDaily1Component } from './pages/Charts/bar-chart-daily1/bar-chart-daily1.component';
import { BarChartMonthly1Component } from './pages/Charts/bar-chart-monthly1/bar-chart-monthly1.component';
import { BarChartYearly1Component } from './pages/Charts/bar-chart-yearly1/bar-chart-yearly1.component';
import { BubbleChartComponent } from './pages/Charts/bubble-chart/bubble-chart.component';
import { LineChartComponent } from './pages/Charts/line-chart/line-chart.component';
import { RadarChartComponent } from './pages/Charts/radar-chart/radar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SingupComponent,
    HeaderComponent,
    ContactusComponent,
    // GraphComponent,
    FinancialChartComponent,
    PieChartComponent,
    BarChartDaily1Component,
    BarChartMonthly1Component,
    BarChartYearly1Component,
    BubbleChartComponent,
    LineChartComponent,
    RadarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    FormsModule,

    TabsModule.forRoot(),
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
  providers: [ActivateGuardGuard, AuthService, BsModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
