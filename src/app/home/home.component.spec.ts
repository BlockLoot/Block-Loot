import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { LayoutModule } from '../layout/layout.module';
import { MockCoinMarketCapService } from '../../../spec/services/coin-market-cap.service';
import { CoinMarketCapService } from '../data/coin-market-cap.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ LayoutModule ],
      declarations: [ HomeComponent ],
      providers: [
        { provide: CoinMarketCapService, useClass: MockCoinMarketCapService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
