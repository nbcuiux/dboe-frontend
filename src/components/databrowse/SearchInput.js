import React, { Component } from 'react';
import Select from 'react-select';

const dropdownGroupLabel = data => (
  <h4 className={`wires-search-select__group-heading--header ${data.catid}`}>{data.label}</h4>
);

const operators = [
  { value: 'and', label: 'And' },
  { value: 'or',  label: 'Or'  },
  { value: 'not', label: 'Not' }
];

class SearchInput extends Component {

  render() {
    const { allOptions, searchSelected, handleSearchCategory, onAddInputClick } = this.props;

    return (
      <div>
        <div className="wires-search__operator">
          <Select
            options={operators}
            defaultValue={operators[0]}
            className="wires-search-operator"
            classNamePrefix="wires-search-operator"/>
        </div>
        <div className="wires-search__input">
          <Select
            formatGroupLabel={dropdownGroupLabel}
            // value={searchSelected}
            // onChange={handleSearchCategory}
            // selectedValue={searchSelected[0]}
            options={allOptions}
            //defaultValue={allOptions[0]}
            className="wires-search-select"
            classNamePrefix="wires-search-select"/>
          <input id="wiresSearchInput" className="wires-search__input--field" placeholder="DV2141"/>
          <span className="wires-search__input--add" onClick={this.props.onAddInputClick}></span>
        </div>
      </div>
    );
  }
}

export default SearchInput;
