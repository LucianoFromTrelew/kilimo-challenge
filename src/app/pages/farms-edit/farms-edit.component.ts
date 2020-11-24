import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { Farm, FarmFormValues } from "src/app/models/farm";
import { FarmsService } from "src/app/services/farms.service";
import { ActivatedRoute } from "@angular/router";
import { switchMap, takeUntil } from "rxjs/operators";
import { of, Subject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-farms-edit",
  templateUrl: "./farms-edit.component.html",
  styleUrls: ["./farms-edit.component.scss"]
})
export class FarmsEditComponent implements OnInit, OnDestroy {
  isSubmitting = false;
  isEditting = false;
  isLoading = false;

  farmId = "";

  farmForm: FormGroup;

  destroy$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private farmsService: FarmsService,
    private location: Location,
    private snackBar: MatSnackBar
  ) {
    this.route.url
      .pipe(
        switchMap(segments => {
          if (segments.length >= 2) {
            this.isEditting = true;
            this.isLoading = true;
            this.farmId = segments[0].path;

            return this.farmsService.getOne(this.farmId);
          }

          return of(null);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((farm: Farm | null) => {
        this.farmForm = this.fb.group({
          name: [farm?.name || "", Validators.required],
          acres: [farm?.acres || "", [Validators.required, Validators.min(5)]],
          coordinates: this.fb.group({
            lat: [
              farm?.coordinates?.lat || "",
              [Validators.required, Validators.min(-90.0), Validators.max(90.0)]
            ],
            lng: [
              farm?.coordinates?.lng || "",
              [
                Validators.required,
                Validators.min(-180.0),
                Validators.max(180.0)
              ]
            ]
          })
        });

        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  get marker(): google.maps.LatLngLiteral | null {
    const lat = this.farmForm.get("coordinates.lat").value as number;
    const lng = this.farmForm.get("coordinates.lng").value as number;

    if (!lat || !lng) return null;

    return { lat, lng };
  }

  getErrorMessages(fieldName: string) {
    const errorMessages = [];
    const field = this.farmForm.get(fieldName);

    if (field?.hasError("required")) {
      errorMessages.push("This field is required");
    }

    if (field?.hasError("min")) {
      errorMessages.push(
        `Value should be greater than ${field.errors.min.min}`
      );
    }

    if (field?.hasError("max")) {
      errorMessages.push(`Value should be lesser than ${field.errors.max.max}`);
    }

    return errorMessages.join(", ");
  }

  handleMapClick(event: google.maps.MouseEvent) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    this.farmForm.get("coordinates.lat").setValue(lat);
    this.farmForm.get("coordinates.lng").setValue(lng);
  }

  handleReset() {
    this.farmForm.reset();
  }

  handleCancel() {
    this.location.back();
  }

  async handleSubmit() {
    let successMessage: string;
    let errorMessage: string;
    try {
      this.isSubmitting = true;
      const values = this.farmForm.value as FarmFormValues;

      if (this.isEditting) {
        await this.farmsService.update(this.farmId, values);
        successMessage = "Farm updated successfully!";
        errorMessage = "Could not update farm";
      } else {
        await this.farmsService.add(values);
        successMessage = "Farm created successfully!";
        errorMessage = "Could not create farm";
      }

      this.snackBar.open(successMessage);
      this.location.back();
    } catch (error) {
      this.snackBar.open(errorMessage);
    } finally {
      this.isSubmitting = false;
    }
  }

  ngOnInit(): void {}
}
