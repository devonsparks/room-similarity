import React, { Component } from "react";
import GeoJSONAutoFit from './GeoJSONAutoFit';
import ThresholdSlider from './ThresholdSlider';
//import UF from '../core/uf';
import {iota} from '../core/utils';
import { randomrgb } from "../core/color";
import { components } from '../core/geometry';


export default class SpaceClassifier extends Component {
    constructor(props) {
        super(props);

        const features = this.props.geojson.features.length;
        //this.uf = new UF(features);

        this.state = {
            threshold: this.props.max,  /* the cutoff for haussdorff inclusion */
            features,                   /* count of features in geojson        */
            partitions: 1,              /* current partition count             */
            geojson: this.props.geojson,
            colormap: iota(features).map(randomrgb)
        };


    }



    thresholdChanged(event) {
        const threshold = event.target.value;
        this.setState({ threshold });

    }


    updateRequested(event) {
        const [geojson, partitions] = components(this.props.geojson, this.state.threshold);
        this.setState({ geojson, partitions });

        if (event) { event.preventDefault(); }
    }

    render() {
        return (<div className="space-explorer">
            <span>{this.props.title}</span>
            <GeoJSONAutoFit geojson={this.state.geojson} colormap={this.state.colormap} />
            <ThresholdSlider threshold={this.state.threshold}
                features={this.state.features}
                partitions={this.state.partitions}
                max={this.props.max}
                onChange={this.thresholdChanged.bind(this)}
                onSubmit={this.updateRequested.bind(this)} />
        </div>);
    }
}