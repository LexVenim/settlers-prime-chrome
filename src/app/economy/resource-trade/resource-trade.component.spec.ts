import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTradeComponent } from './resource-trade.component';

describe('ResourceTradeComponent', () => {
  let component: ResourceTradeComponent;
  let fixture: ComponentFixture<ResourceTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
