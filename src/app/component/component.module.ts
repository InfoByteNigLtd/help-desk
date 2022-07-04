import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentPageRoutingModule } from './component-routing.module';
import { IconFontComponent } from './font/font.component';
import { InputComponent } from './input/input.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentPageRoutingModule,
  ],
  declarations: [IconFontComponent, InputComponent, CommentComponent,],
  exports: [
    IconFontComponent,
    InputComponent,
    CommentComponent,
  ],
})
export class ComponentPageModule {}
