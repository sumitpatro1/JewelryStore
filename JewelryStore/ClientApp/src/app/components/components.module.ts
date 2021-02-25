import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContentComponent, ContentWrapperComponent],
  exports: [
    ContentComponent, ContentWrapperComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule
  ]
})
export class ComponentsModule { }
