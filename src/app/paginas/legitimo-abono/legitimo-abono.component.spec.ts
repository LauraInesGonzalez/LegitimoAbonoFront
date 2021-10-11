import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegitimoAbonoComponent } from './legitimo-abono.component';

describe('LegitimoAbonoComponent', () => {
  let component: LegitimoAbonoComponent;
  let fixture: ComponentFixture<LegitimoAbonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegitimoAbonoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegitimoAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
