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
    return (
      <div className="tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }
});
// end Tabs



/** class TopicCard imitates the Card from CBB **/
class TopicCard extends React.Component {
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
    const topics = todos.recentTopics.slice(0, 4).map(
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

    return (
      <Tabs selected={0}>
        <TopicCard
          label = "TopicA"
        > 
          Something plain here.
          <div>Somethigns goes here
          </div>
        </TopicCard>
      </Tabs>
    );


  }

}
