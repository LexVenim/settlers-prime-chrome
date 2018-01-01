import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlePreviewComponent } from './battle-preview.component';

describe('BattlePreviewComponent', () => {
  let component: BattlePreviewComponent;
  let fixture: ComponentFixture<BattlePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
