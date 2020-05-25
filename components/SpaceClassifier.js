import React, { Component } from "react";
import GeoJSONAutoFit from './GeoJSONAutoFit';
import ThresholdSlider from './ThresholdSlider';
import UF from '../graph/UF';
import {haussdorff, pairwise, dist2} from '../geometry/similiarity';

function iota(size) {
    return Array.from({ length: size }, (v, k) => k)
}



class GeoJSONRoom {
    constructor(geojson) {
        this.geojson = geojson;

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
    console.log("components have been set")
    /* const graph = new DirectedGraph();
 
     for(let [A, B] of pairwise(rooms, rooms)) {
 
         const [AB, BA] = [A.distanceTo(B), B.distanceTo(A)];
         
         if(Math.min(AB, BA) > threshold) {
  
           graph.addEdge(new Edge(A, B, AB));
           graph.addEdge(new Edge(B, A, BA));
         }
     }
 
     
     return new SCC(graph).traverse().components()*/

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
        console.log("update requested")

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