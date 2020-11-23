import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { ReactiveFormsModule } from "@angular/forms";
import { GoogleMapsModule } from "@angular/google-maps";
import { MaterialModule } from "src/app/material/material.module";
import { environment } from "src/environments/environment";

import { FarmsEditComponent } from "./farms-edit.component";

describe("FarmsEditComponent", () => {
  let component: FarmsEditComponent;
  let fixture: ComponentFixture<FarmsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GoogleMapsModule,
        ReactiveFormsModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
      ],
      declarations: [FarmsEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
