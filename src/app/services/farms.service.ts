import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Farm, FarmData } from "../models/farm";

@Injectable({
  providedIn: "root"
})
export class FarmsService {
  private COLLECTION_NAME = "farms"
  private farmsCollection = this.firestore.collection(this.COLLECTION_NAME)

  constructor(private firestore: AngularFirestore) {
  }

  getFarms() {
    return this.farmsCollection
      .get()
      .pipe(
        map(docs =>
          docs.docs.map(doc => {
            return { id: doc.id, ...doc.data() as FarmData } as Farm;
          })
        )
      );

  }
}
