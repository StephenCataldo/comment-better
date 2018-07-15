/** The navbar for the bullhorn **/

// @ToDo: probably switch the menu design from original nav-list
// to something more like the cbbModal uses, 
// and componentDidMount, and everything like .see3, all build a better
// API
  


import React, { PropTypes, Component } from 'react';
import style from './Header.css';
  // @ToDo: restyle. Lots of old style to be cut out of those files
  // which were built to other design and specs

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
/* This is basically a cut and paste. @ToDo */
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
      <nav>
        <ul className="tabs__labels nav-list">
          {this.props.children.map(labels.bind(this))}
        </ul>
      </nav>
    );
    /* non-meddled version:
    return (
      <ul className="tabs__labels">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
    */


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




export default class BullhornModal extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    todos: PropTypes.object.isRequired, // Object, object, array???
  };


  /* @ToDo: the .see3 and similar classes set at the host source
   * are not coming through! */
  componentDidMount() {
    $(".see3").css("display", "none");
    //$(".see3x").css("display", "block");

    // Temporary crap-import of existing jQuery code already written
    $(".see1").on( "click", function() {
      $(".see3").css("display", "none");
      $(".see3x").css("display", "block");
      $(this).get(0).scrollIntoView();
      $(this).find("div.see3:last").get(0).scrollIntoView();
      //$(this).scrollTop(0);
      $( this ).children(".see3x").css("display", "none");
      $( this ).children("h2").css("display", "block");
      $( this ).find("div.see3").css("display", "block");
    });
    $(".see1XX").bind( "click", function() {
      console.log( $( this ).children("see3").html );
      $( this ).children("see3").dialog();
      // modal = set to true?
    });


  }


  /*
  handleSave = (text) => {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  };
  */

  render() {

    const { todos } = this.props;
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




    /** @ToDo The source materials are produced as html. This is not safe,
     * and should be *redesigned* in some standard way, then downloaded
     * as data rather than html. All source libraries will need to follow
     * that not-yet-existant API **/

    /** @ToDo: style.main was what?   id="start-guide" className="start" **/
    return (
      <Tabs selected={0}  id="start-guide" className="start">
        {guides.map(guide => (
          <Pane label={guide.topic} className={style.main}>
            <div dangerouslySetInnerHTML={{__html: guide.panel}} />
          </Pane>
        ))}
      </Tabs>
    );


  }


}
