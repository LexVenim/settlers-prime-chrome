import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorHouseComponent } from './mayor-house.component';

describe('MayorHouseComponent', () => {
  let component: MayorHouseComponent;
  let fixture: ComponentFixture<MayorHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayorHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayorHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
