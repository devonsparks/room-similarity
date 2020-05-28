
import React from "react";
import ReactDOM from "react-dom";
import SpaceClassifier from './components/SpaceClassifier';
import * as clinicData from './samples/medic.floor1.rooms.json';
import * as officeData from './samples/office.floor1.rooms.json';

const clinicDemo = document.getElementById("clinic-demo");
ReactDOM.render(<SpaceClassifier geojson={clinicData} max="0.0003" title="Clinic Floor Plan" />, clinicDemo);  

const officeDemo = document.getElementById("office-demo");
ReactDOM.render(<SpaceClassifier geojson={officeData} max="0.00018" title="Office Floor Plan" />, officeDemo);  
