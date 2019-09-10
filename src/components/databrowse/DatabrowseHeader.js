import React, { Component } from 'react';
import {CSVLink} from 'react-csv';

import iconColumnsSM from '../../assets/images/icon-columns-sm.svg';

class DatabrowseHeader extends Component {
  render() {
    const { resultsData, resultsAmount, resultsLabel, csvFileName, csvHeaders } = this.props;
    return (
      <div className="wires-header">
        <h1 className="wires-header__headline">Results {resultsLabel} <span>({resultsAmount})</span></h1>
        <div className="wires-header__subnav">
          <span className="wires-header__subnav--btn" onClick={this.props.openColumnsModal}>Edit Columns <img src={iconColumnsSM} alt="Icon Edit Columns"/></span>
          <CSVLink 
            filename={`WiresDB Results ${csvFileName}`}
            data={resultsData}
            headers={csvHeaders}
            className="wires-header__subnav--btn"
            target='_self'
            onClick={this.props.handleCSV}>
            Export CSV <i className="fa fa-file-export"></i>
          </CSVLink>
        </div>
      </div>
    );
  }
}

export default DatabrowseHeader;
