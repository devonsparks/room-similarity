import React, { Component } from "react";


export default class ThresholdSlider extends Component {
  
    render() {
      return (
        <form>
          <label>
            <input className="slider" type="range" min="0" max={this.props.max} step={this.props.max/500.0} value={this.props.threshold} 
                   onChange={this.props.onChange} onMouseUp={this.props.onSubmit} onTouchEnd={this.props.onSubmit}></input>
          </label>
          <div className="status">{this.props.features} spaces classified into {this.props.partitions} unique {this.props.partitions > 1 ? 'groups' : 'group' }</div>
        </form>
      );
    }
  }

