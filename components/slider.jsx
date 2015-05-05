import React from 'react';

const { Component } = React;

const style = {
  knob: {
    fill: 'red'
  },
  backdrop: {
    fill: 'transparent',
    opacity: 0.2
  }
};

export default class Slider extends Component {
  constructor (props) {
    super(props);

    this.state = { 
      percentage: 0.5,
      isDragging: false,
      dragOrigin: undefined
    };
  }

  dragStart (e) {
    this.setState({
      isDragging: true,
      dragOrigin: [e.clientX, e.clientY]
    });
  }

  dragEnd (e) {
    this.setState({isDragging: false});
  }

  drag (e) {
    if (this.state.isDragging) {
      let deltaX = e.clientX - this.state.dragOrigin[0];
      let deltaY = e.clientY - this.state.dragOrigin[1];

      let deltaPercentage = deltaX / this.props.width;
      let newPercentage = this.state.percentage + deltaPercentage;

      if (newPercentage <= 1 && newPercentage >= 0) {
        this.setState({
          dragOrigin: [e.clientX, e.clientY],
          percentage: this.state.percentage + deltaPercentage
        });

        if (this.props.onValueChange) {
          this.props.onValueChange(newPercentage);
        }
      }
    }
  }

  render () {
    const { x, y, width } = this.props;
    const { percentage } = this.state;
    const translation = `translate(${x},${y})`;
    const knobColor = `hsl(${(1 - percentage) * 128}, 100%, 50%)`;

    return (
      <g 
        onMouseMove={e => this.drag(e)}
        onMouseUp={e => this.dragEnd(e)}
        onMouseLeave={e => this.dragEnd(e)}
        transform={translation}>

        <rect
          width={width} height="3" x="0" y="20" />
        <circle style={{fill: knobColor, stroke: 'black', strokeWidth: 1}}
          onMouseDown={e => this.dragStart(e)}
          r={10 * ( percentage + 0.5 )} cy="21" cx={width * percentage} />
        {
          this.state.isDragging ? 
          <rect style={style.backdrop} x="-10" y="-10" width={width + 20} height="100" />
          : null
        }
      </g>
    );
  }
}
