import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { DataModule } from './data/data.module';
import { LayoutModule } from './layout/layout.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        LayoutModule,
        DataModule,
        HomeModule,
        AppRoutingModule
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
