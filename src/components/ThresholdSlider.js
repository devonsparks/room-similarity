import React, { Component } from "react";



export default class ThresholdSlider extends Component {
  
    render() {
      return (
        <form onSubmit={this.props.onSubmit}>
          <label>
            Threshold:
            <input className="slider" type="range" min="0" max={this.props.max} step={this.props.max/100.0} value={this.props.threshold} onChange={this.props.onChange}></input>
          </label>
          <span>{this.props.threshold}</span>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

