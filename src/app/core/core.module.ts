import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowRefService } from './window-ref.service';
import { LocalStorageService } from './local-storage.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ WindowRefService, LocalStorageService ]
})
export class CoreModule { }
