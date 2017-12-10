//import CommentBetter from './CommentBetter';
import jQuery from "./maybe_bad/jquery";
window.$ = window.jQuery = jQuery;

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
  doTheThing();
  console.log('c');
})()
  

  } else {
  console.log("window addEventListener for load ***");
  window.addEventListener('load', doTheThing());
}

var config = {};
config.fb_post_search = '._1dwg'; // facebook posts
var fb_post_count = 0;

function doTheThing() {

// .UFICommentAttachmentButtons is the box the buttons live in
// We prepend or append a clickable image into that box
 $('.UFICommentAttachmentButtons').css({
    'background': '#fcf',
    }); 
  // images in chrome extensions are trick, this generates an odd URL for it
  var imgURL = chrome.extension.getURL("img/commentbetter-logo-filled-26.png");

  // via facebook cut and paste
  let image = "<img class='cbButton' src='" + imgURL +"' />";
  let cbModal = '<div class="cbModal">Yes, and...</div>';
    let htmlTemplate =  
'<a id="cb-1" onClick="cbModal(1)" aria-label="Openings: Better Comments” class="_r1a _5f0v cbButton" data-hover="tooltip" data-tooltip-alignh="center" data-tooltip-content="Better Comments" role="button" href="#" id="js_1n">' + image + '</a>' + cbModal;

  /** @ToDos, perhaps
   * - This modal could open down if the click is high on the screen.
   * - Keep watching for what is broken by removing overflow: hidden. 
   *   But looks fine. If problems, switch to laiding the cbModal into
   *   a parent.
   * - How does the modal close? Is it comfy for most users as is?
   **/    


  $('.UFICommentAttachmentButtons').prepend(htmlTemplate);
  // use parent:    _3ccb, or _5jmm
  $('.UFICommentAttachmentButtons').parents('._42ef').css("overflow", "visible");
  // This is untested, might possibly work for all we know, in case that above
  // overflow actually matters for something.
  //$('.UFICommentAttachmentButtons').parents('_3ccb').append(cbModal);
}
