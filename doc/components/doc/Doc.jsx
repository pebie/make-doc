/**
* Created by Pebie on 22/09/15.
*/
import '../../styles/components/doc.scss';

import React, { Component, PropTypes, Popover, Tooltip } from 'react';
import { Grid, Row, Col, Modal, OverlayTrigger, Button } from 'react-bootstrap';
import DocHelper from '../../helpers/DocHelper.js';
import DocText from './DocText.jsx';
import $ from 'jquery';
import _ from 'lodash';

export default class Doc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDoc:'Roll over the code !',
      open:false,
      footerHeight:114
    }
  }
  componentDidMount() {

    $('pre > .line').each((i,line) => {
      let isComment = $('span.comment', line).length > 0;
      if(isComment){
        $(line).addClass('is-comment');
      }else{
        $(line).addClass('is-code');
      }
    });

    $('pre > .line').each((i,line) => {
      let wrap =  $(line).nextUntil('.is-code');
      $(wrap).wrapAll('<div class=\'comment-block\'></div>');
    });

    $('pre > .comment-block').each((i,line) => {
      $(line).attr('data-doc-id',i);
      $(line).addClass('comment-block-toggle',i);
      $(line).next().attr('data-doc-id',i);
      $(line).next().addClass('pointer');
      $(line).next().bind('click',this, this.handleClick);
      $(line).next().bind('mouseover',this, this.handleMouseover);
      $(line).next().bind('mouseout',this, this.handlerMouseout);
      this.props.model[i]  = this.clean($(line).text());
    });
  }

  clean(text){
    let filter = text.replace('/*','');
    filter = filter.replace('*/','');
    filter = filter.replace('//','');
    filter = filter.replace(' //','');
    filter = filter.replace('// ','');
    filter = $.trim(filter);
    return filter;
  }

  handleMouseover(e){
    let _this = e.data;
    let $currentTarget = $(e.currentTarget);
    $currentTarget.addClass('over');
    let id = $currentTarget.attr('data-doc-id');
    _this.setState({
      currentDoc : _this.props.model[id],
      footerHeight: $('.doc_helper').innerHeight()
    });
  }

  handlerMouseout(e){
    let _this = e.data;
    let $currentTarget = $(e.currentTarget);
    $currentTarget.removeClass('over');
  }

  handleClick(e){
    let _this = e.data;
    let $currentTarget = $(e.currentTarget);
    let id = $currentTarget.attr('data-doc-id');
    $currentTarget.prevUntil('.is-code').toggleClass('comment-block-toggle--visible')
  }

  createMarkup() {
    return { __html: DocHelper.getDocHtml() };
  }

  toggle(){
    if(this.state.open){
      $('pre > .comment-block').each((i,line) => {
        $(line).removeClass('comment-block-toggle--visible');
      });
    }else{
      $('pre > .comment-block').each((i,line) => {
        $(line).addClass('comment-block-toggle--visible');
      });
    }
    this.setState({
      open:!this.state.open
    })
  }

  render() {
    let divStyle = {
      'paddingBottom': this.state.footerHeight
    };
    return (
      <div className='doc'>

        <div className='doc_code' style={divStyle}>
          <div dangerouslySetInnerHTML={this.createMarkup()}>

          </div>
        </div>
        <div className='doc_helper'>
          <DocText toggle={this.toggle.bind(this)} currentDoc={ this.state.currentDoc }/>
        </div>

      </div>
    );
  }
}
Doc.propTypes = {
  model: PropTypes.object
};
Doc.defaultProps = { model: {}};
