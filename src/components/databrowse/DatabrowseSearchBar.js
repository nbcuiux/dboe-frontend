import React, { Component } from 'react';
import iconSearch from '../../assets/images/icon-search.svg';
import Select from 'react-select';

// Add custom markup to dropdown headers (to add icons)
const dropdownGroupLabel = data => (
  <h4 className={`wires-search-select__group-heading--header ${data.catid}`}>{data.label}</h4>
);

class DatabrowseSearchBar extends Component {
  render() {
    const { firstSearchParam, allOptions, handleSearchInputParam, multiSearchState } = this.props;
    const multiSearchStyle = multiSearchState ? 'enabled' : '';

    return (
      <div className="wires-search">
        <form onSubmit={(e)=>this.props.searchData(e)}>
          <div className="wires-search__btn--wrapper">
            <button type="submit" className="wires-search__btn">
              <img src={iconSearch} alt="icon search"/>
            </button>
          </div>
          <div className="wires-search__bar">
            <span className="wires-search__bar--text">I am looking for</span>
            <div className="wires-search__input">
              <Select
                formatGroupLabel={dropdownGroupLabel}
                value={firstSearchParam}
                onChange={handleSearchInputParam}
                selectedValue={firstSearchParam}
                options={allOptions}
                defaultValue={allOptions[0]}
                className="wires-search-select"
                classNamePrefix="wires-search-select"/>
              <input id="wiresSearchInput" className="wires-search__input--field" placeholder="DV2141" onChange={this.props.handleSearchInputVal}  value={this.props.firstSearchVal}/>
            </div>
          </div>
        </form>

        <a className={`wires-search__btn--multi ${multiSearchStyle}`} onClick={this.props.openSearchModal}>Multisearch {multiSearchStyle}</a>
      </div>
    );
  }
}

export default DatabrowseSearchBar;
