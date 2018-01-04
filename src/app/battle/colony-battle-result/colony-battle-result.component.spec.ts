import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonyBattleResultComponent } from './colony-battle-result.component';

describe('ColonyBattleResultComponent', () => {
  let component: ColonyBattleResultComponent;
  let fixture: ComponentFixture<ColonyBattleResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColonyBattleResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColonyBattleResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
