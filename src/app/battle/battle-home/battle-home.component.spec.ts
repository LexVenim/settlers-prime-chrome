import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleHomeComponent } from './battle-home.component';

describe('BattleHomeComponent', () => {
  let component: BattleHomeComponent;
  let fixture: ComponentFixture<BattleHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
