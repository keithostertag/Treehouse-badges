
$.ajax({
url:"https://teamtreehouse.com/keithostertag.json",
success: function(teamtree) {
  console.log(teamtree);

// iterate and place into document one line at a time
// create div, place badge then badge info
    $.each(teamtree.badges, function( idx, badge) {
      $('#main_container').append("<div class='badgeDisplayArea'><img src=" +
      badge.icon_url +
      "><div><span class='videoTitle'> Badge ID " +
      badge.id +
      ": " +
      badge.name +
      "</span>");

// iterate inside each badge to get its assoc titles
          $.each(badge.courses, function(index, course) {
            $('#main_container').append("<span class='videoTitle'>" +
            course.title + "</span>");
          });
          // end badge.courses each

          //close nested divs
          $('#main_container').append("</div></div>");

    }); // end outer each

}, // end success function
error: function() {
  alert('Error')
}
});
