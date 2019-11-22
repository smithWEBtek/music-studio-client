import React, { Component } from 'react';
import { PDFViewer, Document, Page } from '@react-pdf/renderer';

class Pdf extends Component {
  state = {
    numPages: 1,
    pageNumber: 1,
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>

      <PDFViewer>
        <Document
          file={this.props.url}
          onLoadSuccess={this.onDocumentLoad}
          >
          <Page pageNumber={pageNumber} numPages={numPages} />
        </Document>
        </PDFViewer>
      </div>
    );
  }
}

export default Pdf
 
