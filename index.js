
import React from "react";
import ReactDOM from "react-dom";
import SpaceClassifier from './components/SpaceClassifier';
import * as clinicData from './samples/medic.floor1.rooms.json';




const rootElement = document.getElementById("map-container");
ReactDOM.render(<SpaceClassifier geojson={clinicData} max="0.0005" />, rootElement);  

