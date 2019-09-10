import React, { Component } from 'react';
// import matchSorter from 'match-sorter';

import ReactTable from "react-table";
import 'react-table/react-table.css'

class DatabrowseTable extends Component {

  filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;
    if (row[id] !== null){
      return (
        row[id] !== undefined ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase()) : true
      );
    }
  }

  render() {
    let {headerItems, resultData, statusMessage, isSearching} = this.props;
    const searchStatus = isSearching ? 'visible' : ''; 

    return (
      <div className="wires-table">
        <div className={`resultstatus ${searchStatus}`}>
          <i className="fas fa-sync fa-spin"></i>
          <p className="resultstatus__text">Please wait a moment...</p>
        </div>

        <ReactTable
          data={resultData}
          noDataText={statusMessage}
          columns={headerItems}
          defaultPageSize={50}
          //defaultFilterMethod={(filter, row) => matchSorter(row, filter.value, {keys: allKeys})}
          defaultFilterMethod={this.filterCaseInsensitive}
          filterable
          className="-striped -highlight"
          showPaginationBottom={true}/>
      </div>
    );
  }
}

export default DatabrowseTable;
