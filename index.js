
/*
const {haussdorff, pairwise, dist2} = require('./geometry/similiarity');
const Path = require('./geometry/Path');
const {DirectedGraph, Edge} = require('./digraph/DirectedGraph');
const SCC = require('./digraph/SCC');
const UF = require('./graph/UF');
*/
import React from "react";
import ReactDOM from "react-dom";
import SpacePlan from './components/spaceplan';
  
const rootElement = document.getElementById("map-container");
ReactDOM.render(<SpacePlan />, rootElement);  



/* 

L = require('leaflet')

const ctx = {
    map: L.map('mapid'),
    layer: null,

}



function update(ctx) {
    console.log("In update")
    ctx.layer = L.geoJSON(states, {
        style: function (feature) {
            switch (feature.properties.component) {
                case 'Republican': return { color: "#ff0000" };
                case 'Democrat': return { color: "#0000ff" };
                default: return { color: "#00ddff" };
            }
        }
    }).addTo(ctx.map);

*/
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

        }

    function iota(size) {
        return Array.from({length:size},(v,k)=>k)
    }

    function components(GeoJSON, threshold) {

   
        const rooms = [];

        for(feature of GeoJSON.features) {
            rooms.push(new GeoJSONRoom(feature));
        }

        const partition = new UF(rooms.length);
  
    
        for(let [Ai, Bi] of pairwise(iota(rooms.length), iota(rooms.length))) {
            const [A, B] = [rooms[Ai], rooms[Bi]];
            const dist = Math.max(A.distanceTo(B), B.distanceTo(A));
            if(dist < threshold) {
                //console.log("union found")
                partition.union(Ai, Bi);
            }
        }

        console.log(partition);
       /* const graph = new DirectedGraph();
   
        for(let [A, B] of pairwise(rooms, rooms)) {

            const [AB, BA] = [A.distanceTo(B), B.distanceTo(A)];
            
            if(Math.min(AB, BA) > threshold) {
     
              graph.addEdge(new Edge(A, B, AB));
              graph.addEdge(new Edge(B, A, BA));
            }
        }

        
        return new SCC(graph).traverse().components()*/


    }


