import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonyLogComponent } from './colony-log.component';

describe('ColonyLogComponent', () => {
  let component: ColonyLogComponent;
  let fixture: ComponentFixture<ColonyLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColonyLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColonyLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
