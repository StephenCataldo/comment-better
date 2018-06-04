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
            label = { <span>Listen<br/> & Ask</span> }
          >
            <Pane>
              <div id="cbb-yesAnd" title="Yes. And..." className="sg agree">{myConstClass.tab1_msg1}
              </div>
              <div id="cbb-yesAnd" title="Yes. And..." className="sg agree">
                {myConstClass.tab1_msg2}
              </div>
              <div className="sg agree">{myConstClass.tab1_msg3}
              </div>
              <div className="sg agree">
                {myConstClass.tab1_msg4}
              </div>

              <div id="cbb-3" className="sg question">{myConstClass.tab1_msg5}</div>
              <div className="sg personal">{myConstClass.tab1_msg6}
              </div>


            </Pane>
            <Info>
               This is a
               great place to start asking clarifying questions, and eventually add
               "I statements."
            </Info>   
          </Card>

          <Card
            label = { <span>Open<br/> & Close</span> }
          >
            <Pane>
    
              <div className="sg observe">{myConstClass.tab2_msg1}</div>

              <div className="sg group">{myConstClass.tab2_msg2}
              </div>

              <div id="cbb-yesAnd" title="Yes. And..." className="sg agree">{myConstClass.tab2_msg3}
              </div>
              <div className="sg personal">{myConstClass.tab2_msg4}</div>


            </Pane>
            <Info>
               "I statements" are powerful, and allow you to stick to your frame without creating
               as much disagreement.
            </Info>   
          </Card>



          <Card
            label = { <span>Group<br/> & Frame</span> }
          >
            <Pane>
    
              <div className="sg observe ask">{myConstClass.tab3_msg1}</div>

              <div className="sg gladiator">{myConstClass.tab3_msg2}              </div>

              <div className="sg group gladiator">{myConstClass.tab3_msg3}</div>

              <div className="sg group">{myConstClass.tab3_msg4}  
              </div>

            </Pane>
            <Info>
               "I statements" are powerful, and allow you to stick to your frame without creating
               as much disagreement.
            </Info>   
          </Card>


          <Card
            label = { <span>Conflict<br/> & Trolls</span> }
          >
            <Pane>
              <div id="cbb-1" className="sg group gladiator">{myConstClass.tab4_msg1} 
              </div>
							<div id="cbb-1" className="sg group gladiator">
								{myConstClass.tab4_msg2} 
							</div>
              <div id="cbb-1" className="sg group gladiator">{myConstClass.tab4_msg3}</div>
              <div id="cbb-1" className="sg group gladiator">
                {myConstClass.tab4_msg4} 
              </div>
              <div id="cbb-1" className="sg group gladiator">
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
            id="smg"
            className="image-tab-label"
            title = "Social Media Guide"
            label = { <span>Cognitive Politics Social Media Guide</span> }
          >
            <Pane>
              <div title="Social Media Guide" 
                 className="sg gothere bottom whitetext">
                Explore the <a href="http://cognitivepolitics.org/social-media-guide-progressives">Social Media Guide for Progressives</a>
              </div>
            </Pane>
            <Info>
            </Info>   
          </Card>


          <Card 
            id="rcc"
            className="image-tab-label"
            title="Radical Civility Cycle"
            label = { <span>Radical Civility Cycle</span> }
          >
            <Pane>
              <div className="sg gothere bottom whitetext">
                Join this Radical Civility practice community:<br/><a href="https://www.facebook.com/groups/smartly/">Social Media Approaches for Respect and Tolerance</a>.
              </div>
            </Pane>
            <Info>
            </Info>   
          </Card>


          <Card
            id="cp"
            className="image-tab-label"
            title = "Cognitive Politics Steps"
            label = { <span>Cognitive Politics Social Media Guide</span> }
          >
            <Pane>
              <div title="" className="sg question">
                {myConstClass.tab6_msg1} 
                <info>Going sideways from the main debate is often helpful;
                seek out details. Use Moral Foundation Theory to 
                as a place to find interesting questions about values.</info>
              </div>
              <div title="steelman" className="sg agree">
                {myConstClass.tab6_msg2} 
                <taxonomy>Active Listening: Steelman</taxonomy>
              </div>
              <div title="" className="sg observe">
                {myConstClass.tab6_msg3} 
                <info> It's good to know
                your frame, and know your conclusion, but don't state your
                conclusion: share the observations and values that led you
                to your conclusion, and stop there.</info>
              </div>
              <div title="" className="sg personal">
               {myConstClass.tab6_msg4} 
              </div>
            </Pane>
            <Info>
            </Info>   
          </Card>



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


        </Tabs>
      </div>
    );
  }
 

}
