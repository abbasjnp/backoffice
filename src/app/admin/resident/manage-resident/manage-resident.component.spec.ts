import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResidentComponent } from './manage-resident.component';

describe('ManageResidentComponent', () => {
  let component: ManageResidentComponent;
  let fixture: ComponentFixture<ManageResidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageResidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
