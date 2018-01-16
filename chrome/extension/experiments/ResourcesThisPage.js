/** This is a container, or rather needs to be. If it loads data when
 * it renders, and changes the component state, it will render again,
 * and loop. This is modeled on an example that doesn't load data,
 * and so the components can update the store more logically.
 *
 * Note that I find it helpful to think of this script as normal javascipt.
 * The popup is written all in React. The script here is reading a website
 * I didn't write and making a few replacements: that's a job for jQuery.
 * Also, it needs access to the same store that the popup script uses.
 **/

/* template copied from TodoItem.js */
// !!!! Should this be React? I think go back to jQuery style for a little while
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Creates a connected component.
//  mapStateToProps and mapDispatchToProps ... returns a function.
//  It returns a class that extends the component: it doesn't inherit,
//  it's a new component that uses what you pass, not extend it.
//  It does render your input component.
//  IT NEEDS ACCESS TO THE STORE, read from props..
//  this.store = props.store || context.store;
//    ( context is like a global variable for a subtree of components)
//
/* I think this goes, when not doing things by hand
import { Provider } from 'react-redux'
import { createStore } from 'redux'
*/
import classnames from 'classnames';
import jQuery from "./maybe_bad/jquery";
window.$ = window.jQuery = jQuery;
//import * as GuideActions from '../../app/actions/guides';
import * as TodoActions from '../../app/actions/todos';
import { Config } from '../../CONFIG/config.js';
// for now, use jQuery for the replacements... I think that might make sense, this really jQuery for the inject:     const reactStringReplace = require('react-string-replace');
import style from './ResourcesThisPage.css';
/* not it */
$('.highlight').css({
  'background': 'yellow',
  'border': '1px solid blue'
  });


// returns the webPage to the store
function loadSMG (topic, url, actions) {
  let source = Config.sourcePreURL + url + '#guide'; 
  console.log("begun to loadSMG");
   $.get(source+'',function( data, status ) {

    var sG = $('#queryResultContainerr').html($("body", data));


    // This next crap code deals whether to return the whole webpage
    // or what is contained inside < id="start-guide" >
// if it doesn't find, is that null or -1  and need  ~   ???
/*
* console.log("it finds it");
console.log(stdGuide);
console.log(stdGuide.length);
*/
    //insecure: $( "#innerGuide" ).append('<link rel="stylesheet" href="http://cognitivepolitics.org/hkpgsm/examples/examples-pop2.css" type="text/css" />');
    //insecure: $( "#innerGuide" ).append('<script src="http://cognitivepolitics.org/hkpgsm/examples/pop.js"></script>');
    //what was this for: $( "#innerGuide" ).append( stdGuide );  

/* this works the basics */
    let stdGuide = $.parseHTML(data);  //<----try with $.parseHTML().
    var $hold = $("<div/>");
    let findThis = ".field-name-body";
    let stdGuide_q = $($.parseHTML(data)).find("#start-guide");
    if (stdGuide_q.length) {
      findThis = "#start-guide";
    }
    $(stdGuide).find(findThis).each(function(){
    //$(stdGuide).each(function(){
        $hold.append($(this).html());
    });

    //console.log("Save the webpage for ...");
    let guide = {topic: topic, webPage: $hold.html()};

    actions.addGuide(guide);

  })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("error loading  " + textStatus + '--  ' + errorThrown);
        console.log("incoming Text " + jqXHR.responseText);
    })

    .done(function(data) {
      console.log( "finished loading guide" );
    })
    .always(function(data) {
      console.log( "ALWASY for loading guide" );
    });

}   // function loadSMG



/** jQuery note:
 * jQuery modifies the DOM, while React creates a virtual DOM of its own.
 * jQuery should be used only in this module, and only to read the current
 * page which React won't do anything with, while React creates the new
 * guide-page -- only. 
 * 
 * The only confusing bit of this is highlighting text in the read-page.
 * I guess that is jQuery's job, and just don't have React ever render
 * the read-page (the news or social media page the user is reading.)
 *
 * If experts feel this is a misunderstanding, please put in issue queu!
 *
 * Also, this looks like a fancier way to do this: https://reactjs.org/docs/integrating-with-other-libraries.html and do these things within
 * componentDidMount, componentWillUnmount, componentDidUpdate.
 *
 * Or not do it, this way (looks great): https://gomakethings.com/ditching-jquery#working-with-ajax-and-apis
 **/ 


