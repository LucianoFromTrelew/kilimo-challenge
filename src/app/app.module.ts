import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GoogleMapsModule } from "@angular/google-maps";
import { FlexLayoutModule } from "@angular/flex-layout";
import { environment } from "src/environments/environment";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { MaterialModule } from "./material/material.module";
import { HomeComponent } from "./pages/home/home.component";
import { FarmsEditComponent } from "./pages/farms-edit/farms-edit.component";
import { FarmsDetailComponent } from "./pages/farms-detail/farms-detail.component";
import { FarmsMapComponent } from "./components/farms-map/farms-map.component";
import { FarmsTableComponent } from "./components/farms-table/farms-table.component";
import { PrecipitationsTableComponent } from './components/precipitations-table/precipitations-table.component';
import { PrecipitationsEditFormDialogComponent } from './components/precipitations-edit-form-dialog/precipitations-edit-form-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FarmsMapComponent,
    FarmsEditComponent,
    FarmsDetailComponent,
    FarmsTableComponent,
    PrecipitationsTableComponent,
    PrecipitationsEditFormDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    // Firebase imports
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    // Angular Material imports
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PrecipitationsEditFormDialogComponent]
})
export class AppModule {}
