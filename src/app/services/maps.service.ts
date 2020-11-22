import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MapsService {
  private TOKEN = "AIzaSyDD7lKn0BROGfYr6wbqYOm7-mAeSHIq9mM";
  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${this.TOKEN}`,
        "callback"
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
