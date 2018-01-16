import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import CbbModal from './CbbModal';

//import CommentBetter from './CommentBetter';
import jQuery from "./libary/jquery";
window.$ = window.jQuery = jQuery;
var idsComplete = [];



/** create the modal // TRASH THIS OLD VERSION // **/
// Where should this really go? Should this be background?

  let imgClipboard = ""; 
  //
  let modalTemplate = '<div id="cbModal">' +
	'<div class="sg agree suggestion1">XHow would you define... ?' + imgClipboard + '</div>' +
	'<div class="sg questionssuggestion2">Good point...' + imgClipboard + '</div>' +
	'<div class="sg agree suggestion3">What made you aware of this problem?' + imgClipboard + '</div>' +
	'<div class="sg agreesuggestion4">Want to talk about this in offline?' + imgClipboard + '</div>' +
  '</div>';
  let cbModal =  modalTemplate ;
//  THIS WORKS:  ----->
//$("body").prepend(cbModal); // prepend since facebook keeps rolling?


window.addEventListener('load', () => {

  // cataldo - this is fired by extension/background/inject.js
  console.log("window.addEventListener in inject");
  //return; //nevermind
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  $('body').prepend(injectDOM);
  render(<CbbModal />, injectDOM);
  
});


console.log("CommentBetterButton Initiate!!!");

function cbModal(id) { console.log("open " + id); }

// TEMP!!
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// For simple page: document readyState is complete
// The window tends to take a while to load. I think something done
// faster might be ok?
// Reread: https://stackoverflow.com/questions/588040/window-onload-vs-document-onload. Below is a hack, sometimes document, sometimes window, expected to
// sometimes run twice (not a disaster). Document loaded should be sufficient
// for the text-oriented, DOM-oriented injectActions.
console.log(window.window_name);
var windw = window.window_name;
if ( document.readyState == "complete" ||
      document.readyState == "interactive" ) {
  console.log("document ready already ***");
//injectActions();

  // facebook loads after document officially says it 's ready, so slow down.
  
(async () => {
  console.log('a');
  await sleep(2700);
  console.log('b');
  injectCBB();
  console.log('c');
})()
  

  } else {
  console.log("window addEventListener for load ***");
  window.addEventListener('load', injectCBB());
}


//  Create a MutationObserver. Run it after running the above?
// started in:  CommentBetter.js
// This code from tutorials.

