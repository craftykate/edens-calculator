import React, { Component } from 'react';
import './App.css';
import Footer from '../Footer/Footer';


class App extends Component {
  state = {
    fraction: '',
    result: '',
    errorMessage: ''
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
      if (!isNaN(entireNumber)) {
        this.setState({
          result: entireNumber
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

  render() {
    return (
      <React.Fragment>
        <div id="wrapper">
          <div id="content">
            <h1>Your Fraction:</h1>
            <input
              value={this.state.fraction}
              onChange={this.updateFraction}
              onKeyPress={this.updateFraction}
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
            <div style={{height: 45}}>
              <h3>{this.state.result}</h3>
            </div>
            <h3>{this.state.errorMessage}</h3>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
