import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DthreetMapDirective } from './dthreet-map.directive';

export const sharedComponents = [DthreetMapDirective];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [sharedComponents],
  declarations: [sharedComponents]
})
export class DthreetMapModule {
}
