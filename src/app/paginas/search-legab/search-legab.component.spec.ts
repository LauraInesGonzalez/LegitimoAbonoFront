import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLegabComponent } from './search-legab.component';

describe('SearchLegabComponent', () => {
  let component: SearchLegabComponent;
  let fixture: ComponentFixture<SearchLegabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchLegabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLegabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
