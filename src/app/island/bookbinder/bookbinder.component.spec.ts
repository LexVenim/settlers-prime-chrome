import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookbinderComponent } from './bookbinder.component';

describe('BookbinderComponent', () => {
  let component: BookbinderComponent;
  let fixture: ComponentFixture<BookbinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookbinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookbinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
