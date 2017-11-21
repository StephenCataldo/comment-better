/* jquery script */


console.log("In pop.js");
$(function() {
  /*
  $( ".see3" ).dialog({
    autoOpen: false
  });
  */

  /* make it pop: onClick in see1 block, open dialogue for see2 */
  $(".see1").on( "click", function() {
    console.log( $( this ).children("h2").text() );
    //$(".see3").css("display","block");
    //$( this ).children(".see3").css('display','block');
    //console.log( $( this ).find("div.see3").text() );
    // reset 
		$(".see3").css("display", "none");	
    $(".see3x").css("display", "block"); 
    // where clicked, instead of hover
    /*
    $(".start").scrollTop($(this).scrollTop());
    console.log("Jump. " + $(this).children("h2").scrollTop() );
    */
    // Puttering with window scrolling, seems ok, rebuild with design clearer
    // Hey - it works, not going to fiddle, but scrolls into view before
    // making visible
    $(this).get(0).scrollIntoView();
    $(this).find("div.see3:last").get(0).scrollIntoView();
    //$(this).scrollTop(0);
    $( this ).children(".see3x").css("display", "none"); 
    $( this ).children("h2").css("display", "block");
		$( this ).find("div.see3").css("display", "block");
    //$( this ).children(".see3").dialog("open");
  });



  $(".see1XX").bind( "click", function() {
    console.log( $( this ).children("see3").html );
    $( this ).children("see3").dialog(); 
    // modal = set to true?
  });

});
