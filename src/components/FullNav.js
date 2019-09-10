import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'

// Image Assets
import nbclogo from '../assets/images/logo-nbc.svg';

class FullNav extends Component {
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
          
          <NavLink to='/patterns' activeClassName='active' className="nav__link">
            <svg className="nav__icon" width="20.4px" height="23px" viewBox="0 0 20.4 23">
              <g className="nav__icon--stroke">
                <path d="M6.9,17.3c1.2,1.9,2.1,3,2.1,3c0.8,1.4,0,2.2-0.8,2.2H0.5c0,0,3.2-6.4,3.7-7.5"/>
                <line x1="10.6" y1="9.9" x2="13.5" y2="7.1"/>
                <path d="M17.1,8c0.2-2-0.8-4.5-4.5-4.7"/>
                <path d="M19.9,8.2c0.1-3.6-3-7.7-7.6-7.7"/>
                <path d="M4.9,4.6c-3,3-3,8.1,0.2,11.2S13.2,19,16.2,16c-3-3.3-2.7-2.9-5.9-6C7.2,6.8,7.5,7.1,4.9,4.6z"/>
              </g>
            </svg>
            <span className="nav__link--text">Pattern</span>
          </NavLink>

          <NavLink to='/routers' activeClassName='active' className="nav__link">
            <svg className="nav__icon" width="23.6px" height="19.2px" viewBox="0 0 23.6 19.2">
              <g className="nav__icon--fill">
                <path d="M21.3,10.1h-0.8V8.6c0,0,0-0.1,0-0.1h0.6c1.3,0,2.3-1,2.3-2.3V2.3c0-1.3-1-2.3-2.3-2.3H2.3C1,0,0,1,0,2.3v3.9
                  c0,1.3,1,2.3,2.3,2.3h0.8c0,0,0,0.1,0,0.1v1.5H2.5c-1.3,0-2.3,1-2.3,2.3v3.9c0,1.3,1,2.3,2.3,2.3h0.3v0.3c0,0.2,0.1,0.3,0.3,0.3
                  h1.7c0.2,0,0.3-0.1,0.3-0.3v-0.3h13.8v0.3c0,0.2,0.1,0.3,0.3,0.3h1.7c0.2,0,0.3-0.1,0.3-0.3v-0.3h0.1c1.3,0,2.3-1,2.3-2.3v-3.9
                  C23.6,11.1,22.6,10.1,21.3,10.1z M2.3,7.5C1.6,7.5,1,6.9,1,6.2V2.3C1,1.6,1.6,1,2.3,1h18.8c0.7,0,1.3,0.6,1.3,1.3v3.9
                  c0,0.7-0.6,1.3-1.3,1.3H2.3z M4.1,8.5h15.4c0,0,0,0.1,0,0.1v1.5H4.1L4.1,8.5C4.1,8.6,4.1,8.5,4.1,8.5z M22.6,16.3
                  c0,0.7-0.6,1.3-1.3,1.3H2.5c-0.7,0-1.3-0.6-1.3-1.3v-3.9c0-0.7,0.6-1.3,1.3-1.3h18.8c0.7,0,1.3,0.6,1.3,1.3V16.3z"/>
                <circle cx="4" cy="14.4" r="0.8"/>
                <circle cx="6.8" cy="14.4" r="0.8"/>
                <circle cx="9.6" cy="14.4" r="0.8"/>
                <circle cx="20" cy="14.4" r="0.8"/>
                <circle cx="20" cy="4.2" r="0.8"/>
                <circle cx="9.6" cy="4.2" r="0.8"/>
                <circle cx="6.8" cy="4.2" r="0.8"/>
                <circle cx="4" cy="4.2" r="0.8"/>
              </g>
            </svg>

            <span className="nav__link--text">Router</span>
          </NavLink>

          <NavLink to='/visual' activeClassName='active' className="nav__link">
            <svg className="nav__icon" width="20.3px" height="23.5px" viewBox="0 0 20.3 23.5">
              <g className="nav__icon--stroke">
                <circle cx="9.7" cy="12.1" r="2.9"/>
                <circle cx="12.9" cy="3" r="1.9"/>
                <circle cx="17.4" cy="10" r="1.9"/>
                <circle cx="2.9" cy="20.5" r="1.9"/>
                <circle cx="15.9" cy="19.1" r="1.9"/>
                <line x1="8.1" y1="14.4" x2="4.2" y2="19.1"/>
                <line x1="11" y1="9.5" x2="12.3" y2="4.8"/>
                <line x1="12.6" y1="11.8" x2="15.6" y2="10.7"/>
                <line x1="11.6" y1="14.2" x2="14.6" y2="17.8"/>
              </g>
            </svg>

            <span className="nav__link--text">Visual</span>
          </NavLink>
        </nav>
      </div>
    );
  }
}

export default FullNav;