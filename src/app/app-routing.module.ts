import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { ActivateGuardGuard } from './guards/activate-guard.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SingupComponent } from './pages/singup/singup.component';
import { ReportComponent } from './pages/report/report.component';
import { DispatchComponent } from './pages/report/dispatch/dispatch.component';
import { ReceivedComponent } from './pages/report/received/received.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Signup', component: SingupComponent },
  { path: 'Home', component: HomeComponent, canActivate: [ActivateGuardGuard] },
  { path: 'contactus', component: ContactusComponent },
  {
    path: 'report',
    component: ReportComponent,
    children: [
      { path: 'dispatch', component: DispatchComponent },
      { path: 'received', component: ReceivedComponent },
    ],
  },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
function redirectUnauthorizedTo(arg0: string[]) {
  throw new Error('Function not implemented.');
}

function redirectLoogeInTo(arg0: string) {
  throw new Error('Function not implemented.');
}
