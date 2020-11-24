import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from "firebase/app";
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

  async delete(farmId: string, precipitationId: string) {
    const farmRef = this.farmsCollection.doc(farmId);
    const precipitationRef = farmRef
      .collection(this.PRECIPITATIONS_COLLECTION_NAME)
      .doc(precipitationId);

    const precipitationData = (
      await precipitationRef.get().toPromise()
    ).data() as PrecipitationData;

    await farmRef.update({
      accumulatedPrecipitations: firebase.firestore.FieldValue.increment(
        -precipitationData.millimeters
      )
    });

    await precipitationRef.delete();
  }

  getExpectedPrecipitations(farmId: string, days: number) {
    return this.farmsCollection
      .doc(farmId)
      .collection(this.PRECIPITATIONS_COLLECTION_NAME)
      .get()
      .pipe(
        map(docs =>
          docs.docs
            .map(docToPrecipitation)
            .map(precipitationData => precipitationData.millimeters)
            .reduce((acc, val) => acc + val, 0)
        ),
        map(accumulatedPrecipitations => accumulatedPrecipitations / days)
      );
  }
}
