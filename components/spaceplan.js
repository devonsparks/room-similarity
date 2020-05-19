import React, { Component } from "react";

import { Map as LeafletMap, TileLayer } from "react-leaflet";

export default class SpacePlan extends Component {
    state = {
      center: [51.505, -0.091],
      zoom: 13
    };
  
    render() {
      return (
          <LeafletMap center={this.state.center} zoom={this.state.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
          </LeafletMap>
      );
    }
  }

  
