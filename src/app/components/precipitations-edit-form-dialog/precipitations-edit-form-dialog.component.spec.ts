import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MaterialModule } from "src/app/material/material.module";
import { environment } from "src/environments/environment";

import { PrecipitationsEditFormDialogComponent } from "./precipitations-edit-form-dialog.component";

describe("PrecipitationsEditFormDialogComponent", () => {
  let component: PrecipitationsEditFormDialogComponent;
  let fixture: ComponentFixture<PrecipitationsEditFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
      ],
      declarations: [PrecipitationsEditFormDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { data: { farmId: "FARM_ID" } } },
        {
          provide: MatDialogRef,
          useValue: {
            close: (dialogResult: any) => {}
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecipitationsEditFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
