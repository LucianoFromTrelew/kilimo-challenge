import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GoogleMapsModule } from "@angular/google-maps";
import { FlexLayoutModule } from "@angular/flex-layout";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { HomeComponent } from "./pages/home/home.component";
import { FarmsMapComponent } from "./components/farms-map/farms-map.component";
import { environment } from "src/environments/environment";
import { FarmsEditComponent } from "./pages/farms-edit/farms-edit.component";
import { MaterialModule } from "./material/material.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FarmsMapComponent,
    FarmsEditComponent
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
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
