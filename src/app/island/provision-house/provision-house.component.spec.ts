import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionHouseComponent } from './provision-house.component';

describe('ProvisionHouseComponent', () => {
  let component: ProvisionHouseComponent;
  let fixture: ComponentFixture<ProvisionHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
