import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PrecipitationFormValues } from "src/app/models/precipitation";
import { PrecipitationsService } from "src/app/services/precipitations.service";

@Component({
  selector: "app-precipitations-edit-form-dialog",
  templateUrl: "./precipitations-edit-form-dialog.component.html",
  styleUrls: ["./precipitations-edit-form-dialog.component.scss"]
})
export class PrecipitationsEditFormDialogComponent implements OnInit {
  isSubmitting = false;
  precipitationForm = this.fb.group({
    date: ["", Validators.required],
    millimeters: ["", [Validators.required, Validators.min(0)]]
  });

  filterDatesGreaterThanToday = (d: Date | null): boolean => {
    const day = d || new Date();
    const now = new Date();

    return day <= now;
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { farmId: string },
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PrecipitationsEditFormDialogComponent>,
    private precipitationService: PrecipitationsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async handleSubmit() {
    try {
      this.isSubmitting = true;
      const values = this.precipitationForm.value as PrecipitationFormValues;

      await this.precipitationService.add(this.data.farmId, values);

      this.snackBar.open("Precipitation created successfully!");
      this.dialogRef.close({ success: true });
    } catch (error) {
      this.snackBar.open("Could not create farm");
    } finally {
      this.isSubmitting = false;
    }
  }

  handleCancel() {
    this.dialogRef.close();
  }

  handleReset() {
    this.precipitationForm.reset();
  }

  getErrorMessages(fieldName: string) {
    const errorMessages = [];
    const field = this.precipitationForm.get(fieldName);

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
}
