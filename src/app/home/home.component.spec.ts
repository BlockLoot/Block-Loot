import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { LayoutModule } from '../layout/layout.module';
import { MockCurrencyDataService } from '../../../spec/services/currency-data.service';
import { CurrencyDataService } from '../data/currency-data.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ LayoutModule ],
      declarations: [ HomeComponent ],
      providers: [
        { provide: CurrencyDataService, useClass: MockCurrencyDataService }
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
