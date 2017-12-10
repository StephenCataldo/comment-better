//import CommentBetter from './CommentBetter';
import jQuery from "./maybe_bad/jquery";
window.$ = window.jQuery = jQuery;


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

  // facebook is too whatever.
  
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
 $('.UFICommentAttachmentButtons').css({
    'background': '#fcf',
    }); 
  //$('.UFICommentAttachmentButtons').append("<div class='launchGuide'></div>");
  var imgURL = chrome.extension.getURL("img/attachButton.png");

  $('.UFICommentAttachmentButtons').append("<img class='launchGuide' src='" + imgURL +"' />");//<img src="./img/attachButton.png">');
}
