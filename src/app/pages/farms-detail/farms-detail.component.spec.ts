import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "src/app/material/material.module";
import { environment } from "src/environments/environment";

import { FarmsDetailComponent } from "./farms-detail.component";

describe("FarmsDetailComponent", () => {
  let component: FarmsDetailComponent;
  let fixture: ComponentFixture<FarmsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
      ],
      declarations: [FarmsDetailComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
