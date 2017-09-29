import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule, routedComponents } from './home-routing.module';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule
  ],
  declarations: [ routedComponents ]
})
export class HomeModule { }
