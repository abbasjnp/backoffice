import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSocietyComponent } from './manage-society.component';

describe('ManageSocietyComponent', () => {
  let component: ManageSocietyComponent;
  let fixture: ComponentFixture<ManageSocietyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSocietyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSocietyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
