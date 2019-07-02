import React, { Component } from 'react';
import click1 from './click1.wav';
import click2 from './click2.wav';
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
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;
    // The first beat will have a different sound than the others
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

  // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  }

  startStop = () => {
    if(this.state.playing) {
      // Stop timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // Start timer using current BPM
      this.timer =setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState(
        {
          count: 0,
          playing: true
          // Play click immediately---after setState finishes
        },
        this.playClick
      );
    }
  };

  //Using arrow function here in order to bind 'this', so it will be automatically bound to refer to the Metronome instance
  handleBpmChange = event => {
    const bpm = event.target.value;

    if(this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      this.setState({
        count: 0,
        bpm
      });  
    } else {
      this.setState({ bpm });
    }
  }

  render() {
    const { bpm, playing } = this.state;

    return (
      <div className="big-div-wrapper">
        <div className="bpm-slider">
          <h1>Tempo: </h1>
          <div>{bpm} BPM</div>
          <input 
              type="range" 
              min="60" 
              max="240" 
              value={bpm}
              onChange={this.handleBpmChange}  
              />
        </div>
        <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
      </div>
    );
  }
}

export default Metronome;
