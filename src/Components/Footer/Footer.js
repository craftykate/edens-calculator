import React from 'react';
import './Footer.css';

// Pick one:
// More complex
const Footer = (props) => {
  return (
    <footer>
      <p>Enter your fraction like this: 5 4/3 with a space between the number and the fraction, or just enter a fraction, like this: 3/17.</p>
      <ul>
        <li>calculator built by kate mcfaul</li>
        <li>for her sissy {'<'}3</li>
      </ul>

    </footer>
  );
};

export default Footer;

// Simple rendering
// const Footer = (props) => (
//   <p>Footer</p>
// );
//
// export default Footer;
