import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, combineLatest } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { PrecipitationsEditFormDialogComponent } from "src/app/components/precipitations-edit-form-dialog/precipitations-edit-form-dialog.component";
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
      return this.farmsService.getOne(params.id);
    })
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
    private dialog: MatDialog
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
}
