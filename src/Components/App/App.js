import React, { Component } from 'react';
import './App.css';
import Footer from '../Footer/Footer';


class App extends Component {
  state = {
    fraction: '',
    result: '',
    errorMessage: '',
    previousEntries: []
  }

  reset = () => {
    this.setState({
      fraction: ''
    })
  }

  updateFraction = (event) => {
    if (event.key === 'Enter') {
      this.undoFraction();
    } else {
      this.setState({
        fraction: event.target.value,
        errorMessage: ''
      })
    }
  }

  undoFraction = () => {
    // entry must include a divided by sign
    if (this.state.fraction.includes("/")) {
      let wholeNumber;
      let fraction;
      // if entry includes a whole number, split it to find number and fraction
      if (this.state.fraction.includes(" ")) {
        const number = this.state.fraction.split(" ");
        wholeNumber = number[0];
        fraction = number[1];
      // entry just includes a fraction, so set whole number to 0 and set fraction to the whole thing
      } else {
        wholeNumber = 0;
        fraction = this.state.fraction;
      }
      const fractionArray = fraction.split("/")
      const numerator = fractionArray[0];
      const denominator = fractionArray[1];
      const decimal = (numerator / denominator);
      const entireNumber = (Number(wholeNumber) + decimal).toFixed(2);
      let entries = [...this.state.previousEntries];
      entries.unshift([this.state.fraction, entireNumber]);
      if (!isNaN(entireNumber)) {
        this.setState({
          result: entireNumber,
          previousEntries: entries
        })
      } else {
        this.setState({
          errorMessage: 'Oops, enter a fraction like this: 4 5/6',
          result: ''
        })
      }
    } else {
      this.setState({
        errorMessage: 'Oops, enter a fraction like this: 4 5/6',
        result: ''
      })
    }
  }

  renderEntries = () => {
    return this.state.previousEntries.map((entry, i) => {
      return (<li key={i}>{entry[0]} = {entry[1]}</li>);
    })
  }

  render() {
    let allEntries = null;
    if (this.state.previousEntries.length > 0) allEntries = "All Entries:";
    return (
      <React.Fragment>
        <div id="wrapper">
          <div id="content">
            <h1>Your Fraction:</h1>
            <input
              value={this.state.fraction}
              onChange={this.updateFraction}
              onKeyPress={this.updateFraction}
              onFocus={this.reset}
              placeholder="press enter when done"
              />
            <div className="buttonHolder">
              <a
                onClick={this.undoFraction}
                className="button">
                Calculate
              </a>
            </div>
            <h2>Equals:</h2>
            <div style={{height: 40}}>
              <h3>{this.state.result}</h3>
            </div>
            <p className="error">{this.state.errorMessage}</p>
            <p style={{textAlign: 'center', marginBottom: '3px', textDecoration: 'underline'}}>{allEntries}</p>
            <ul>{this.renderEntries()}</ul>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
