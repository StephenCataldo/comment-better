import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BullhornModal from  '../components/BullhornModal';
import Header from '../components/Header';
import MainSection from '../components/MainSection';

import * as TodoActions from '../actions/todos';
import style from './App.css';
// npm install jquery bootstrap --save
import jQuery from "../../chrome/extension/library/jquery";
window.$ = window.jQuery = jQuery;


console.log("---Open App.js ---"); // not seen

@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    todos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { todos, actions } = this.props;
    console.log("--- App.js ---");
    console.log(this.props);
    // @Hack: css included in hacky way. Intending to rewrite all the styles
    // to use React anyway.
    //
    //!!! why am I passing things from the store as propos, AND
    // using Provider too?
    //
    // Using pop.js here is a pretty terrible way to do this, long run...
    // it's the original jquery approach shoved into React, to get the MVP
    // into early users hands and show what could be done. Eventually
    // plan to settle on a structure, and have the web resources be provided
    // with more consistent structure, so that react can absorb them as data
    // instead of as html, and produce React style output.
    console.log(todos);
    console.log(actions.addTodo);

    /** Header is the Tabs, MainSection seems to have all the MainSections.
     * Tabbing doesn't actually work ... not sure if it did before other
     * work was done on code? */

    return (
      <div className={style.normal}>
        <script type="text/javascript" src="../hkpgsm/pop.js" ></script>
        <link rel="stylesheet" type="text/css" href="http://cognitivepolitics.org/hkpgsm/examples/examples-pop2.css"/>
        <BullhornModal todos={todos}/>

        <Header todos={todos} addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    );
  }
}
