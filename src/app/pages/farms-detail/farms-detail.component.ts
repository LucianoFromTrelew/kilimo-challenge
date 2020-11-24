import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, combineLatest } from "rxjs";
import { filter, share, switchMap } from "rxjs/operators";
import { PrecipitationsEditFormDialogComponent } from "src/app/components/precipitations-edit-form-dialog/precipitations-edit-form-dialog.component";
import { URLS } from "src/app/constants";
import { FarmsService } from "src/app/services/farms.service";
import { PrecipitationsService } from "src/app/services/precipitations.service";

const EXPECTED_PRECIPITATIONS_DAYS = 3;
@Component({
  selector: "app-farms-detail",
  templateUrl: "./farms-detail.component.html",
  styleUrls: ["./farms-detail.component.scss"]
})
export class FarmsDetailComponent implements OnInit {
  farmId = "";

  shouldFetch = new BehaviorSubject(true);

  farm$ = combineLatest([this.route.params, this.shouldFetch]).pipe(
    filter(([_, shouldFetch]) => shouldFetch),
    switchMap(([params]) => {
      this.farmId = params.id;
      this.shouldFetch.next(false);
      return this.farmsService.getOne(params.id);
    }),
    share()
  );

  precipitations$ = this.farm$.pipe(
    switchMap(farm => this.precipitationsService.getAll(farm.id))
  );

  expectedPrecipitationsDays = EXPECTED_PRECIPITATIONS_DAYS;
  expectedPrecipitations$ = this.farm$.pipe(
    switchMap(farm =>
      this.precipitationsService.getExpectedPrecipitations(
        farm.id,
        EXPECTED_PRECIPITATIONS_DAYS
      )
    )
  );

  constructor(
    private route: ActivatedRoute,
    private farmsService: FarmsService,
    private precipitationsService: PrecipitationsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleDisplayPrecipitationEditDialogClick() {
    const dialogRef = this.dialog.open(PrecipitationsEditFormDialogComponent, {
      data: { farmId: this.farmId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.shouldFetch.next(true);
      }
    });
  }

  async handleDeletePrecipitation(precipitationId: string) {
    try {
      await this.precipitationsService.delete(this.farmId, precipitationId);

      this.snackBar.open("Precipitation deleted successfully!");

      this.shouldFetch.next(true);
    } catch (error) {
      this.snackBar.open("Could not delete precipitation");
    }
  }

  async handleDeleteFarmClick(farmId: string) {
    const result = confirm("Are you sure you want to delete this farm?");

    if (result) {
      try {
        await this.farmsService.delete(farmId);

        this.snackBar.open("Farm deleted successfully!");

        this.router.navigateByUrl(URLS.ROOT);
      } catch (error) {
        this.snackBar.open("Could not delete farm");
      }
    }
  }
}
