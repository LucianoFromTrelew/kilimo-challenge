import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoogleMapsModule } from "@angular/google-maps";
import { FarmsMapComponent } from "src/app/components/farms-map/farms-map.component";
import { MaterialModule } from "src/app/material/material.module";

import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, GoogleMapsModule],
      declarations: [HomeComponent, FarmsMapComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
