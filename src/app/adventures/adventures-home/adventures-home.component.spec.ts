import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventuresHomeComponent } from './adventures-home.component';

describe('AdventuresHomeComponent', () => {
  let component: AdventuresHomeComponent;
  let fixture: ComponentFixture<AdventuresHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventuresHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventuresHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
