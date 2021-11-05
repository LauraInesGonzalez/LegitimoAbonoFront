import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegitimoAbIdComponent } from './legitimo-ab-id.component';

describe('LegitimoAbIdComponent', () => {
  let component: LegitimoAbIdComponent;
  let fixture: ComponentFixture<LegitimoAbIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegitimoAbIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegitimoAbIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
