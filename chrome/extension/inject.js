import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
//import { loadResourcesThisPage } from './LoadResourcesThisPage';
import ResourcesThisPage from './ResourcesThisPage';

console.log("Hello Activists");


/** 1. Initiate the process, firing injectActions function, which inject InjectApp
 *  document.readyState can be odd for chrome extensions,
 *  sometimes being done before the addEventListener fires.
 *  Reread: https://stackoverflow.com/questions/588040/window-onload-vs-document-onload.
 *  @ToDo: Refactor, I think this sometimes runs twice, nbd.
 *  @ToDo: this won't work well on Facebook, where the document loads, and then javascript
 *  loads more text!
 */



console.log(window.window_name);
var windw = window.window_name;
if ( document.readyState == "complete" ||
      document.readyState == "interactive" ) {
  console.log("document ready already ***");
  injectActions();
} else {
  console.log("window addEventListener for load ***");
  window.addEventListener('load', injectActions());
}




function injectActions() {
  /** When window loads, search it for keyterms, then turn them into
   *  links class="keyterm" and set up the data store
   *  document readyState is complete
   *  window readyState is undefined
   **/
  // Don't Inject the extension's own popup
  if ( document.baseURI == "chrome-extension://jgokkghkbpkjknmigodgbiefmnkbplil/popup.html" ) { return; }

  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-guide';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  /** when is todoapp.js included, which brings the store? 
   *  Why two of these render statements into the DOM
   *  Ok, imitate todoapp store code.
   *  todoapp points at Root. Will that load the whole regular
   *  app? Is the point of todoapp.js to load the app when the button is
   *  clicked ... and I want to imitate that, without including the ToDo App?.
   /***/ 
  chrome.storage.local.get('state', (obj) => {
    const { state } = obj;
    const initialState = JSON.parse(state || '{}');

    const createStore = require('../../app/store/configureStore');
     /***/
    render(<InjectApp store={createStore(initialState)} />, injectDOM);
  });
}

/** InjectApp is a React component, which brings along the data store
 * that connects the inject script to our app
 * runs ResourcesThisPage.
 */
class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  /*
  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
    console.log("toggling the window"); // have not seen this
  };
  */

// Seems like store = createStore is missing. Here also Root and App which work.
// Note: http://www.thegreatcodeadventure.com/react-redux-tutorial-part-iii-async-redux/
//  encourages creating the store here... it seems to be just props here, or has
//  createStore been called ... and then having the store call the functions to load
//  data. store.dispatch(loadCats());


  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;
    return (
      <div>
        <Provider store={store}>
          <ResourcesThisPage/>
        </Provider>
      </div>
    );
  }
}



/*--------- CBB Below Here, whenever possible ----------*/
console.log("Getting to the new stuff");
import CbbModal from './CbbModal';
import jQuery from "./library/jquery";
window.$ = window.jQuery = jQuery;

/* idsComplete attempts to track which observed mutations=changes of the
 * webpage (MutationObserver, watching javascript add facebook nodes)
 * have already been processed.
 */
var idsComplete = [];


// @ToDo: turn this crap into functions.
/*** A. Prep the Modal, which is React ***/
/*** Inject the CBB button three times:
 /*** B1. Run injectCBB() when document loads - or now, if it already has. ***/
/*** B2. Create a MutationObserver. Runs after injectCBB is run onload ***/
/*** B3. Inject button when users click "reply" links. ***/
// Perhaps MutationObserver could observe the comment boxes instead?
//
// Update: the MutationObserver is prevented from chewing on the same
// code over and over by injecting a class.
//
// if($(target).find('.UFICommentAttachmentButtons').hasClass("mybuttoned")) {
//
/*** C. injectCBB injects a button into the domElement ***/


console.log("CommentBetterButton Initiate!!!");
loadModal(); // A
initialInjectCBBs(); // B1
ObserverNewCommentBoxes(); // B2
// function injectCBB(domElement) { // C, called by the B's,
// inserts the little orange CB-button

