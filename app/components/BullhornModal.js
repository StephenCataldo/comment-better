/** The navbar for the bullhorn **/

import React, { PropTypes, Component } from 'react';
import style from './Header.css';

/**
 *  render sends the todos.recentTopics to function TopicMenu(props) 
 *  which creates a listItems of links encapsulated in empty <a> anchors.
 *  The todos.recentTopics might be repetive.
 *
 *  Currently, clicks don't seem to be handled? <a>nothing</a>?
 *
 */  

const AllTabs = ({guides}) => (
  <div>
    {guides.map(guide => (
      <Pane label={guide.topic}>
        {guide.guide}       
      </Pane>
    ))}
  </div>
); 


/** Tabs I'm copying from CbbModal... if no changes, then refactor DRY **/
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
    console.log("Label clicked in React:BullhornModal:Tabs, index: " + index);
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
    return (
      <div className="tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }
});
// end Tabs

const Pane = React.createClass({
  displayName: 'Card',
  render() {
    return (
      <div className={this.props.id}>
        {this.props.children}
      </div>
    );
  }
});


/** class TopicCard imitates the Card from CBB **/
class TopicCardX extends React.Component {
  render() {
    const topic = this.props.topic;
    const content = this.props.content;
    return (
      <Card label = { topic } >
        <div className="Pane">
          {content}
        </div>
      </Card>
    );
  }
}




/*


  function TopicMenu(props) {
    const topicActive = Object.keys(props.topics[0]);
    // Major problems here: sometimes bad keys seem to sneak into the
    // store, usually at higher-numbered parts of the array.
    const topicsInactive = props.topics.slice(1,5); // ignore old???

    const activeItem = 
      <li className="active" style={{color: 'red'}}>
        <a>{topicActive}</a>
      </li>;

    //Don't use map, because want only unique topics?
    const listItems = [];
//                  =
//     topicsInactive.map((t) =>
//      <li>
//        {Object.keys(t)}
//      </li>
//    );
//
    let alreadyT = { [topicActive]: true};
    for(var i = 0; listItems.length < 5 && i < topicsInactive.length; i++) {
      let key = Object.keys(topicsInactive[i])[0];
      if ( !alreadyT[key] ) {
        alreadyT[key] = true;
        listItems.push(
          <li><a>{key}</a></li>
        );
      }
    }


    return (
      <nav>
        <div className="home"><a href="http://cognitivepolitics.org/social-media-guide-progressives/">Home</a></div>
        <ul className="nav-list">{activeItem}{listItems}</ul>
      </nav>  
    );
  }
*/


export default class BullhornModal extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    todos: PropTypes.object.isRequired, // Object, object, array???
  };

  /*
  handleSave = (text) => {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  };
  */

  render() {

    /* note: pulling same values from store as MainSection */
    const { todos } = this.props;
    //let topic = Object.keys(todos.recentTopics[0])[0];
    //let topicGuide = todos.guides[topic];
    var topics = todos.recentTopics.slice(0, 4).map(
      (t) =>
      t.keys
    );

    


    //topics[0] = Object.keys(todos.recentTopics[0])[0]; 

    /** Generate the html here. 
     *  Loosely, foreach topic
     *  <Card label = topic>
     *  <Pane>topicGuide</Pane>
     *  (Using same terms as the CBB modal)
     */ 

    // Try this example of iterating over array:
    // https://thinkster.io/tutorials/iterating-and-rendering-loops-in-react
/*
    return (
      <header>
        {this.props.todos.map((topic, i) => {
          console.log("Render this topic: " + topic);
          return (<Answer key={i} answer={answer} />)
        })}
    ) 
        <TopicMenu topics={todos.recentTopics} />
      </header>
    );
    */

    /* PLAN
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

So, map the keys to returning a Pane including it's label
*/


    //let topic = topics[0];
    //let topicGuide = todos.guides['DACA']; // prints the html when I do this.
    //topics[0] = Object.keys(todos.recentTopics[0])[0];
    /*
    topics = todos.recentTopics[0].keys; // should be one key in an array
    var guides = [
      {topic: 'DACA',panel:'Say something about DACA'},
      {topic: 'Kneed',panel:'Say something about Knee'}
    ]
    */
    // recentTopics is an array of {key:url} from which we want the key only
    /*** This works if we don't have duplicates!!! 
    guides = todos.recentTopics.map(function(element) {
      let topic = Object.keys(element)[0];
      return {topic: topic,panel: todos.guides[topic] }
    });
    /***/
    var duplicate = {};
    var guides = [];
    for (let k in todos.recentTopics) {
      let element = todos.recentTopics[k];
      let topic = Object.keys(element)[0];

      if (duplicate[topic] === true) {
      } else {
        duplicate[topic] = true;
        guides.push( {topic: topic,panel: todos.guides[topic] } );
      }
    }

    return (
      <Tabs selected={0}>
        {guides.map(guide => (
          <Pane label={guide.topic}>
            {guide.panel}
          </Pane>
        ))}
      </Tabs>
    );


  }


}
