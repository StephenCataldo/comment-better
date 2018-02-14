import React, { PropTypes, Component } from 'react';
//import style from '../assets/bccModalx.css';
// I think we'll import a Tab system, which I need to write,
// keeping this file clean and editable by devs? 
// I like:
// https://toddmotto.com/creating-a-tabs-component-with-react/#render
// 

//XXXXX This cut-and-paste is pre 15.5 code, bad deal.

 

const Tabs = React.createClass({
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

const Card = React.createClass({
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
const Label = React.createClass({
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

const Pane = React.createClass({
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

const Info = React.createClass({
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


export default class CbbModal extends Component { 

  constructor(props) {
    super(props);
  }
 

  render() {
    //console.log("About to render cbModal - I think this doesn't fire regularly");

    /*
    return (
      <div id="cbModal">Modal
        <Tabs selected={0}>Tabs
        </Tabs>
      </div>
    );
    */

    return (
      <div id="cbModal">
        <Tabs selected={0}>
          <Card>
            <Label>Listen <br/>& Ask</Label>
            <Pane>
              <div id="cbb-yesAnd" title="Yes. And..." className="sg sgsm agree"><clip>Yes. And...</clip>
              </div>
              <div id="cbb-yesAnd" title="Yes. And..." className="sg sgrt agree">
                <clip>I think I see where you're coming from.</clip>
              </div>

            </Pane>
            <Info>
               This is a
               great place to start asking clarifying questions, and eventually add
               "I statements."
            </Info>   
          </Card>
          <Card>
            <Label>Group & Frame</Label>
            <Pane>
              <div id="cbb-yesAnd" title="Yes. And..." className="sg sgsm agree">Say what is important
                to you, not the policy. For example: <clip>People are working full time jobs and not 
                earning a living. This seems unfair to me.</clip> instead of a policy suggestion.
              </div>
            </Pane>
            <Info>
               "I statements" are powerful, and allow you to stick to your frame without creating
               as much disagreement.
            </Info>   
          </Card>

        </Tabs>
      </div>
    );
  }
 

}