/*** A. Prep the Modal, which is React ***/
function loadModal() {
  window.addEventListener('load', () => {
    console.log("*****************************************************");
    console.log("A. window.addEventListener injected by extension/background/inject.js");
    const injectDOM = document.createElement('div');
    injectDOM.className = 'inject-react-example';
    $('body').prepend(injectDOM);
    render(<CbbModal />, injectDOM);
    console.log("Rendered the modal");
    // If problem: does the window ever load before we run this?
  });
}



/** initialInjectCBBs buttons into comment boxes
 */
function initialInjectCBBs() {
  //  @ToDo: there is a better way to do this
  //  NOTICE: 20180219, this doesn't work in the function,
  //  and I'm going to trust MutationObserver rather than use sleep.
  //  If it works smoothly, erase the whole hackathon rush-job that used
  //  sleep. If problems, code left to help back up to what worked...

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /*** B1. Run injectCBB() when document loads - or now, if it already has. ***/
  // Reread: https://stackoverflow.com/questions/588040/window-onload-vs-document-onload. Below is a hack, sometimes document, sometimes window, expected to
  // sometimes run twice (not a disaster). Document loaded should be sufficient
  // for the text-oriented, DOM-oriented injectActions.
  console.log("B1. run injectCBB on the whole document, injecting the button on every comment box that has already loaded");

  if ( document.readyState == "complete" ||
    document.readyState == "interactive" ) {
    console.log("B. Document was ready already.");
    // facebook loads after document officially says it 's ready, so slow down.
    // @ToDo = how overdone is this effort - with mutationobserver running,
    // do we need to wait at all?
    (async () => {
      console.log('a');
      //await sleep(1500);
      console.log('b');
      injectCBB();
      console.log('c');
    })()


  } else {
    console.log("window addEventListener for load ***");
    window.addEventListener('load', injectCBB());
  }
}


/***  B2. Create a MutationObserver. Runs after injectCBB is run onload ***/

/* not used?
var config = {};
config.fb_post_search = '._1dwg'; // facebook posts
*/


function ObserverNewCommentBoxes() {
  var observer = new MutationObserver(function(mutations) {
    // For the sake of...observation...let's output the mutation to console to see how this all works
    // Comments open by default: 0:div.UFIList
    // Comments opened by clicking reply: div class="UFICommentContainer"

    /*  console.log('+++++++++++++++'); */
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes &&
        (mutation.addedNodes.length > 0)) {


/** Classes to act on:
 * 20180219 sane documentation effort
 UFIList parent of all of it.
 UFIReplyList = after click reply button.
 UFIRow, UFIAddComment #addComment_xxxxxx
 UFIRow (common class) #addComment_yyyyyy
 UFICommentAttachmentButtons = initial loads.

 First version injects button into all .UFICommentAttachmentButtons
 within each UFIList (the bottom of a post=node.)



 */
//This is the html, a piece of the DOM, that contains what we want.
// Is this a DOM element? Can I run functions off it?
//console.log(mutation.addedNodes[0]);
// They never seem to come more than one at a time, right?
// Only injectCBB for UFIList (and see if that works) and carefully
// avoid injectCBB again every time we injectCBB.
//this works, until we start sending unending #cb-modal and #cbb.
//Which @ToDo should not be IDs, should they?
//injectCBB(mutation.addedNodes[0]);

// alternative, send just the good part:
// mutation.addedNodes[0].querySelectorAll(".UFIList");
// querySelector() returns onematch or null... better?
// if querySelectorAll, watch out for running against empty NodeList ...
// double-warning, that's not an array (use for, not foreach:
// https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/

// @ToDO:
// NodeList [text]
// will give errors

// If we've been here already, run away. I'm seeing 3-5 runs per node.
// @ToDo: figure out why it runs more than once.
// @ToDo: I think this helps, and should stay here, perhaps ... now I see
// 1-3 buttons per node, not up to 5. Could be shifting internet speed though.
/* Valideation efforts all failed to work.
let valid = true;
console.log( mutation.addedNodes[0].querySelector(".UFICommentAttachmentButtons")); // the new class is there
console.log( mutation.addedNodes[0].querySelector(".UFICommentAttachmentButtons").className); // but it's not there. fubar.
try {
  if ( mutation.addedNodes[0].querySelector(".cbbutton") ) {
  // Note: fails if top-level, but those don't match below, so ok,
  // but perhaps inefficient. @ToDo-effiency-review, later
    console.log("WAS HERE ALREADY!!!");
    valid = false;
  } else {
    console.log("WAS NOT HERE YET");
  }
} catch(e) {
  console.log("querySelector didn't work. This happens, not an error, leave.")
  valid = false;
  return;
}

if (!valid) { return; }
****/



        // Test that mutation.addedNodes[0] is a node
        // (dups commented out stuff above)
        var UFIList;
        try {
          UFIList = mutation.addedNodes[0].querySelector(".UFIList");
        } catch(e) {
          // Not the UFIList mutation; expected.
          return;
        }

        if (UFIList) {
          console.log("MutationObserver: Inject a CBB button into a node");
          injectCBB(UFIList);  //
        }

      }

      // Next: if it is a node we've seen, nothing to do.
      // If not seen,
      //   1) do the thing we do.
      //   2) give it an attribute saying we've seen it.

    });
  });



