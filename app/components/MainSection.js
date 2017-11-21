import React, { Component, PropTypes } from 'react';
import style from './MainSection.css';
// I import css in the App that maybe go here instead? !!!

export default class MainSection extends Component {

  static propTypes = {
    todos: PropTypes.object.isRequired, // todos.guides, todos.recentTopics
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  handleClickSee1 = event => {
    console.log(this);
    console.log(event);
    console.log( $( this ).children("h2").text() );
//    $(".see3").css("display", "none");
//    $(".see3x").css("display", "block"); 

    
  };

  componentDidMount() {
    /*window.addEventListener('resize', this.handleResize);
    ReactDOM.findDOMNode(this).addEventListener('.see1', this.handleSee1);
someElement.addEventListener("mouseup", handleMouseUp, 
ReactDOM.findDOMNode(<instance-of-outermost-component>).getElementsByClassName('snap') // Returns the elements*/
    //ReactDOM.findDOMNode(this).getElementsByClassName('see1').addEventListener('onClick', handleClickSee1);

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

  render() {
console.log("Main Section renderi just begun");
    const { todos, actions } = this.props;

    //The todo examples used filters ... that might be worth
    //looking at in future iteration:
    //const filteredTodos = todos.filter(TODO_FILTERS[filter]);
console.log("Main Section render begun");

    let topic = Object.keys(todos.recentTopics[0])[0]; 
console.log("topics loaded");
console.log(topic);
    let recentGuide = todos.guides[topic];
    return (
      <div id="start-guide" className="start">
        <section className={style.main}>
          <div dangerouslySetInnerHTML={{__html: recentGuide}} />
        </section>
      </div>
    );
  }
}
