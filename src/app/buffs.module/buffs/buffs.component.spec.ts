import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffsComponent } from './buffs.component';

describe('BuffsComponent', () => {
  let component: BuffsComponent;
  let fixture: ComponentFixture<BuffsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuffsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
