import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { filter, shareReplay, switchMap } from "rxjs/operators";
import { URLS } from "src/app/constants";
import { FarmsService } from "src/app/services/farms.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  shouldFetch = new BehaviorSubject(true);
  selectedIndex = 0;

  farms$ = this.shouldFetch.pipe(
    filter(shouldFetch => shouldFetch),
    switchMap(() => {
      this.shouldFetch.next(false);
      return this.farmsService.getAll();
    }),
    shareReplay()
  );

  constructor(
    private farmsService: FarmsService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    if (this.location.path().match(URLS.FARMS_TABLE)) {
      this.selectedIndex = 1;
    }
  }

  ngOnInit(): void {}

  async handleDeleteFarm(farmId: string) {
    try {
      await this.farmsService.delete(farmId);

      this.snackBar.open("Farm deleted successfully!");

      this.shouldFetch.next(true);
    } catch (error) {
      this.snackBar.open("Could not delete farm");
    }
  }

  handleSelectedIndexChange(index: number) {
    if (index === 0) this.location.replaceState(URLS.FARMS_MAP);
    if (index === 1) this.location.replaceState(URLS.FARMS_TABLE);
  }
}
