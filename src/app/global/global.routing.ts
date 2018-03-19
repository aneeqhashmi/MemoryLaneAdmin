import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalComponent } from './components/global.component';
import { MemoryDetailComponent } from '../shared/components/memory-detail/memory-detail.component';
import { UnauthGuard } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';

const appRoutes: Routes = [
  { path: 'global', component: GlobalComponent, canActivate: [AuthGuard] },
  { path: 'global/:option', component: GlobalComponent, canActivate: [AuthGuard] },
  { path: 'memory/:uid/:option', component: MemoryDetailComponent, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);