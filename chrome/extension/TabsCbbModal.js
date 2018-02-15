This file isn't right.

import React, { PropTypes, Component } from 'react';
//import style from '../assets/bccModalx.css';
// I think we'll import a Tab system, which I need to write,
// keeping this file clean and editable by devs? 
// I like:
// https://toddmotto.com/creating-a-tabs-component-with-react/#render
// 

//XXXXX This cut-and-paste is pre 15.5 code, bad deal.

export default class TabsCbbModal extends Component { 

  constructor(props) {
    super(props);
  }
 
  displayName: 'Tabs',
  getDefaultProps() {
    return {
      selected: 0
    };
  },
  getInitialState() {
    return {
      selected: this.props.selected
    };
  },
  handleClick(index, event) {
    event.preventDefault();
    this.setState({
      selected: index
    });
  },
  _renderTitles() {
    function labels(child, index) {
      let activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={index}>
          <a href="#" 
            className={activeClass}
            onClick={this.handleClick.bind(this, index)}>
            {child.props.Label}
          </a>
        </li>
      );
    }
    return (
      <ul className="tabs__labels">
      </ul>
    );
  },
  _renderContent() {
    return (
      <div className="tabs__content">
        {this.props.children[this.state.selected]}
      </div>
    );
  },
  render() {
    // Disable all the complexity!!
    return (
      <div className="tabs">
        {this.props.children}
      </div>
    );
    return (
      <div className="tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }
});
// end Tabs

export const Card = React.createClass({
  displayName: 'Card',
/*
 * propTypes: {
    Label: React.PropTypes.element.isRequired,
    children: React.PropTypes.element.isRequired
  },
  */
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});
export const Label = React.createClass({
  displayName: 'Label',
  /*
  propTypes: {
    children: React.PropTypes.array.isRequired
    // element? string? = what do we want to send to Label. 
    // Maybe not define, because docs are changing?
  },
  */
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

export const Pane = React.createClass({
  displayName: 'Pane',
  /*propTypes: {
    // array, and object, both?
    children: React.PropTypes.array.isRequired
  },
  */
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

export const Info = React.createClass({
  displayName: 'Info',
  /*
   * propTypes: {
    children: React.PropTypes.string.isRequired
  },
  */
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});



