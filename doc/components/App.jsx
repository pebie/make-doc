/**
* Created by Pebie on 22/09/15.
*/
import '../styles/fonts/fonts.scss';
import '../styles/utils/utils.scss';
import '../styles/themes/monokai/monokai.less';

import React, { Component } from 'react';
import Doc from 'components/doc/Doc.jsx';
import Header from 'components/layout/Header.jsx';


export default class App extends Component {

  render() {
    return (
      <div className="main">
        <Header/>
        <Doc className="doc"/>
      </div>
    );
  }
}
