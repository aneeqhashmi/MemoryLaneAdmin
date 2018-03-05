import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturedComponent } from './components/featured.component';

const appRoutes: Routes = [
  { path: 'featured', component: FeaturedComponent, canActivate: [] },
];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);