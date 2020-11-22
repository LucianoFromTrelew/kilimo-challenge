import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsMapComponent } from './farms-map.component';

describe('FarmsMapComponent', () => {
  let component: FarmsMapComponent;
  let fixture: ComponentFixture<FarmsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmsMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
