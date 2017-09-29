import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CurrencyTileComponent} from './currency-tile/currency-tile.component';
import {HomeComponent} from './home/home.component';
import {CurrencyListComponent} from './currency-list/currency-list.component';
import {CoinMarketCapService} from './shared/coin-market-cap.service';

const appRoutes: Routes = [
    {path: '**', component: HomeComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        CurrencyTileComponent,
        HomeComponent,
        CurrencyListComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes
        ),
        HttpModule,
        BrowserModule
    ],
    providers: [CoinMarketCapService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
