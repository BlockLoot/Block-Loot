import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinSearchListComponent } from './coin-search-list.component';

describe('CoinSearchListComponent', () => {
  let component: CoinSearchListComponent;
  let fixture: ComponentFixture<CoinSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
