import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLabProvComponent } from './search-lab-prov.component';

describe('SearchLabProvComponent', () => {
  let component: SearchLabProvComponent;
  let fixture: ComponentFixture<SearchLabProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchLabProvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLabProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
