import React, { Component } from 'react';
import Select from 'react-select';

import iconSearch from '../../assets/images/icon-search-black.svg';

const operators = [
  { value: 'and', label: 'And' },
  { value: 'or',  label: 'Or'  },
  { value: 'not', label: 'Not' }
];

const dropdownGroupLabel = data => (
  <h4 className={`wires-search-select__group-heading--header ${data.catid}`}>{data.label}</h4>
);

class SearchModal extends Component {

  componentDidMount() {
    // Add event listener when modal is opened
    document.body.addEventListener('keydown', this.handleKeyDown);
  } 

  componentWillUnMount() {
    // Remove event listener when modal is closed
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    // Close Modal on Escape key press
    if (e.keyCode === 27)
      this.props.closeSearchModal();
  }

  render() {

    const { allOptions, firstSearchParam, firstSearchVal, secondSearchParam, secondSearchVal, handleSearchInputParam, handleSearchInputVal, handleSecondSearchInputParam, handleSecondSearchInputVal, searchOperator, handleSearchOperator } = this.props;
    const showSearchModal = this.props.searchModalState ? 'opened' : '';
    
    return (
      <div className={`modal ${showSearchModal}`}>
        <div className="modal__bg" onClick={this.props.closeSearchModal}></div>
        <div className="modal__content--sm">
          <div className="modal__content--header">
            <h2 className="modal__headline"><img src={iconSearch} alt="icon search"/>Multisearch</h2>
            <span className="modal__btn--close" onClick={this.props.closeSearchModal}></span>
          </div>
          <form onSubmit={(e)=>this.props.searchData(e)}>
            <div className="modal-search">
              <div className="modal-search__header">
                <p className="modal-search__headline">I am looking for...</p>
              </div>
              <div className="modal-search__body">
                
                  <div className="wires-search__input">
                    <Select
                      formatGroupLabel={dropdownGroupLabel}
                      value={firstSearchParam}
                      onChange={handleSearchInputParam}
                      selectedValue={firstSearchParam}
                      options={allOptions}
                      className="wires-search-select"
                      classNamePrefix="wires-search-select"/>
                    <input className="wires-search__input--field" placeholder="Search" onChange={handleSearchInputVal} value={firstSearchVal}/>
                  </div>

                  <div className="wires-search__input">
                    <div className="wires-search__operator">
                      <Select
                        options={operators}
                        isSearchable={false}
                        value={searchOperator}
                        defaultValue={operators[0]}
                        onChange={handleSearchOperator}
                        className="wires-search-operator"
                        classNamePrefix="wires-search-operator"/>
                    </div>

                    <Select
                      formatGroupLabel={dropdownGroupLabel}
                      value={secondSearchParam}
                      onChange={handleSecondSearchInputParam}
                      selectedValue={firstSearchParam}
                      options={allOptions}
                      className="wires-search-select"
                      classNamePrefix="wires-search-select"/>
                    <input className="wires-search__input--field" placeholder="Search" onChange={handleSecondSearchInputVal} value={secondSearchVal}/>
                  </div>
                
              </div>
            </div>
            <div className="modal__content--footer">
              <button type="submit" className="modal__btn--large">
                <i className="fa fa-search"></i>Search
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default SearchModal;
