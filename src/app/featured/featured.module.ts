import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturedComponent } from './components/featured.component';
import { SharedModule } from './../shared/shared.module';
import { routing } from './featured.routing';
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
    FeaturedComponent
  ],
  exports: [
    FeaturedComponent
  ],
  providers: [
    
  ]
})
export class FeaturedModule { }