/***
 * Read the web page you are on.
 * Figure out the keywords from the sourceHost or stored data
 * Load the Guide for any topics found, or stored data
 * Prepare the topic and guide array so they can be used.
 ***/

/** @connect() returns a function that sucks in the function that follows
 * it: it connects the state & dispatch to ResourcesThisPage.
 * what connect() does — it passes state (via props) into our Presentational Component and actually returns a React component that wraps the Presentational one
 *
 * Normally, I think, you would only connect once. For Google Chrome,
 * both inject and popup live sufficiently different lives that they
 * each connect. (??) 
 ** This is giving me errors. Going to hold off on store for now. */
//console.log("about to try to connect.");

@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class ResourcesThisPage extends Component {

  static propTypes = {
    //addTopic: PropTypes.func.isRequired
    // these are required for the connect to work. 
    todos: PropTypes.object.isRequired, // was array, not object, for todos
                                        // example
    actions: PropTypes.object.isRequired
  };


  // not used (yet), I think this just obfuscates
  handleSaveX = (text) => {
    if (text.length !== 0) {
      this.props.addTopic(text);
    }
  };

  // shouldComponentUpdate    we may need to re-render when
  // additional tweets or facebook messages are added to a page,
  // for now just update on new URLs.

  constructor(props) {
    super(props); 
    this.state = { topicX: "" };
    //this.readCurrentPage = this.readCurrentPage.bind(this);
    this.readCurrentPage();
      // the store is passed with props. To the constructor
      // as well as render?

  }


    // Quit if looking at the host of the guide, to prevent loops and insanity
  /*
  }
  //componentDidUpdate ?
  componentDidMount() {
  */ 
  
  highlightOnClick = () => {
    console.log("COngratuLations youClikcked thbuttons");
  }

  //_readCurrentPage() {   // arrow method binds to class
  readCurrentPage = () => {
    let rtp = this;
    const { todos, actions } = this.props;

    if (window.location.host !== Config.sourceHost) {

      /** Replace jQuery one day 
      fetch('https://cognitivepolitics.com/hkpgsm/keywords.json').then(function(data) { 
        return data.json();
      **/

      /** preflight check not needed
       * Do we really need to do a check before just grabbing this data?
       * This error: No 'Access-Control-Allow-Origin' header is present
       * brought me here: https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
       * and in the final version, make sure extra calls aren't being made
       * for no reason. Put aside for now. @ToDoLater @ToDoLater
       **/

      $.getJSON( 
          'https://cognitivepolitics.com/hkpgsm/keywords.json', 
          function( data ) {
        //format: "json"
        //
        $.each( data.keytopics, function( i, l ){
          var item = l;
          $.each(item.keys, function(i,pattern) {
            // note: replace function might get used soon.
            // document.body.innerHTML.replace(/hello/g, 'hi');
            // node.textContent.  might be a thing.
            // Which of these is better to use?
            //console.log(document.body.innerHTML);
            //console.log(document.body.textContent);
            //if(~document.body.innerHTML.indexOf(pattern)) {
            let referrer = document.body.innerHTML;
            if (~document.body.innerHTML.search(new RegExp(pattern, "i"))) {
            
 
              // Replace the text in the page being read with links:
              //
              // https://stackoverflow.com/questions/5797661/replace-text-in-website-with-chrome-content-script-extension    Replace Text in Node is better than what I did here.   Or maybe https://stackoverflow.com/questions/34747063/replace-text-but-keep-links-in-google-chrome-extension-content-scripts
              //
              let rep = "/(" + pattern + ")/g";
              let re = new RegExp(pattern,"gi");
/*
              var content = $("body").html().replace(
                re,
                '<a href="" class="highlight" onClick="{this.buttonOnClick}">' + pattern + "</a>");
*/


/* This breaks things like links that use the keyword. Move it only to text? 
            
              var content = $("body").html().replace(
                re,
                //'<span class="highlight" onClick={() => {this.handThisPage.leClick(el)}}    onClickX="{this.highlightOnClick}">' + pattern + "</span>");
                '<span class="highlight" data="' + pattern + '" onclick="highlightOnClick-NOT_SURE_YET">' + pattern + "</span>");
*/

/*
// Found this solution on the web. Let's try.
// I think the answer here might be the better direction eventually:
// http://blog.alexanderdickson.com/javascript-replacing-text
console.log("new method");
// and then it dies; jquery.js?ea23:2 Uncaught DOMException
 $('body :not(script)').contents().filter(function() {
    return this.nodeType === 3;
    console.log("it is text...");
  }).replaceWith(function() {
      console.log(" ... replace with ....");
      return this.nodeValue.replace(pattern,'<span class="highlight" data="' + pattern + '" onclick="highlightOnClick-NOT_SURE_YET">' + pattern + '</span>');
  });
*/


let replace = '<span class="highlight" data="' + pattern + '" title="Click on bullhorn image near the menu bar" onclick="highlightOnClick-NOT_SURE_YET">' + pattern + '</span>';

/*
// This is close: it replaces the text without screwing up html, except
// I want to insert html, and I'm inserting into text.
$("*").each(function () { 
   if ($(this).children().length == 0) { 
      console.log("...");
      $(this).text($(this).text().replace(re,replace)); 
   } 
});
*/
/* Let's go lightweight and miss most in order to not break things? 
$("p").html($(this).html().replace(re,replace));
$("h1").html($(this).html().replace(re,replace));
$("h2").html($(this).html().replace(re,replace));
$("h3").html($(this).html().replace(re,replace));
*/

// We ultimately want to read the .text values, and then insert html into 
// them, but not alter the html! Subsitute the text keyword with html here:
// <a href="___keyword___">blah keyword blah</a>
// For now, just changing the html of p and h1, h2, h3. Imperfect.
// THIS WORKED BUT BADLY
/*
$("p").each(function () { 
    $(this).html($(this).html().replace(re,replace)); 
});
$( ":header" ).each(function () {
    $(this).html($(this).html().replace(re,replace));
});
*/
// Shit. The above, <p><a href=__keyword>...  matches badly.
// Also, I think facebook doesn't put text in conveninent <p>'s,
// and it's a main use case

// Try again.

/*** Replace keywords with highlight spans.
 * This isn't as easy as replacing all the keywords, since some are in links
 * and other places where a span will break things. And not as easy as
 * replacing them in the text, since that can't have <span> tags. Approach:
 * find them in the text (not html tags) and then splitText() 
 * See: http://blog.alexanderdickson.com/javascript-replacing-text
 *  (I think I might not have to change much to that script.)
 * Not jquery! Great to start removing that...
 *
 * This sometimes returns a node, but that functionality isn't used.
 *
 * Something like this in jQuery might work:
 * $( ".container" )
  .contents()
    .filter(function() {
      return this.nodeType === 3;
    })
      .replace(x,y)   
 *
 * Or skim github, or rewrite the not-so-great code I copied in here from
 * scratch and cleaner.
 *
 *
 *
 ***/ 
var matchText = function(node, regex, callback, excludeElements) { 

    excludeElements || (excludeElements = ['script', 'style', 'iframe', 'canvas']);  // reconsider iframe and canvas? Consider excluding nav elements, footers?
    // this should be document.body.firstChild. It might be <div></div>
    // It could also be space.
    //console.log(node);
    var child = node.firstChild;

    // cataldo: 
    // This could be <div id="doc-info"></div> 
    //   which has no firstChild and makes things bad.
    //   jquery variant: https://stackoverflow.com/questions/2349446/jquery-find-and-replace-text-after-body-was-loaded
    //   @ToDo: I don't understand how the code didn't encounter
    //   this problem on some sites.
    //   @ToDo: this is a doozey of a piece of code running on every page.
    //   How fast is it? What does it interfere with?
    if (child == null) {   // includes undefined
      //console.log("no child for this one.");
      return node;
    }

    do {
        switch (child.nodeType) {
        // 1 = element, which probably contains text
        // 3 = text
        // ignore attributes, comments
        case 1:    
            if ((excludeElements.indexOf(child.tagName.toLowerCase()) > -1) ||
                (child.className === 'inject-react-guide')  ) {
                continue;
            }
            // Some websites have elements that don't contain children.
            matchText(child, regex, callback, excludeElements);
            break;

        case 3:    // text  nodeType
           // child.data is the string, we want to replace
           // wtf is all ?
           //
/* Stephen: hating javascripts tangle. Trying to trace the regex
 * so I can find the actual match and not merely the case-insensitive pattern.
 * Wasting too much time.
 **/ 
           //
           //
          child.data.replace(regex, function(all, p1) {
//console.log(arguments);
                var args = [].slice.call(arguments),
                    offset = args[args.length - 2],
                    newTextNode = child.splitText(offset);
/*
console.log(args); // the phrase broken/sliced up
console.log(all); // matching text is the pattern, not the match :-(
//console.log($&); // [text, "Kaepernick", 0, "Kaepernick"]
console.log([child].concat(args)); // an array of this el as it will be?
console.log(newTextNode); // = pattern
console.log(regex.source);// = pattern
*/
                // before the match, right?
                newTextNode.data = newTextNode.data.substr(all.length);
// we really want to send the match, not the pattern
//
                callback.apply(window, [child].concat(args));
                child = newTextNode;
            });
            break;
        }
    } while (child = child.nextSibling);
    return node;
}

// warning: original included offset here. I don't see why. Did I break 
// something? (remove warning if code works well)
//               let rep = "/(" + pattern + ")/g";
              //let re = new RegExp(pattern,"gi");
// \b matches word boundaries. 
// (whatEver) aims to matches case-sensitive pattern but not working yet
//
// @ToDo: pattern could be word beginning or hashtag, what else?
// @ToDo: I'd like this to search global "ig" but it fails
re = new RegExp("\\b(" + pattern + ")\\b", "i");
    // @ToDo, original version has a g for global, which I want. But
    // it seems to generate an error, at least after my other changes.
matchText(document.body, re, function(node, pattern) {
    var span = document.createElement("span");
    span.className = "highlight";
    span.data = item.topic;
    span.title = item.topic + ': Click on bullhorn image near the menu bar';
    span.textContent = pattern; // this sets to capitalization of search 
        // instead of match
    node.parentNode.insertBefore(span, node.nextSibling); 
});







              //Synchronous XMLHttpRequest on the main thread is deprecated
              // Is that from these line?

              $(".highlight").css('background', 'pink');



              loadSMG(item.topic, item.url,actions);
              /* this.handleSave;  /* egads. So unclear. Back tf up */
              // Save a Topic to the store
              let Topic = {
                [item.topic]: item.url,
              };
              actions.addTopic(Topic);
              //return item.topic;
            }
          });
        });

      })
      .done(function(data) {
        console.log( "finished loading keywords" );
      })
      .always(function(data) {
        console.log( "ALWASY for loading keywords" );
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
          console.log("error loading keywords " + textStatus + '--  ' + errorThrown);
          console.log("incoming Text " + jqXHR.responseText);
      })
    } else {
      console.log("We seem to be at the source of the guide, " + 
        Config.sourceHost );
      return;
    }
    console.log("Done readCurrentPage - Added a topic");
  }   // end readCurrentPage

  handleClick(number) {
    if(!$('.action').length){
      const updatedList = this.state.val1.slice(); // clone the array, and add the new number
      updatedList.push(number);
      console.log(updatedList.join(" "));
      this.setState({val1: updatedList});      
    }
  }
 render() {
    const { todos, actions } = this.props;

    // I think it renders often, so reading it here gets reloaded over and
    // over. Put this perhaps in the constructor? Or call it separately?

    // Read from store. For efficiency, things read only here should go
    // back to props.AAA
  //let str = JSON.stringify(store.getState, null, 4);
    console.log("************ Render ResourcesThisPage ***************");

  //console.log(store.getState())

    //!!! This is not very React yet. It was converted from jQuery, fast,
    //    and needs a rewrite. jQuery may be a better tool for the inject.

    return (<div/>); // if we don't render anything, does that prevent reloads?
    return (
      <div id="RTP">RTP: this.props.topic} this.props.guide}</div>
    );
  }


}


//window.highlightOnClickX=function() {
//ReactDOM.highlightOnClickX=function() {
const highlightOnClickX = function() {
  console.log("can I just write crap javascript");
}
