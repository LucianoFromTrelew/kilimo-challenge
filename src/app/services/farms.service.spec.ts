import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "src/environments/environment";

import { FarmsService } from "./farms.service";

describe("FarmsService", () => {
  let service: FarmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(FarmsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
