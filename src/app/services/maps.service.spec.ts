import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { MapsService } from "./maps.service";

describe("MapsService", () => {
  let service: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MapsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
