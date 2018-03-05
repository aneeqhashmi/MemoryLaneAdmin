import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalComponent } from './components/global.component';
import { MemoryDetailComponent } from '../shared/components/memory-detail/memory-detail.component';

const appRoutes: Routes = [
  { path: 'global', component: GlobalComponent, canActivate: [] },
  { path: 'memory/:uid', component: MemoryDetailComponent, canActivate: [] },
];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);