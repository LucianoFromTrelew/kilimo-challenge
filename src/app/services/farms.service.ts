import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Farm, FarmData, FarmFormValues } from "../models/farm";

@Injectable({
  providedIn: "root"
})
export class FarmsService {
  private COLLECTION_NAME = "farms";
  private farmsCollection = this.firestore.collection(this.COLLECTION_NAME);

  constructor(private firestore: AngularFirestore) {}

  getFarms(): Observable<Farm[]> {
    return this.farmsCollection.get().pipe(
      map(docs =>
        docs.docs.map(doc => {
          return { id: doc.id, ...(doc.data() as FarmData) } as Farm;
        })
      )
    );
  }

  async add(farmFormValues: FarmFormValues): Promise<string> {
    const farmData: FarmData = {
      ...farmFormValues,
      accumulatedPrecipitations: 0
    };
    const response = await this.farmsCollection.add(farmData);
    return response.id;
  }
}
