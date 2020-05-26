import React, { Component } from "react";
import GeoJSONAutoFit from './GeoJSONAutoFit';
import ThresholdSlider from './ThresholdSlider';
import UF from '../utils/uf';
import {haussdorff, pairwise, dist2, centroid} from '../utils/geometry';


function iota(size) {
    return Array.from({ length: size }, (v, k) => k)
}


class GeoJSONRoom {

    constructor(geojson) {
        this.geojson = geojson;
        
        const loop = this.members();
        const center = centroid(loop);

        /* translate to origin */
        for(let i in loop) {
            const [x, y] = loop[i];
            loop[i] = [x - center[0], y - center[1]];
        }
    }

    members() {
        return this.geojson.geometry.coordinates[0];
    }

    distanceTo(otherRoom) {
        return haussdorff(this, otherRoom, (A) => A.members(), dist2)
    }

    setComponent(cid) {
        this.geojson.properties['component'] = cid;
    }

    toJSON() {
        return this.geojson;
    }

    centroid() {
        this.members
    }
}




function components(GeoJSON, threshold) {

    const rooms = [];

    for (let feature of GeoJSON.features) {
        rooms.push(new GeoJSONRoom(feature));
    }

    const partition = new UF(rooms.length);


    for (let [Ai, Bi] of pairwise(iota(rooms.length), iota(rooms.length))) {
        const [A, B] = [rooms[Ai], rooms[Bi]];
        const dist = Math.max(A.distanceTo(B), B.distanceTo(A));
      
        if (dist < threshold) {
            partition.union(Ai, Bi);
        }
    }

    for (let Ri in rooms) {
        rooms[Ri].setComponent(partition.find(Ri));
    }

     return GeoJSON;
}



export default class SpaceClassifier extends Component {
    constructor(props) {
        super(props);

        this.state = { threshold: 0, geojson: this.props.geojson };
        this.uf = new UF(this.props.geojson.features.length);
    }

    thresholdChanged(event) {
       const threshold = event.target.value;
       this.setState({ threshold });

    }

    updateRequested(event) {
        this.setState({geojson: components(this.props.geojson, this.state.threshold) }); 
        event.preventDefault();
    }

    render() {
        return (<div>
                <GeoJSONAutoFit geojson={this.state.geojson} />
                <ThresholdSlider threshold={this.state.threshold} 
                                max={this.props.max}
                                onChange={this.thresholdChanged.bind(this)} 
                                onSubmit={this.updateRequested.bind(this)} />
                </div>);
    }
}