import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinPriceDetailComponent } from './coin-price-detail.component';

describe('CoinPriceDetailComponent', () => {
  let component: CoinPriceDetailComponent;
  let fixture: ComponentFixture<CoinPriceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinPriceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinPriceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
