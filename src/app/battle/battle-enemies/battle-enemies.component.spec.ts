import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleEnemiesComponent } from './battle-enemies.component';

describe('BattleEnemiesComponent', () => {
  let component: BattleEnemiesComponent;
  let fixture: ComponentFixture<BattleEnemiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleEnemiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleEnemiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
