import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturedComponent } from './components/featured.component';
import { UnauthGuard, AuthGuard } from '../auth/auth.module';

const appRoutes: Routes = [
  { path: 'featured', component: FeaturedComponent, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);