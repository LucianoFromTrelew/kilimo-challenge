import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsDetailComponent } from './farms-detail.component';

describe('FarmsDetailComponent', () => {
  let component: FarmsDetailComponent;
  let fixture: ComponentFixture<FarmsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
