import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "src/environments/environment";

import { PrecipitationsService } from "./precipitations.service";

describe("PrecipitationsService", () => {
  let service: PrecipitationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(PrecipitationsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
