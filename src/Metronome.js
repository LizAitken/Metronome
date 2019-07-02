import React, { Component } from 'react';

import './Metronome.css';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };
  }

  render() {
    const { bpm, playing } = this.state;

    return (
      <div className="big-div-wrapper">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input type="range" min="60" max="240" value={bpm}/>
        </div>
        <button>{playing ? 'Stop' : 'Start'}</button>
      </div>
    );
  }
}

export default Metronome;
