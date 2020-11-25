import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { filter, share, switchMap } from "rxjs/operators";
import { FarmsService } from "src/app/services/farms.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  shouldFetch = new BehaviorSubject(true);

  farms$ = this.shouldFetch.pipe(
    filter(shouldFetch => shouldFetch),
    switchMap(() => {
      this.shouldFetch.next(false);
      return this.farmsService.getAll();
    }),
    share()
  );

  constructor(
    private farmsService: FarmsService,
    private snackBar: MatSnackBar
  ) {}

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
}
