/**
* Created by Pebie on 22/09/15.
*/

import '../../styles/components/header.scss';

import React, { Component } from 'react';

export default class Header extends Component {

  render() {
    return (
      <div className="header">
        <span className="header-text">make-doc</span>
        <span className="header-text pull-right">pebie.</span>
      </div>
    );
  }
}