/*** Notes on MutationObserver
 *  It's much cleaner if I can find the parent into which the new
 *  nodes are added ... facebook makes this hard. It's ok to not observe
 *  the initial batch when the page is ready, which seem to have a different
 *  parent. It seems to keep sticking things like u_fetchstream_3_0,
 *  u_fetchstream_4_1, deeper and deeper, each within each other.
 *
 *  A post=node has classes like this: _5jmm _5pat _3lb4 k_t-2r1p193
 *
 *
 **/
  // Notify me of everything!
var observerConfig = {
    //attributes: true,
    childList: true, // it was a mutation to the tree of nodes.
    //characterData: true,
    subtree: true // can't tell, suspect must be true
  };

  // Node, config
  // In this case we'll listen to all changes to body and child nodes
  var targetNode = document.body; // @ToDo: narrow this down? No sidebar.
  //targetNode = document.querySelectorAll('[role=feed]')[0];
  targetNode = document.getElementById("content_container");
  // works with subtree true, not otherwise

  // I've seen this just above the desired nodes (not sure if it is always
  // there at all!)
  // I don't even see this ... every time I look at fb it changes.
  targetNode = document.querySelector('div[role="feed"]');
  // Sometimes this works, but not sure about always or when.
  // not seen work with subtree false
  // And now it doesn't work?
  // This looks closest. It's not always ready. This could be solved
  // by waiting until it is found.
  console.log(targetNode);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  if (targetNode) {
    observer.observe(targetNode, observerConfig);
  } else {
    (async () => {
      console.log('targetNode wait and try again');
      // @ToDo: now this is an error, but rarely seen. What's up?
      await sleep(1700); // 2700 seems to work... 700 when connection good
      console.log('how long did that take');
      targetNode = document.querySelector('div[role="feed"]');
      console.log(targetNode);
      observer.observe(targetNode, observerConfig);
    })();
  }
}

/*** C. injectCBB injects a button into the domElement ***/
/** function injectCBB(domElement)
 * accepts an optional domElement,
 *
 */
