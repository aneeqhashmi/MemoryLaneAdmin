import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'global', pathMatch: 'full'},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);