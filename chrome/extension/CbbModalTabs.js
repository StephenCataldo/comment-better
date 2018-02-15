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
    // The Tabs have Cards, each of which has a Label with child props
    // to be displayed in this menu tab as a list item
    function labels(child, index) {
      let activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={index}>
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
    return (<div/>); // no info yet!
    return (
      <div class="info">
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
            label = { <span>Listen <br/>& Ask</span> }
          >
            <Pane>
              <div id="cbb-yesAnd" title="Yes. And..." className="sg sgsm agree"><clip>Yes. And...</clip>
              </div>
              <div id="cbb-yesAnd" title="Yes. And..." className="sg sgrt agree">
                <clip>I think I see where you're coming from.</clip>
              </div>
              <div className="sg sgrt agree">`
                <clip>I hear what you’re saying. I agree about... I also see...</clip>
              </div>
              <div className="sg sgrt agree">`
                <clip>Tell me more about ... </clip>
              </div>

              <div id="cbb-3" className="sg sgrt question"><clip>What made you aware of </clip> this problem?</div>


            </Pane>
            <Info>
               This is a
               great place to start asking clarifying questions, and eventually add
               "I statements."
            </Info>   
          </Card>

          <Card
            label = { <span>Group & Frame</span> }
          >
            <Pane>
    
              <div className="sg"><clip>My experience was ..."</clip></div>

              <div id="cbb-1" className="sg group gladiator"><clip>I don't see this as left vs.
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


          <Card
            label = { <span>Conflict & Trolls</span> }
          >
            <Pane>
              <div id="cbb-1" className="sg group gladiator"><clip>I feel like we here
                are gladiators,
                decent people fighting while the emperor laughs in the stands.</clip>
              </div>
              <div id="cbb-1" className="sg group gladiator"><clip>I doubt this
          view represents most ...</clip></div>
              <div id="cbb-1" className="sg group gladiator">
                Echo messengers: nothing to cut and paste here, because the less you say the better.
                Find people the audience will respect saying the right thing, and share their voice.
              </div>
              <div id="cbb-1" className="sg group gladiator">
                Keep it personal: Avoid saying <noclip>All <em>group x</em> are rude.</noclip> 
                If someone is rude, keep it about them <clip>I'm trying to listen to what you have
                to say, and I don't see you returning the favor. I'm hoping to connect with you,
                even if our politics are different, but this seems disrespectful. Unless we change how
                we communicate, I'm going to spend my time elsewhere.</clip>  Or be more blunt if the 
                situation doesn't deserve tact — just keep people responsible for their own actions, 
                it's more powerful than trying group responsibility.
              </div>
              <div className="sg personal sgrt">Get permission: <clip>Do you want to talk politics</clip>
              </div>
              <div className="sg personal sgrt"><clip>What do you think of this?</clip>
              invites someone to converse, rather than feel like they are
              attacking you if they see something else.</div>

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
            label = { <span></span> }
          >
            <Pane>
              <div title="Yes. And..." className="sg sgsm agree">
                <clip> 
                </clip> 
              </div>
            </Pane>
            <Info>
            </Info>   
          </Card>


          <Card id="rcc"
            label = { <span>Radical Civility Cycle</span> }
          >
            <Pane>
              <div className="sg personal bottom whitetext">
                <a href="https://www.facebook.com/groups/smartly/">Join a Facebook community that teaches Radical Civility.</a>
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
