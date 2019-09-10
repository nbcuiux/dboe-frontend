import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'

// Image Assets
import nbclogo from '../assets/images/logo-nbc.svg';

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="nav__logo">
          <Link to='/'><img src={nbclogo} className="nav__logo--img" alt="logo"/></Link>
        </div>
        <nav className="nav__bar">
          <NavLink to='/databrowse' activeClassName='active' className="nav__link">
            <svg className="nav__icon" height="16" viewBox="0 0 22 16" width="22">
              <g fill="none">
                <g className="nav__icon--stroke">
                  <rect height="15" rx="1" width="21" x=".5" y=".5"/>
                  <path d="m7.25.5v15"/>
                  <path d="m14.25.5v15"/>
                  <path d="m.5 10.25h21"/>
                  <path d="m.5 5.25h21"/>
                </g>
                <g className="nav__icon--fill">
                  <rect height="2" rx="1" width="4" x="2" y="2"/>
                  <rect height="2" rx="1" width="4" x="9" y="2"/>
                  <rect height="2" rx="1" width="4" x="16" y="2"/>
                  <rect height="2" rx="1" width="4" x="2" y="7"/>
                  <rect height="2" rx="1" width="4" x="2" y="12"/>
                </g>
              </g>
            </svg>
            <span className="nav__link--text">Data</span>
          </NavLink>
        </nav>
      </div>
    );
  }
}

export default Nav;