function injectCBB(domElement) {


  /*** C. injectCBB injects a button into the domElement ***/
    //domElement is what $(xx).get() would get.
  let color =  "#fcf";
  let target = 'body';
  if (domElement != null) {
    target = domElement;
    color =  "#dff";
    console.log("injectCBB: add buttons to what the MutationObserver found");

  } else {
    console.log("injectCBB: add buttons to initial html");
  }

  /*** B3. Listen for reply buttons being clicked in the facebook nodes ***/
  // Is it possible to add listeners to classes, when the html hasn't
  // been loaded yet? If so, this isn't neccessary
  // Also, does the UI really require this, or this already a CBB nearby?
  // Is there a way to get MutationObserver to note these? We add a class
  // to prevent nodes from being re-searched, which stops us from noticing
  // this.
  // Might be better to undo that?
// !!! @ToDo   hey write this
  $(target).find('.UFIReplyLink').click(function() {
    console.log("Trying to add event handler");
    injectCBB(this);
  });


  /** early effort to use an ID system
   * to prevent MutationObserver from processing
   * the same code over and over. This needs work!)
   */
    // Grab the ID. (adding a class not work!)
    // ex: id="addComment_10214535777885405"
    //
    // This isn't perfect. Ultimately need one button each box for
    // the main comment box, and also replying to threads.
    // Also, after adding this code, for the first time I see
    // "NOW IT HAS THIS CLASS, ABORT" below.
  let id = $(target).find('.UFIAddComment').prop('id');
  console.log("The id of the .UFIAddComment section is:");
  console.log(id);
  if (!id) {
    console.log("++++++++++ UFIAddComment has no id. Was a reply button clicked? The target from which we were seeking the UFIAddComment was:");
    console.log($(target));

  } else if (idsComplete.indexOf(id) > -1) {
    console.log("This post has already been processed, id: " + id);
    return;
  } else {
    idsComplete.push(id);
    console.log("This id was not in idsComplete. So push id to idsComplete, which is now:");
    console.log(idsComplete);
  }
  console.log("New id added to list, so add the button for that id.");


  $(target).find('.UFICommentAttachmentButtons').css({
    'background': color,
  });

  // Figure out if already processed. @ToDo: this doesn't make sense
  // here. Add this class, or figure out an id system, at a higher
  // level and abort earlier.
  if($(target).find('.UFICommentAttachmentButtons').hasClass("has-cbb-button")) {
    console.log("***** This UFICommentAttachmentButtons was already processed  *****");
    return;
  }
  $(target).find('.UFICommentAttachmentButtons').addClass( "has-cbb-button" );

// SHIT. Shut the observer from what we do below.


  // images in chrome extensions are trick, this generates an odd URL for it
  var imgURL = chrome.extension.getURL("img/commentbetter-logo-filled-right.png");
  var imgClipboard = chrome.extension.getURL("img/Clipboard-Icon-20.png");
  imgClipboard = '&nbsp;<img src="' + imgClipboard + '"/>';


  // via facebook cut and paste
  let image = "<img class='cbb-image' src='" + imgURL +"' />";
  $(".clipboard").css("background-image", imgClipboard);
  imgClipboard = ''; // talk to designer!!

  let htmlTemplate = // _r1a _5f0v     might be added back to class
    //'<a onclick="openModal(e)" class="cbbutton"  aria-label="Openings: Comment Better" data-hover="tooltip" data-tooltip-alignh="center" data-tooltip-content="Comment Better" role="button" href="#">' + image + '</a>' + cbModal;
    // Overwrite cleaner, but might go back to above...
    //'<a id="cbb' +  + '" onclick="openModal(e)" class="cbbutton">' + image + '</a>';
    '<a class="cbbutton">' + image + '</a>';



// Note: htmlTemplate might be applied more than once at a time. No id's!


  /** @ToDos, perhaps
   * - This modal could open down if the click is high on the screen.
   * - Keep watching for what is broken by removing overflow: hidden.
   *   But looks fine. If problems, switch to laiding the cbModal into
   *   a parent.
   * - How does the modal close? Is it comfy for most users as is?
   **/



    // We're refinding, @ToDo, efficiency.
    //$(target).find('.UFICommentAttachmentButtons').prepend(htmlTemplate);
    // Future devs: sorry, I don't quite understand why jQuery can't find
    // the just-prepended links and attach events to them, and I'm exploring
    // odd ways to find the links and attach events. Chrome extensions
    // don't let functions run straightforwardly
    // Bet there are better ways to do this. @ToDo-refactor
    // (I don't want to force extra loose permissions).
  let $newBtnSections = $(target).find('.UFICommentAttachmentButtons');
  $newBtnSections.prepend(htmlTemplate);
  /*
  console.log("Attaching onClick function to the new button");
  console.log($newBtnSections);
  console.log($newBtnSections.find('cbbutton')); // length 0   :-(
  */
  // Gives uncaught errors when undefined.
  // @ToDo: Dig to make sure can simply be ignored:
  if ($newBtnSections.length == 0) {
    console.log("newBtnSections was not defined. Appears to happen ... um, at Victory Point cafe, and nowhere else, so far.");
    return;
  }

  console.log($newBtnSections[0].children[0]); // this is the button
  $($newBtnSections[0].children[0]).on("click", function(e) {
    //console.log("+++++++ button was clicked ++++++++++");
    $(this.href).show();
    e.preventDefault();
    e.stopPropagation();
    /* turn back on if button click not working..
    console.log(e);
    console.log(this); // the button! yes!
    */


    /** Position the modal
     * .position() is relative to parent, .offset() to document. 
     **/ 
    let btn = this;
    let modal =  document.getElementById('cbModal');  /* or global var? */
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

    let scrollTop = $(window).scrollTop();

    // Config: the scrollTop + height of modal + gap > btnOffset.top, 
    let btnOffset = $(this).offset();
    let modalHeight = 360, // eyeball for now
        modalGap = 10;   // maybe tighten in final work, 


    // If modal isn't read, gives an error. @ToDo But doesn't seem to 
    //  be creating errors for users (so far as I see), but consider
    //  error handling use cases.
    // Uncaught TypeError: Cannot read property 'style' of null
    console.log("Modal is: ");
    console.log(modal);
    modal.style.height = modalHeight + "px";

    // Position the modal vertically.
    if ( scrollTop + modalHeight + modalGap > btnOffset.top ) {
      // Under 
      let commentHeight = 32;
      $(modal).offset({ top: btnOffset.top+modalGap+commentHeight, left: btnOffset.left-200});
    } else { // modal goes over, the normal expected behavior
      $(modal).offset({ top: btnOffset.top-modalHeight-modalGap, left: btnOffset.left-200}); 
    }


    //  Toggle the modal ( Why not show() ? )
    //  Code review and better documentation needed here. @ToDo
    if (modal && modal.style.display != "block") {
      modal.style.display = "block";
    } else {
      // ToDo: Fix height problem so that modal always appears on
      $(modal).offset({ top: 0, left: 0});
      modal.style.display = "none";
    }
  });

  /** Deal with overflows **/

  // This can probably be removed once we only have cbModal per page
  // use parent:    _3ccb, or _5jmm
  $('.UFICommentAttachmentButtons').parents('._42ef').css("overflow", "visible");
  // This is untested, might possibly work for all we know, in case that above
  // overflow actually matters for something.
  //$('.UFICommentAttachmentButtons').parents('_3ccb').append(cbModal);


  /** Add event handling to the button so it opens the modal **/
  // Review where modal is applied.
  var modal = document.getElementById('cbModal');

  
  // The button that opens the modal  @ToDo/look at: byId?
  var btn = document.getElementById("cbButton");

  // @ToDo ... probably should close if click btn again
  // window is apparently null?
  console.log(window);
  if ( window == null ) { console.log("Hey, why is window null?????? ID: " + id); }
  window.onclick = function(event) {
    // click outside the modal, anywhere anytime, and it's done.
    console.log("event target for click: ");
    console.log(event);
    ///console.log(event.target.parentNode);
    // event.currentTarget
    // @ToDo: if you click on a div within modal, that's not modal

    //modal should be declared within this function so that it is not sometimes null
    var modal = document.getElementById('cbModal');
    var content = document.getElementsByClassName('cbbContent')

    //converts the cbbContent class into an array
    var contentArray = [].slice.call(content)

    //If you click outside of the cbbContent class, it closes the modal
    if ((!contentArray.includes(event.target)) 
         && event.target !== btn ) {
        console.log(event.target)
        //console.log(event.target.parentNode)
        $(modal).offset({ top: 0, left: 0});
        modal.style.display = "none";
    }
  }
} // done injectCBB into document or new mutation











