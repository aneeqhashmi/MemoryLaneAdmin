import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailPasswordLoginComponent } from './components/emailPasswordLogin/emailPasswordLogin.component';
// import { RecoverPasswordComponent } from './components/recoverPassword/recoverPassword.component';
// import { RegisterComponent } from './components/register/register.component';


const appRoutes: Routes = [
  { path: 'login', component: EmailPasswordLoginComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);