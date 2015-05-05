import React from 'react';
import Slider from 'slider';

const { Component } = React;

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = { value: 50 }
  }

  update (newValue) {
    this.setState({ value: Math.floor(newValue * 100) });
  }

  render () {
    return (
      <svg height="600" width="600">
        <Slider
          onValueChange={newValue => this.update(newValue)}
          x="20" y="20" width="500" />
        <text x="100" y="100">{this.state.value}</text>
      </svg>
    )
  }
}
  