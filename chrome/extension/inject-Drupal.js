import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import CbbModal from './CbbModal';

//import CommentBetter from './CommentBetter';
import jQuery from "./library/jquery";
window.$ = window.jQuery = jQuery;


  // Get the images. Simpler than the chrome extension
  var imgURL = "img/commentbetter-logo-filled-right.png";
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


  
  // We're refinding, @ToDo, efficiency.
  //$(target).find('.UFICommentAttachmentButtons').prepend(htmlTemplate);
  // Future devs: sorry, I don't quite understand why jQuery can't find
  // the just-prepended links and attach events to them, and I'm exploring
  // odd ways to find the links and attach events. Chrome extensions
  // don't let functions run straightforwardly
  // Bet there are better ways to do this. @ToDo-refactor
  // (I don't want to force extra loose permissions).
  let $newbies = $(target).find('.UFICommentAttachmentButtons');
 #conversation .postbox div.textarea 
  $newbies.prepend(htmlTemplate);
  console.log("ATTACH CLICK");    
  console.log($newbies);
let $newhome = $("#disqus_thread .nav-secondary ul"); // add an li in middle.
$newhome.prepend('<li>' + htmlTemplate + '</li>');

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

