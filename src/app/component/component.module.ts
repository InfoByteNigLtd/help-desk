import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentPageRoutingModule } from './component-routing.module';
import { IconFontComponent } from './font/font.component';
import { InputComponent } from './input/input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentPageRoutingModule
  ],
  declarations: [IconFontComponent, InputComponent],
  exports: [
    IconFontComponent,
    InputComponent
  ],
})
export class ComponentPageModule {}
