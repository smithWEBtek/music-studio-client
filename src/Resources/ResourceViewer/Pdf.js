import React, { Component } from 'react';
import './ResourceViewer.css';

class Pdf extends Component {
  render() {
    return (
      <div>
        <iframe className="pdf" title={this.props.url} src={this.props.url}></iframe>
      </div>
    );
  }
}

export default Pdf
 
