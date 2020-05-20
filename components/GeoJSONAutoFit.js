import React, { Component, useState } from "react";
import { Map as LeafletMap, GeoJSON } from "react-leaflet";


export default class GeoJSONAutoFit extends Component {
    constructor(props) {
        super(props);

        this.mapRef = React.createRef();
        this.geoRef = React.createRef();

    }


    ready() {
        const map = this.mapRef.current.leafletElement;
        const geo = this.geoRef.current.leafletElement;
        map.fitBounds(geo.getBounds())
    }

    render() {
        return (
            <LeafletMap ref={this.mapRef} center={[0, 0]} zoom={0} whenReady={()=>this.ready()}>
                <GeoJSON ref={this.geoRef}  data={this.props.geojson}  />
            </LeafletMap>
        );
    }
}