var observer = new MutationObserver(function(mutations) {
	// For the sake of...observation...let's output the mutation to console to see how this all works
	// seeking 0:div.UFIList    

/*	console.log('+++++++++++++++'); */
	mutations.forEach(function(mutation) {
    if (mutation.addedNodes &&
       (mutation.addedNodes.length > 0)) {

/*
      console.log('-----Mutation-----');
      //childlist is the only we bother with: console.log(mutation.type);
      //console.log(mutation);
      console.log(mutation.addedNodes);
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
      //
      //
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


      // Something not writ with testing UFIList. I give up here.
      // Is it some kind of caching issue?
      if (null && UFIList != null){    // not working, give up.
        console.log(UFIList.textContent); // just text, not useful
        /* I never actually implemented this effort to see if UFIList contains
         * the new class by hand, since the normal find efforts kept failing
         * but the console shows it there.  Could try this in the future
         * (this is merely cut-and-paste text of an idea...)
        function DOMComb (oParent, oCallback) {
          if (oParent.hasChildNodes()) {
            for (var oNode = oParent.firstChild; oNode; oNode = oNode.nextSibling) {
              DOMComb(oNode, oCallback);
            }
          }
          oCallback.call(oParent);
        }

          DOMComb(UFIList, console.log());
        */


        console.log("Checking for UFIList");
        console.log(UFIList); // can be null.
        console.log(typeof(UFIList));
        console.log(mutation.addedNodes[0].querySelector("a.cbbutton")); 
        console.log(mutation.addedNodes[0].querySelector("mybuttoned"));
        // I fail to understand why this is null
        console.log(UFIList.querySelector(".cbbutton")); // failing,null when should work
        console.log(UFIList.querySelectorAll(".cbbutton"));
        
        console.log($(UFIList).find(".mybuttoned")); // it's in there, but no. stumped
            // a.cbbutton is in the children of previous, why not found
        console.log($(UFIList).find("a.cbbutton"));

        // Well, shit. Maybe it's a race condition or object thing. Need
        // to modify the UFIList parent, rather than add to that object?
        //
        //
        console.log("Last chance:");
        console.log($(UFIList).find("UFICommentAttachmentButtons").hasClass("mybuttoned"));
      }

      if (UFIList) { 
        console.log("About to do the thing");
        injectCBB(UFIList);  //
      }
    
    }
      // =  attributes, childList over and over

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
if (targetNode) {
  observer.observe(targetNode, observerConfig);
} else {
  (async () => {
    console.log('targetNode wait and try again');
    await sleep(1700); // 2700 seems to work... 700 when connection good
    console.log('how long did that take');
    targetNode = document.querySelector('div[role="feed"]');
    console.log(targetNode);
observer.observe(targetNode, observerConfig);
  })();
}
//targetNode = document.getElementById("stream_pagelet");
// workes with subtree true...


//#stream_pagelet ... sometimes I see this.
// aria-label="News Feed"



 //   var containerNode = document.getElementById("globalContainer");
 //   var bodyNode = document.getElementsByTagName("body");
//Nothing: observer.observe(containerNode, observerConfig);
//observer.observe(bodyNode, observerConfig);




var config = {};
config.fb_post_search = '._1dwg'; // facebook posts
var fb_post_count = 0;


function injectCBB(domElement) {
  //domElement is what $(xx).get() would get.
  let color =  "#fcf";
  let target = 'body';
  if (domElement != null) {
    target = domElement;
    color =  "#dff";
    console.log("found a feed thing");
      
  } else {
    console.log("starting things found");
  }
  
// .UFICommentAttachmentButtons is the box the buttons live in
/* This didn't work:
//console.log($(target).find('.UFICommentAttachmentButtons').html());
 if($(target).find('.UFICommentAttachmentButtons').hasClass("mybuttoned")) { 
   console.log("***** IT ALREADY HAS THIS CLASS, ABORT *****");
 }
*/

  // Grab the ID. (adding a class not work!)
  // ex: id="addComment_10214535777885405"
  //
  // This isn't perfect. Ultimately need one button each box for
  // the main comment box, and also replying to threads. 
  // Also, after adding this code, for the first time I see
  // "NOW IT HAS THIS CLASS, ABORT" below. 
  let id = $(target).find('.UFIAddComment').prop('id');
  console.log("Now test ids:");
  console.log(id);
  if (idsComplete.indexOf(id) > -1) {
    console.log("This idsComplete was found already: " + id);
    return;
  } else {
    idsComplete.push(id);
    console.log("idsComplete now...");
    console.log(idsComplete);
  }
  console.log("New id added to list, so add the button for that id."); 
   


 $(target).find('.UFICommentAttachmentButtons').css({
    'background': color,
    }); 
 
 if($(target).find('.UFICommentAttachmentButtons').hasClass("mybuttoned")) {
   console.log("***** NOW IT HAS THIS CLASS, ABORT *****");
   return;
 }


 $(target).find('.UFICommentAttachmentButtons').addClass( "mybuttoned" );  

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
  let $newbies = $(target).find('.UFICommentAttachmentButtons');
  $newbies.prepend(htmlTemplate);
  console.log("ATTACH CLICK");    
  console.log($newbies);
  console.log($newbies.find('cbbutton')); // length 0   :-(
  // Gives uncaught errors when undefined. 
  // @ToDo: Dig to make sure can simply be ignored:
  console.log($newbies[0].children[0]); // this is the button

  $($newbies[0].children[0]).click(function(e){
    //$(this.href).show();
    e.preventDefault();
    e.stopPropagation();
    //console.log(e);
    //console.log(this); // the button! yes!

    /** Positioning
     * .position() is relative to parent, .offset() to document. 
     **/ 
    let btn = this;
    let modal =  document.getElementById('cbModal');  /* or global var? */

    let scrollTop = $(window).scrollTop(); //
      // If the scrollTop + height of modal + gap > btnOffset.top, 
    let btnOffset = $(this).offset();
    let modalHeight = 404, // eyeball for now
        modalGap = 10;   // maybe tighten in final work, 

    // If modal isn't read, gives an error. @ToDo But doesn't seem to 
    //  be creating errors for users (so far as I see)
    // Uncaught TypeError: Cannot read property 'style' of null
    modal.style.height = modalHeight + "px";

    $(modal).find("#p1 .cbbContent").show(); // not sure why css doesn't do this
          // @ToDo-figure-this-out-and-cleanup
    if ( scrollTop + modalHeight + modalGap > btnOffset.top ) {
      // Under 
      let commentHeight = 32;
      $(modal).offset({ top: btnOffset.top+modalGap+commentHeight, left: btnOffset.left-200});
    } else { // modal goes over, the normal expected behavior
      $(modal).offset({ top: btnOffset.top-modalHeight-modalGap, left: btnOffset.left-200}); 
    }

    /********************* Temp: prep the Modal *******************/
    // !!!!! @ToDo How often does this run? This is crap code, halfway
    // between javascript and React for the moment. Clean up before publish....
   
    // @ToDo. Crazy issues with locked down cache on css while developing.
    // Plus need to get chrome images into doc.

    
    let imageUrl = chrome.extension.getURL("img/modal/cover_weaving-into-icon-40.png");
    $(modal).find('#cp').css('background-image', 'url(' + imageUrl + ')');
    imageUrl = chrome.extension.getURL("/img/modal/radciv.png");
    // tab  
    $(modal).find('#rcc').css('background-image', 'url(' + imageUrl + ')');
    // and larger for main cbbContent.   
    imageUrl = chrome.extension.getURL("/img/modal/radical_civility.jpg");
    $(modal).find('#rcc .cbbContent').css('background-image', 'url(' + imageUrl + ')');

    imageUrl = chrome.extension.getURL("/img/ic_favorite_border_18pt.png");
    $(modal).find('.adv').css('background-image', 'url(' + imageUrl + ')');
/* Hide all the tabs ot clicked on. Hides all the tabs when none clicked on.
 * .sg is too far down. #jQuery_vs_React_hide
 *
 * Comment this shit back out soon: */
    $(modal).find('#tabs li').on('click', function() {  
   //   $('.sg').hide();
      $('.sg').show();
      console.log(this);
   //   $(this).find('.sg').show();
      e.stopPropagation();
    });
/* */


//$('#cbModal').css({'height' : ''})
    console.log(modal); // yes, this is the modal.
    // When the user clicks on the button, open the modal
    modal.style.display = "block";
    /* Where? Position the modal: */
    // element.getBoundingClientRect() are relative to the viewport.
    //var bodyRect = document.body.getBoundingClientRect(),
    /*
    let btnRect = this.getBoundingClientRect();
    let modalRect = modal.getBoundingClientRect();
  //  = elemRect.top - bodyRect.top;
    console.log("Where are my toys?");
    console.log(btnRect);
    console.log(modalRect);
*/


  });

  // This can probably be removed once we only have cbModal per page
  // use parent:    _3ccb, or _5jmm
  $('.UFICommentAttachmentButtons').parents('._42ef').css("overflow", "visible");
  // This is untested, might possibly work for all we know, in case that above
  // overflow actually matters for something.
  //$('.UFICommentAttachmentButtons').parents('_3ccb').append(cbModal);

  /* Make the modal show up or close **/
  var modal = document.getElementById('cbModal');

  // Get the button that opens the modal
  var btn = document.getElementById("cbButton");

  // @ToDo, redo modals entirely. Don't set up each separately here.

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
    if ((event.target != modal && event.target.parentNode != modal ) 
         && event.target != btn ) {
        modal.style.display = "none";
    }
  }
  // Get the <span> element that closes the modal
  //var span = document.getElementsByClassName("close")[0];
}

