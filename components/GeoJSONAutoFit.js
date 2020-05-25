import React, { Component } from "react";
import { Map as LeafletMap, GeoJSON } from "react-leaflet";


function randomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}



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

    style(feature) {

        const color = feature.properties.component/this.props.geojson.features.length*1.0;
        return {
            fillColor: `#${Math.floor(color * 16777215).toString(16)}`,
            weight: 0.5
        };
    };

    render() {
        return (
            <LeafletMap ref={this.mapRef} center={[0, 0]} zoom={0} whenReady={()=>this.ready()}>
                <GeoJSON ref={this.geoRef}  data={this.props.geojson} style={this.style.bind(this)} />
            </LeafletMap>
        );
    }
}



