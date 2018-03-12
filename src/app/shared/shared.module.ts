import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemoryCardComponent } from './components/memory-card/memory-card.component';
import { MemoryDetailComponent } from './components/memory-detail/memory-detail.component';
import { PolyManagerService } from './services/poly-manager.service';
import { MomentModule } from 'angular2-moment';
import { RouterModule } from '@angular/router';
import { ModalGalleryModule } from 'angular-modal-gallery';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    RouterModule,
    ModalGalleryModule,
    HttpClientModule
  ],
  declarations: [
    MemoryCardComponent,
    MemoryDetailComponent
  ],
  exports: [
    MemoryCardComponent,
    MemoryDetailComponent
  ],
  providers: [
    PolyManagerService
  ]
})
export class SharedModule { }