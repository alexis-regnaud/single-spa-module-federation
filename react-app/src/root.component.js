import React from "react";
import Parcel from "single-spa-react/parcel";
import { mountRootParcel } from 'single-spa';

export default function Root(props) {
  return (
    <section>
      {props.name ?? "Standalone react-app"} is mounted!
      <Parcel
        config={() => import("./parcel/parcel.component.single-spa")}
        mountParcel={mountRootParcel}
        customProp1="Parent prop1"
        wrapWith="h1"
        wrapStyle={{ color: "blue" }}
        handleError={err => console.log(err)}
        parcelDidMount={() => console.log("React parcel mounted")}
      />
      <Parcel
        config={() => import("angularApp/Parcel")}
        mountParcel={mountRootParcel}
        customProp1="Parent prop1"
        wrapWith="h1"
        wrapStyle={{ color: "green" }}
        handleError={err => console.log(err)}
        parcelDidMount={() => console.log("Angular parcel mounted")}
      />
    </section>
  );
}
