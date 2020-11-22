import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GoogleMapsModule } from "@angular/google-maps";
import { FlexLayoutModule } from "@angular/flex-layout";

// Angular Material
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { HomeComponent } from "./pages/home/home.component";
import { FarmsMapComponent } from "./components/farms-map/farms-map.component";
import { environment } from "src/environments/environment";
import { FarmsEditComponent } from "./pages/farms-edit/farms-edit.component";

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
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
