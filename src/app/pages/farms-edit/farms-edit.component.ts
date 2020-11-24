import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { FarmFormValues } from "src/app/models/farm";
import { FarmsService } from "src/app/services/farms.service";

@Component({
  selector: "app-farms-edit",
  templateUrl: "./farms-edit.component.html",
  styleUrls: ["./farms-edit.component.scss"]
})
export class FarmsEditComponent implements OnInit {
  isSubmitting = false;
  farmForm = this.fb.group({
    name: ["", Validators.required],
    acres: ["", [Validators.required, Validators.min(5)]],
    coordinates: this.fb.group({
      lat: [
        "",
        [Validators.required, Validators.min(-90.0), Validators.max(90.0)]
      ],
      lng: [
        "",
        [Validators.required, Validators.min(-180.0), Validators.max(180.0)]
      ]
    })
  });

  constructor(
    private fb: FormBuilder,
    private farmsService: FarmsService,
    private location: Location
  ) {}

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
    try {
      this.isSubmitting = true;
      const values = this.farmForm.value as FarmFormValues;

      await this.farmsService.add(values);

      alert("Farm created successfully!");
      this.location.back();
    } catch (error) {
      alert("Could not create farm");
    } finally {
      this.isSubmitting = false;
    }
  }

  ngOnInit(): void {}
}
