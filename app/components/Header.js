/** The navbar for the bullhorn **/

import React, { PropTypes, Component } from 'react';
//import style from './Header.css';

/**
 *  render sends the todos.recentTopics to function TopicMenu(props) 
 *  which creates a listItems of links encapsulated in empty <a> anchors.
 *  The todos.recentTopics might be repetive.
 *
 *  Currently, clicks don't seem to be handled? <a>nothing</a>?
 *
 */  



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
/*                  =
     topicsInactive.map((t) =>
      <li>
        {Object.keys(t)}
      </li>
    );
*/
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




export default class Header extends Component {

  static propTypes = {
    todos: PropTypes.object.isRequired, // Object, object, array???
    addTodo: PropTypes.func.isRequired
  };

  render() {

    /* note: pulling same values from store as MainSection */
    const { todos, actions } = this.props;
    //let topic = Object.keys(todos.recentTopics[0])[0];
        // !!! we're getting the keys to an array, dude.
    //let recentGuide = todos.guides[topic];
    //let topics = Object.keys(todos.recentTopics.each);
//    const doubled = numbers.map((number) => number * 2);
    const topics = todos.recentTopics.slice(0, 4).map(
      (t) =>
      t.keys
    );
    //topics[0] = Object.keys(todos.recentTopics[0])[0]; 

    return (
      <header>
        <TopicMenu topics={todos.recentTopics} />
      </header>
    );
  }
}
