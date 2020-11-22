import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsEditComponent } from './farms-edit.component';

describe('FarmsEditComponent', () => {
  let component: FarmsEditComponent;
  let fixture: ComponentFixture<FarmsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
