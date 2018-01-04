import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonyBattleLogComponent } from './colony-battle-log.component';

describe('ColonyBattleLogComponent', () => {
  let component: ColonyBattleLogComponent;
  let fixture: ComponentFixture<ColonyBattleLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColonyBattleLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColonyBattleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
