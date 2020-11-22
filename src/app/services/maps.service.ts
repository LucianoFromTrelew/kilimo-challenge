import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MapsService {
  private TOKEN = "AIzaSyCQVLQG1jmgQ-yyZEtPY4Ebdve82WohYDs";
  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${this.TOKEN}`,
        "callback"
      )
      .pipe(
        tap(() => {
          console.log("%cLoading maps", "background-color:blue; color:white");
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }
}
