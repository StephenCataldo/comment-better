/** CbbModal is both the tab system, and the "cards" themselves.
 * Intent to separate out the tab system from content.
 * Idea is that this component can be switched out for different content,
 * and ideally this is the file to be edited by designers.
 *
 * See tab system:
 * https://toddmotto.com/creating-a-tabs-component-with-react/#render
 *
 * @ToDo: some boilerplate from pre 15.5 code, review for modern code stnds.
 */

import React, { PropTypes, Component } from 'react';
//import * as myConstClass from 'chrome/extension/text_constants';
//import ConstantsList from './text_constants'
//import {myConstClass} from './constants'
import * as myConstClass from './constants'

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
    console.log("Label clicked in React:CbbModal:Tabs, index: " + index);
    event.stopPropagation();
    event.preventDefault();
    Array.from(document.getElementById("cbModal").getElementsByTagName("div")).forEach(div => {
      div.onclick = function() {
        document.execCommand("copy")
      }
      div.addEventListener("copy", function(e) {
        e.preventDefault()
        if (e.clipboardData) {
          e.clipboardData.setData('text/plain', e.target.innerText);
        } else if (window.clipboardData) {
          window.clipboardData.setData('Text', e.target.innerText);
        }
      })
    })
    this.setState({
      selected: index
    });
  },
  _renderTitles() {
    // The Tabs have Cards, each of which has a Label with child props
    // to be displayed in this menu tab as a list item
    function labels(child, index) {
      // momentary hack with onclick in li (graphic) and a (orig)
      // Should be easy to clean up when time... I think I don't like
      // using <a> inside li
      let activeClass = (this.state.selected === index ? 'active' : '');
      let classes = "menuTab " + child.props.className; // !!!!
      return (
        <li key={index} className={classes} id={child.props.id}
          onClick={this.handleClick.bind(this, index)}>
          <a href="#" 
            className={activeClass}
            onClick={this.handleClick.bind(this, index)}>
            {child.props.label}
          </a>
        </li>
      );
    }
    return (
      <ul className="tabs__labels">
        {this.props.children.map(labels.bind(this))}
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
    /*
    return (
      <div className="tabs">
        {this.props.children}
      </div>
    );
    */
    return (
      <div className="tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }
});
// end Tabs..
///..
//..
const Card = React.createClass({
  displayName: 'Card',
/*
 * propTypes: {
    Label: React.PropTypes.element.isRequired,
    children: React.PropTypes.element.isRequired
  },
not right at all:
  propTypes: {
    Label: React.PropTypes.element.isRequired,
    Pane: React.PropTypes.element.isRequired
  },
  */
  // We want the child Pane
  //
  // Id problem: orig design had the Pane as a child
  // of the tab, so unique id. Now they are separate.
  // So, redesigning, the id in the tabs matches a class
  // in the Pane. If smooth, erase this note.
  render() {
    return (
      <div className={this.props.id}>
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
      <div className="menuTab">
        Does this Label ever fire anymore? Or been replaced?
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
      <div className="cbbContent">
        {this.props.children}
      </div>
    );
  }
});
/*         <div className="i-button">i</div> */


/** Info area
 * Each of the choices between state and props is interesting.
 * State for class could let users view Info button after Info
 * button. Props are better for rapid open-shut.
 *
 * Loose clicks should close? esc should close?
 */ 
const Info = React.createClass({
  displayName: 'Info',

  getDefaultProps() {
    return {
      open: 0
    };
  },
  getInitialState() {
    return {
      open: this.props.open
    };
  },
  handleClick(index, event) {
    event.preventDefault();
    this.setState({
      open: index
    });
  },

  /*
   * propTypes: {
    children: React.PropTypes.string.isRequired
  },
  */
  render() {
    return (<div/>); // no info yet!
    return (
      <div class="info">
        <div class="x-button">x</div>
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

    /* Dealing with multiple children passed to the Card:
     * - See SplitPane example: https://reactjs.org/docs/composition-vs-inheritance.html
     * - use keys and filters: https://stackoverflow.com/questions/38038835/can-a-react-component-have-multiple-areas-for-child-content
     */


    return (
      <div id="cbModal">
        <Tabs selected={0}>
          <Card
            label = { <span>Step 1<br/>Ask</span> }
          >
            <Pane>
              <div id="cbb-yesAnd" title="Yes. And..." className="sg black">{myConstClass.tab1_msg1}
              </div>
              <div id="cbb-yesAnd" title="Yes. And..." className="sg darkpurple">
                {myConstClass.tab1_msg2}
              </div>
              <div className="sg darkblue">{myConstClass.tab1_msg3}
              </div>
              <div className="sg cerulean">
                {myConstClass.tab1_msg4}
              </div>

              <div id="cbb-3" className="sg green">{myConstClass.tab1_msg5}</div>
              <div className="sg darkpurple">{myConstClass.tab1_msg6}
              </div>


            </Pane>
            <Info>
               This is a
               great place to start asking clarifying questions, and eventually add
               "I statements."
            </Info>   
          </Card>

          <Card
            label = { <span>Step 2<br/>Listen</span> }
          >
            <Pane>
    
              <div className="sg black">{myConstClass.tab2_msg1}</div>

              <div className="sg darkpurple">{myConstClass.tab2_msg2}
              </div>


            </Pane>
            <Info>
               "I statements" are powerful, and allow you to stick to your frame without creating
               as much disagreement.
            </Info>   
          </Card>



          <Card
            label = { <span>Step 3<br/>Reflect</span> }
          >
            <Pane>
    
              <div className="sg black">{myConstClass.tab3_msg1}</div>

              <div className="sg darkpurple">{myConstClass.tab3_msg2}              </div>

              <div className="sg darkblue">{myConstClass.tab3_msg3}</div>

              <div className="sg cerulean">{myConstClass.tab3_msg4}  
              </div>

              <div className="sg green">{myConstClass.tab3_msg5}  
              </div>

            </Pane>
            <Info>
               "I statements" are powerful, and allow you to stick to your frame without creating
               as much disagreement.
            </Info>   
          </Card>


          <Card
            label = { <span>Step 4<br/>Agree</span> }
          >
            <Pane>
              <div id="cbb-1" className="sg black">{myConstClass.tab4_msg1} 
              </div>
							<div id="cbb-1" className="sg darkpurple">
								{myConstClass.tab4_msg2} 
							</div>
              <div id="cbb-1" className="sg darkblue">{myConstClass.tab4_msg3}</div>
              <div id="cbb-1" className="sg cerulean">
                {myConstClass.tab4_msg4} 
              </div>
              <div id="cbb-1" className="sg green">
                {myConstClass.tab4_msg5} 
              </div>
            </Pane>
            <Info>
                  "I statements" with strong beliefs are powerful in reasonable
            conversations — share your heart. But when
            facing hate, make it everyone together
            against the hate. Don't let trolls represent 50% of the country
            while you represent the other 50%.
            </Info>   
          </Card>

          <Card
            label = { <span>Step 5<br/>Explain</span> }
          >
            <Pane>
              <div id="cbb-1" className="sg black">{myConstClass.tab5_msg1} 
              </div>
              <div id="cbb-1" className="sg darkpurple">
                {myConstClass.tab5_msg2} 
              </div>
              <div id="cbb-1" className="sg darkblue">{myConstClass.tab5_msg3}</div>
              <div id="cbb-1" className="sg cerulean">
                {myConstClass.tab5_msg4} 
              </div>
              <div id="cbb-1" className="sg green">
                {myConstClass.tab5_msg5} 
              </div>
              <div id="cbb-1" className="sg darkpurple">
                {myConstClass.tab5_msg6} 
              </div>
            </Pane>
            <Info>
                  "I statements" with strong beliefs are powerful in reasonable
            conversations — share your heart. But when
            facing hate, make it everyone together
            against the hate. Don't let trolls represent 50% of the country
            while you represent the other 50%.
            </Info>   
          </Card>


        

          <Card
            label = { <span>Step 6<br/>Share</span> }
          >
            <Pane>
              <div id="cbb-1" className="sg black">Coming soon: share saved articles and links!
              </div>
            </Pane>
            <Info>
                  "I statements" with strong beliefs are powerful in reasonable
            conversations — share your heart. But when
            facing hate, make it everyone together
            against the hate. Don't let trolls represent 50% of the country
            while you represent the other 50%.
            </Info>   
          </Card>

          <Card
            label = { <span>...</span> }
          >
            <Pane>
              <div id="cbb-1" className="sg darkpurple">Like this? Join SMART Politics!
              </div>
              <div id="cbb-1" className="sg darkblue">Active listening / Steelman
              </div>
              <div id="cbb-1" className="sg cerulean">Self-herding kittens: a DIY guide for progressive social media
              </div>
            </Pane>
            <Info>
                  "I statements" with strong beliefs are powerful in reasonable
            conversations — share your heart. But when
            facing hate, make it everyone together
            against the hate. Don't let trolls represent 50% of the country
            while you represent the other 50%.
            </Info>   
          </Card>



{/**
          <Card
            id="adv"
            className="image-tab-label-tiny"
            title = "Share the Comment Better Button"
            label = { <span>Share the Comment Better Button</span> }
          >
            <Pane>
              <div className="sg adv"><clip>I'm experimenting with tips  
                to make my political
                conversations saner and more civil. I pop up tips
                right in my comment box: join me using the&nbsp;
                <a href="http://cognitivepolitics.org/comment-better-button"
                >Comment Better Button.</a></clip>
              </div>
            </Pane>
            <Info>
            </Info>
          </Card>
          **/}


        </Tabs>
      </div>
    );
  }
 

}
