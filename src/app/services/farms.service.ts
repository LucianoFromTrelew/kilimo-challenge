import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Farm, FarmData, FarmFormValues } from "../models/farm";

const docToFarm = doc => {
  return { id: doc.id, ...(doc.data() as FarmData) } as Farm;
};
@Injectable({
  providedIn: "root"
})
export class FarmsService {
  private FARMS_COLLECTION_NAME = "farms";
  private farmsCollection = this.firestore.collection(
    this.FARMS_COLLECTION_NAME
  );

  constructor(private firestore: AngularFirestore) {}

  getAll(): Observable<Farm[]> {
    return this.farmsCollection
      .get()
      .pipe(map(docs => docs.docs.map(docToFarm)));
  }

  getOne(id: string): Observable<Farm> {
    return this.farmsCollection.doc(id).get().pipe(map(docToFarm));
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
