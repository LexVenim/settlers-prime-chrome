import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleSoldiersComponent } from './battle-soldiers.component';

describe('BattleSoldiersComponent', () => {
  let component: BattleSoldiersComponent;
  let fixture: ComponentFixture<BattleSoldiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleSoldiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleSoldiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
