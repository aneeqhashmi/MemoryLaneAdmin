import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalComponent } from './components/global.component';
import { SharedModule } from './../shared/shared.module';
import { routing } from './global.routing';
import { environment } from './../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    routing
  ],
  declarations: [
    GlobalComponent
  ],
  exports: [
    GlobalComponent
  ],
  providers: [
    
  ]
})
export class GlobalModule { }