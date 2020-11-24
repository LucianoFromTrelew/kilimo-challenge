import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from "firebase";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import {
  Precipitation,
  PrecipitationData,
  PrecipitationFormValues
} from "../models/precipitation";

const docToPrecipitation = doc => {
  const data = doc.data();
  return { id: doc.id, ...data, date: data.date.toDate() } as Precipitation;
};

@Injectable({
  providedIn: "root"
})
export class PrecipitationsService {
  private FARMS_COLLECTION_NAME = "farms";
  private PRECIPITATIONS_COLLECTION_NAME = "precipitations";
  private farmsCollection = this.firestore.collection(
    this.FARMS_COLLECTION_NAME
  );

  constructor(private firestore: AngularFirestore) {}

  getAll(farmId: string) {
    return this.farmsCollection
      .doc(farmId)
      .collection(this.PRECIPITATIONS_COLLECTION_NAME)
      .get()
      .pipe(map(docs => docs.docs.map(docToPrecipitation)));
  }

  async add(farmId: string, precipitationFormValues: PrecipitationFormValues) {
    const precipitationData: PrecipitationData = { ...precipitationFormValues };

    const farmRef = this.farmsCollection.doc(farmId);

    await farmRef.update({
      accumulatedPrecipitations: firebase.firestore.FieldValue.increment(
        precipitationData.millimeters
      )
    });

    const response = await farmRef
      .collection(this.PRECIPITATIONS_COLLECTION_NAME)
      .add(precipitationData);

    return response.id;
  }

  getExpectedPrecipitations(farmId: string, days: number) {
    return of(200);
  }
}
