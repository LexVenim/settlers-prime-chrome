import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorMapComponent } from './sector-map.component';

describe('SectorMapComponent', () => {
  let component: SectorMapComponent;
  let fixture: ComponentFixture<SectorMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
