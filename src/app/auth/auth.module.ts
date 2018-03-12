import { EmailPasswordLoginComponent } from './components/emailPasswordLogin/emailPasswordLogin.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ng2-bootstrap';

import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';

import { routing } from './auth.routing';


@NgModule({
  declarations: [
    EmailPasswordLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    routing
  ],
  providers: [
    AuthGuard,
    UnauthGuard
  ]
})
export class AuthModule {}

export {
  AuthGuard,
  UnauthGuard
};