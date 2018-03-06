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
// end Tabs

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
              <div id="cbb-yesAnd" title="Yes. And..." className="sg agree"><clip>Yes. And...</clip>
              </div>
              <div id="cbb-yesAnd" title="Yes. And..." className="sg agree">
                <clip>I think I see where you're coming from.</clip>
              </div>
              <div className="sg agree">`
                <clip>I hear what you’re saying. I agree about... I also see...</clip>
              </div>
              <div className="sg agree">`
                <clip>Tell me more about ... </clip>
              </div>

              <div id="cbb-3" className="sg question"><clip>What made you aware of </clip> this problem?</div>
              <div className="sg personal">Getting permission helps people relax and connect: <clip>Do you want to talk about this?</clip>
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
    
              <div className="sg observe"><clip>My experience was ..."</clip></div>

              <div className="sg group"><clip>I agree with you about ... and 
              about ... and about .... What do you think of ...</clip> 
              <br/>(taxonomy/value: tit-for-tat listening/fairness)
              </div>

              <div id="cbb-yesAnd" title="Yes. And..." className="sg agree">Say what is important
                to you, your values, your heart.
        For example: <clip>I want to live in a world where </clip> people who
      work a full time job can raise a family. Agreeing on a policy like
      minimum wage comes much, much later.
              </div>
              <div className="sg personal"><clip>What do you think of this?</clip>
              invites someone to converse, rather than feel like they are
              attacking you if they see something else.</div>


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
    
              <div className="sg observe ask"><clip>My experience was ... What was yours?"</clip></div>

              <div className="sg gladiator"><clip>I don't see this as left vs.
          right,
          but as ordinary people vs. those who'd take our democracy away.</clip>              </div>

              <div className="sg group gladiator"><clip>Yes, I see parts of 
              this issue differently, but would be happy to work with you
              and focus on corruption — which I think is widespread in DC 
              across left and right, and not widespread among ordinary liberals
              or conservatives</clip></div>

              <div className="sg group"><clip>I agree with you about ... and 
              about ... and about .... What do you think of ...</clip> 
              <br/>(taxonomy/value: tit-for-tat listening/fairness)
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
              <div id="cbb-1" className="sg group gladiator"><clip>I feel like we here
                are gladiators,
                decent people fighting while the emperor laughs in the stands.</clip>
              </div>
              <div id="cbb-1" className="sg group gladiator"><clip>I doubt this
          view represents most ...</clip></div>
              <div id="cbb-1" className="sg group gladiator">
                Echo messengers: find people your audience will respect who
                are saying the right thing, and share their voice.
                Nothing to cut and paste here: just share, 
                the less you say the better.
              </div>
              <div id="cbb-1" className="sg group gladiator">
                Keep it personal: Avoid saying <noclip>All you <em>Group X</em> are rude.</noclip> 
                If someone is rude to you, set your boundaries one-to-one:
      <clip>I'm trying to listen to what you have
                to say, and I don't see you returning the favor. I'm hoping to connect with you,
                even if our politics are different, but this feels disrespectfulto me. What are you hoping to get out of this conversation?</clip>
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
              <div title="" className="sg agree">
                Conversations have metaphors. Do you fire facts like
                artillery forcing the defender to hide in trenches?
                Is this a competive sport, a chance to connect, a mutual
                journey, a session of story-telling and listening?
              </div>
              <div title="steelman" className="sg">
                Describe the other side's points more clearly than they
                do. If false accusations are being made by your side, be the
                one who steps in. Be seen as reasonable and willing to
                compromise, leaving the other side feeling heard, and people
                will engage with you differently.
                <taxonomy>Active Listening: Steelman</taxonomy>
              </div>
              <div title="Big tent tension" className="sg">
                Electoral majorities require a big tent approach. This
                doesn't mean pathetically compromising until you stand for
                nothing. It means expressing your heart fully ("I statements")
                and passionately, but also making sure that
                people can be on your side if they agree with you even 
                a little. 
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
              <div title="" className="sg agree">
                1. Find a way to get people talking so they feel heard.
                Ask them questions that are curious rather than loaded.
                Going sideways from the main debate is often helpful;
                seek out details. Use Moral Foundation Theory to 
                as a place to find interesting questions about values.
              </div>
              <div title="steelman" className="sg">
                2. Active listening, merged with agreeing on everything
                you can, and steelman their point of view.
                <taxonomy>Active Listening: Steelman</taxonomy>
              </div>
              <div title="" className="sg">
                3. Share your observations or values. "I statements" are great,
                and make it easier for people to listen. It's good to know
                your frame, and know your conclusion, but don't state your
                conclusion: share the observations and values that led you
                to your conclusion, and stop there.
              </div>
              <div title="" className="sg">
                4. End with a request. Even if it isn't met, it's a good way
                to wrap up the conversation:
              </div>
              <div title="" className="sgsm">
                I hope we can keep talking.
              </div>
              <div title="" className="sgsm">
                If I bought you a copy of (book, video), would you be interested
                to (read, watch) it?
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
