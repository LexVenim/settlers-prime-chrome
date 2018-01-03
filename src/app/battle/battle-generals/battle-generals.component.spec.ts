import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleGeneralsComponent } from './battle-generals.component';

describe('BattleGeneralsComponent', () => {
  let component: BattleGeneralsComponent;
  let fixture: ComponentFixture<BattleGeneralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleGeneralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleGeneralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
