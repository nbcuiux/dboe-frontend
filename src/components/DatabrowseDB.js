import React, { Component } from 'react';

import DatabrowseSearchBar from './databrowse/DatabrowseSearchBar';
import DatabrowseHeader from './databrowse/DatabrowseHeader';
import DatabrowseTable from './databrowse/DatabrowseTable';
import ColumnsModal from './databrowse/ColumnsModal';
import SearchModal from './databrowse/SearchModal';
import ErrorModal from './utils/ErrorModal';

const defaultColumns = ['Wire Number', 'Source Rack', 'Source Equipment', 'Source Connector', 'Source Drawing', 'Destination Rack', 'Destination Equipment', 'Destination Connector', 'Destination Drawing'];

// a little function to help us with reordering the result
const reorderList = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// Sorts parameters by name (as of now, will be index number later)
const sortOn = (property) => {
  return function(a, b) {
    if (a[property] < b[property]) {
      return -1;
    } else if(a[property] > b[property]){
      return 1;
    } else{
      return 0;
    }
  }
}

class DatabrowseDB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnsModal: false,
      searchModal: false,
      errorModal: false,
      fatalError: false,
      multiSearch: false,

      allParameters: [],
      allKeys: [],
      columnOrder: [],
      headerItems: [],

      csvHeaders: [],
      csvFileName: '',
      
      searchResults: [],
      resultsAmount: 0,
      resultsLabel: '',
      
      tableStatusMsg: 'Use the top bar to search the database...',
      errorMessage: '',
      
      isSearching: false,
      
      notPossibleParameters: [],

      firstSearchParam: null,
      firstSearchVal: '',

      secondSearchParam: null,
      secondSearchVal: '',
      searchOperator: { value: 'and', label: 'And' },
    };
  }

  componentDidMount() {
    // Make API call to populate the Parameters list
    fetch('http://ecl-gmops-contdl01:3001/parameters?groupBy=Tag')
    .catch(error => {
      console.log('error');
        this.setState({ 
          errorModal: true,
          fatalError: true,
          errorMessage: 'Connect to the NBC Corporate Network to use this application.', 
          tableStatusMsg: ''
        });
    })
    .then(results => {
      if (results) {
        return results.json();      
      }
    }).then(data => {
      if (data) {
        var columnParams = this.state.columnOrder,
            allKeys = this.state.allKeys,
            csvHeaderItems = this.state.csvHeaders;

        var obj = data.results;
        var newResult = Object.keys(obj).map(function(key) {
          // Label and options are for dropdown
          return {
            label: key, 
            catid: key.replace(/\s/g, '').toLowerCase(), 
            options: obj[key], 
            selected: false,
          };
        });
        // adding new properies to all parameters, each item will now have `selected` and `category` properties
        // this will allow us to havndle checkboxes and have relationships beetwen  items and DOM elements
        // Header property now added on load as well
        newResult.forEach(function(item, index) {
          // Sort Parameters first
          item.options.sort(sortOn('sortIndex'));

          for(var i = 0; i < item.options.length; i++){
            item.options[i].selected = false;
            item.options[i].Header = item.options[i].name;
            item.options[i].accessor = item.options[i].key;
            item.options[i].category = item.label;
    
            // For Dropdown
            item.options[i].value = item.options[i].key;
            item.options[i].label = item.options[i].name;

            // For Filtering
            // item.options[i].filterAll = true;

            // Used for sending requests to backend
            allKeys.push(item.options[i].key);

            // Push label and key to array for CSV export labeling
            csvHeaderItems.push({label: item.options[i].name, key:item.options[i].key});

            // Checks default columns in modal
            for (var x = 0; x < defaultColumns.length; x++) {
              if (item.options[i].name === defaultColumns[x]) {
                item.options[i].selected = true;
                columnParams.push(item.options[i]);
              }
            } 
          }
        })
        
        this.setState({
          allParameters: newResult,
          columnOrder: columnParams,
          headerItems: columnParams,
          allKeys: allKeys,
          csvHeaders: csvHeaderItems
        });
      }
    });
  }

  // Open Edit Columns Modal
  openColumnsModal = () => {
    this.setState({ columnsModal: true });
  }

  // Close Edit Columns Modal
  closeColumnsModal = () => {
    if (!this.state.errorModal) {
      this.setState({ columnsModal: false });
    }
  }

  // Close Error Modal
  closeErrorModal = () => {
    if (!this.state.fatalError) {
      this.setState({ 
        errorModal: false,
        errorMessage: '' 
      });
    }
  }

  openSearchModal = (e) => {
    this.setState({searchModal: true});
  }

  // Close Edit Columns Modal
  closeSearchModal = () => {
    if (!this.state.errorModal) {
      this.setState({ searchModal: false });
    }
  }

  handleSearchInputVal = (evt) => {
    this.setState({ 
      firstSearchVal: evt.target.value
    });
  }

  handleSecondSearchInputVal = (evt) => {
    this.setState({ 
      secondSearchVal: evt.target.value
    });
  }

  handleSearchInputParam = (selectedParam) => {
    this.setState({ 
      firstSearchParam: selectedParam,
    });
  }

  handleSearchOperator = (item) => {
    this.setState({ 
      searchOperator: item,
    });
  }

  handleSecondSearchInputParam = (selectedParam) => {
    this.setState({ 
      secondSearchParam: selectedParam,
    });
  }

  searchData = (e) => {
    e.preventDefault();

    if (this.state.firstSearchParam === null) {
      this.setState({
        errorModal: true,
        errorMessage: 'Select a parameter to search by.'
      });
    } else if (this.state.searchModal && this.state.secondSearchParam === null) {
      this.setState({
        errorModal: true,
        errorMessage: 'Select a second parameter to search by.',
      });
    } else if (this.state.firstSearchVal === '' || (this.state.searchModal && this.state.secondSearchVal === '')) {
      this.setState({
        errorModal: true,
        errorMessage: 'Add a value to search.',
      });
    } else {
      this.setState({
        isSearching: true,
      });

      if (!this.state.searchModal) {
        var firstParam = this.state.firstSearchParam.value,
            firstVal = this.state.firstSearchVal;

        this.setState({ multiSearch: false });

        var searchByObj = {
          match: {[firstParam]: firstVal},
          return: this.state.allKeys,
        };
      } else {
        var searchOperator = this.state.searchOperator.value,
            secondParam = this.state.secondSearchParam.value,
            secondVal = this.state.secondSearchVal;

        firstParam = this.state.firstSearchParam.value;
        firstVal = this.state.firstSearchVal;

        this.setState({ multiSearch: true, searchModal: false });

        if (searchOperator === 'not') {
          // Different format for NOT queries
          searchByObj = {
            match: { and: [
              { [firstParam]: firstVal},
              { not: {[secondParam]: secondVal}}
            ]},
            return: this.state.allKeys,
          }
        } else {
          // AND/OR Queries
          searchByObj = {
            match: { [searchOperator]: [
              { [firstParam]: firstVal},
              { [secondParam]: secondVal}
            ]},
            return: this.state.allKeys,
          }
        }
      }

      fetch('http://ecl-gmops-contdl01:3001/query', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchByObj)
      }).then(results => {
        // console.log('Results:', results);
        /* if (results.status === 404) {
          // ERROR: DATA NOT FOUND
          this.setState({ 
            tableStatusMsg: 'No Data Found. Try another search...',
            searchResults: [],
            resultsAmount: 0,
            resultsLabel: '',
            errorModal: true,
            errorMessage: 'No Data Found. Try another search...'
          });
          // alert('No Data Found. Try another search...');
        } else if (results.status === 400) {
          // ERROR: NO RETURN PARAMETERS
          this.setState({ 
            tableStatusMsg: 'No Data Found. Try another search...',
            searchResults: [],
            resultsAmount: 0,
            resultsLabel: '',
            errorModal: true,
            errorMessage: 'No Data Found. Try another search...'
          });
        } else if (results.status === 500) {
          // ERROR: BACKEND ERROR
          this.setState({ 
            tableStatusMsg: 'Internal Server Error... Please try again later...',
            searchResults: [],
            resultsAmount: 0,
            resultsLabel: '',
            errorModal: true,
            errorMessage: 'Error Status: 500. Internal Server Error. Please try again later...'
          });
        }  else if (results.status === 502) {
          // ERROR: BACKEND ERROR
          this.setState({ 
            tableStatusMsg: 'Gateway Error. Please try again.',
            searchResults: [],
            resultsAmount: 0,
            resultsLabel: '',
            errorModal: true,
            errorMessage: 'Error Status: 502. Gateway Error. Please try again.'
          });
        } else { } */
          if (this.state.multiSearch) {
            var resultsLabel = 'for ' + this.state.firstSearchParam.name + ' ' + firstVal + ' ' + this.state.searchOperator.value + ' ' + this.state.secondSearchParam.name + ' ' + secondVal,
                csvFileName = '' + this.state.firstSearchParam.name + ' ' + firstVal + ' ' + this.state.searchOperator.value + ' ' + this.state.secondSearchParam.name + ' ' + secondVal;
          } else {
            resultsLabel = 'for ' + this.state.firstSearchParam.name + ' ' + firstVal;
            csvFileName = '' + this.state.firstSearchParam.name + ' ' + firstVal;
          }

          this.setState({
            resultsLabel: resultsLabel,
            csvFileName: csvFileName,
            tableStatusMsg: 'No Data Found.',
            searchModal: false,
          });

          return results.json();
        
      }).then(data => {
        // console.log('Data', data);
        // Hide search idicator
        this.setState({ isSearching: false });
        // If there are no results, set error
        if (data.results === null || data.results.length === 0) {
          var errorMessage = '';
          for (var i = 0; i < data.unsuccessful.length; i++) {
            errorMessage += 'Error ' + data.unsuccessful[i].status + ' (' + data.unsuccessful[i].datasource + '). ' + data.unsuccessful[i].message + '. \n';
          }
          this.setState({ 
            searchResults: [],
            resultsAmount: 0,
            tableStatusMsg: errorMessage,
            errorModal: true,
            errorMessage: errorMessage
          });
        } else {
          if (data) {
            var resultsArray = data.results;
            // Grey columns out if parameters aren't possible.
            var notPossibleParameters = data.notPossible,
                newHeaderItems = this.state.headerItems,
                headerItemArray = [];

            newHeaderItems.forEach(function(item) {
              // Reset styles for each column
              item.style = {backgroundColor: ''};
              item.headerClassName = '';

              notPossibleParameters.forEach(function(parameter) {
                // Set disabled style on Params if not possible
                if (item.key === parameter) {
                  item.style = { backgroundColor: '#F4F4F5' };
                  item.headerClassName = 'disabled';
                }
              });
              // Push item into new array
              headerItemArray.push(item);
            });

            // Add results to table / Grey out columns as needed
            this.setState({
              searchResults: resultsArray,
              resultsAmount: resultsArray.length,
              headerItems: headerItemArray,
              notPossibleParameters: notPossibleParameters
            });
          }
        }
      });
    }
  }

  // Handle Checkbox click
  addParamToCol = (e, item, parent, index) => {
    const colParams = this.state.columnOrder;
    let itemName = item.name;
    
    if (e.target.checked) {
      // Check select category checkbox if all subitems selected
      var counter = 0;

      parent.options.forEach(function(item) {
       if (item.selected) {
          counter++;
          if (counter === parent.options.length - 1) {
            parent.selected = true;
          }
           else {
            parent.selected = false;
          }
        }
      })

      item.selected = true;
      colParams.push(item);

      this.setState({ 
        columnOrder: colParams 
      });
        // console.log('Column Order Add:', this.state.columnOrder);
    } else {
      //uncheck select category checkbox if all subitems de-selected
      counter = parent.options.length;
      
      if (parent.selected) {
        parent.options.forEach(function(item) {
          if(item.selected === false) {
            counter--;
            if(counter === 1) {
              parent.selected = false;
            }
          }
        })
      }

      index = colParams.findIndex(x => x.name === itemName);
      
      if (index !== -1) {
        item.selected = false;
        colParams.splice(index, 1);
         // update the state with the new array of options
        this.setState({ 
          columnOrder: colParams 
        });
      }
    }
  }

  // Handle Close button on draggable item
  removeParamFromCol = (e, item) => {
    const colParams = this.state.columnOrder;
    const allParams = this.state.allParameters;
    item.selected = false;
    var counter = 0;
    let itemName = item.name;
    var index;
    index = colParams.findIndex(x => x.name === itemName);
    colParams.splice(index, 1);
      // update the state with the new array of options
      this.setState({ 
        columnOrder: colParams 
      });
    // console.log('Column Order Rm:', this.state.columnOrder);
    // loop in category params and looks for selected items, 
    // uncheck select category if user removes draggable items and no more selected left
    allParams.forEach(function(param) {
      if(item.category === param.name) {
        for(var i = 0; i < param.options.length; i++) {
          if(param.options[i].selected === false) {
            counter++;
            if(counter === param.options.length) {
              param.selected = false;
            }
          }
        }
      }
    })
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const columnOrder = reorderList(
      this.state.columnOrder,
      result.source.index,
      result.destination.index
    );

    this.setState({
      columnOrder
    });
  }

  handleColumnUpdate = (e) => {
    if (this.state.columnOrder.length === 0) {
      // alert('Please select at least 1 parameter.');
      this.setState({ 
        errorModal: true,
        errorMessage: 'Please select at least 1 parameter.' 
      });
    } else {
      /* Old Way of setting minWidth 
      let headerItems = this.state.columnOrder.map(function(el) {
        var objItem = Object.assign({}, el);
        objItem.minWidth = 200;
        return objItem;
      });

      // Update the header items state on apply
      this.setState({ headerItems });
      */

      var columnOrder = this.state.columnOrder,
          notPossibleParameters = this.state.notPossibleParameters,
          headerItemArray = [];
      
      columnOrder.forEach(function(item) {
        // Reset styles for each column
        item.style = {backgroundColor: ''};
        item.headerClassName = '';

        if (notPossibleParameters.length > 0) {
          notPossibleParameters.forEach(function(parameter) {
            // Set disabled style on Params if not possible
            if (item.key === parameter) {
              item.style = { backgroundColor: '#F4F4F5' };
              item.headerClassName = 'disabled';
            }
          });
        }
        item.minWidth = 200;
        headerItemArray.push(item);
      });
      
      // Update state and close the Modal when done
      this.setState({ 
        headerItems: headerItemArray,
        columnsModal: false
      });
    }
  }

  // Select All checkboxes
  selectAllParams = (e) => {
    let colParams = this.state.columnOrder,
        allParams = this.state.allParameters;

    if (e.target.checked) {
      // If button is checked
      allParams.forEach(function(item, index) {
        item.selected = true;
        item.options.forEach(function(subitem, index) {
          subitem.selected = true;
          colParams.push(subitem);
        }); 
      });
      this.setState({ 
        columnOrder: colParams 
      });
    } else {
      // If button is unchecked
      // If button is checked
      allParams.forEach(function(item, index) {
        item.selected = false;
        item.options.forEach(function(subitem, index) {
          subitem.selected = false;
          colParams.splice(subitem);
        }); 
      });
      this.setState({ 
        columnOrder: colParams 
      });
    }
  }

  // Selection for group of items
  groupSelect = (e, data) => {
    let colParams = this.state.columnOrder;
  
    if (e.target.checked) {
      // data.selected = true; - select category checkbox
      data.selected = true;
      //loop in parameters and check for items that already present in this.state.columnOrder, if not there - push them;
      data.options.forEach(function(item, index) {
        let itemName = item.name;
        index = colParams.findIndex(x => x.name === itemName);
        if(index === -1) {
          item.selected = true;
          colParams.push(item)
        }  
      })
      this.setState({ 
         columnOrder: colParams 
      });
    }
    else {
      // uncheck category checkbox
      data.selected = false;
      // loop in parameters and remove items from state based on item.selected property
      data.options.forEach(function(item, index) {
        let itemName = item.name;
        index = colParams.findIndex(x => x.name === itemName);
        if (index !== -1 && item.selected) {
          item.selected = false;
          colParams.splice(index, 1)
        }  
      })
      this.setState({ 
        columnOrder: colParams 
      });
    }
  }

  // If there are no results to export, alert the user.
  handleCSVExport = (data) => {
    if (this.state.resultsAmount === 0) {
      this.setState({ 
        errorModal: true,
        errorMessage: 'There are no search results to export. Please try a search first.' 
      });
      return false;
    }
  }

  render() {
    const { allKeys, headerItems, searchResults, resultsAmount, resultsLabel, tableStatusMsg, csvFileName, csvHeaders, errorModal, errorMessage, fatalError, isSearching } = this.state;
    const fatalErrorStatus = fatalError ? 'fatal' : '';

    return (
      <div>
        <div className={`wires-body ${fatalErrorStatus}`}>
          <DatabrowseSearchBar 
            allOptions={this.state.allParameters}
            searchData={this.searchData}
            openSearchModal={this.openSearchModal}
            firstSearchParam={this.state.firstSearchParam} 
            firstSearchVal={this.state.firstSearchVal}
            handleSearchInputVal={this.handleSearchInputVal}
            handleSearchInputParam={this.handleSearchInputParam}
            multiSearchState={this.state.multiSearch} />

          <DatabrowseHeader
            openColumnsModal={this.openColumnsModal}
            csvHeaders={csvHeaders}
            csvFileName={csvFileName}
            handleCSV={this.handleCSVExport}
            resultsData={searchResults}
            resultsAmount={resultsAmount}
            resultsLabel={resultsLabel} />

          <DatabrowseTable
            allKeys={allKeys}
            headerItems={headerItems}
            resultData={searchResults}
            statusMessage={tableStatusMsg}
            isSearching={isSearching} />
        </div>

        <ColumnsModal 
          columnsModalState={this.state.columnsModal} 
          closeColumnsModal={this.closeColumnsModal}
          handleColumnUpdate={this.handleColumnUpdate}
          allParameters={this.state.allParameters}
          columnOrder={this.state.columnOrder}
          columnOrderDragEnd={this.onDragEnd}
          selectAllParams={this.selectAllParams}
          addParamToCol={this.addParamToCol}
          removeParamFromCol={this.removeParamFromCol}
          groupSelect={this.groupSelect} />

        <SearchModal 
          searchModalState={this.state.searchModal}
          closeSearchModal={this.closeSearchModal}
          searchData={this.searchData}
          allOptions={this.state.allParameters}
          
          firstSearchVal={this.state.firstSearchVal} 
          firstSearchParam={this.state.firstSearchParam}
          handleSearchInputParam={this.handleSearchInputParam}
          handleSearchInputVal={this.handleSearchInputVal}

          searchOperator={this.state.searchOperator}
          handleSearchOperator={this.handleSearchOperator}

          secondSearchVal={this.state.secondSearchVal} 
          secondSearchParam={this.state.secondSearchParam}
          handleSecondSearchInputParam={this.handleSecondSearchInputParam}
          handleSecondSearchInputVal={this.handleSecondSearchInputVal}/>

        <ErrorModal
          fatalError={fatalError}
          modalState={errorModal}
          modalMessage={errorMessage}
          closeErrorModal={this.closeErrorModal} />
      </div>
    );
  }
}

export default DatabrowseDB;
