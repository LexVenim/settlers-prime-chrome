import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonyResultComponent } from './colony-result.component';

describe('ColonyResultComponent', () => {
  let component: ColonyResultComponent;
  let fixture: ComponentFixture<ColonyResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColonyResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColonyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
