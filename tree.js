
$.ajax({
url:"https://teamtreehouse.com/keithostertag.json",
success: function(teamtree) {
  console.log(teamtree);

// iterate and place into document one line at a time
// create div, place badge then badge info
    $.each(teamtree.badges, function( idx, badge) {
      $('#main_container').append("<div class='badgeDisplayArea' id=badge" + idx + "><img src=" +
      badge.icon_url +
      "><div><span class='videoTitle'> Badge ID " +
      badge.id +
      ": " +
      badge.name +
      "</span>");

// iterate inside each badge to get its assoc titles
          $.each(badge.courses, function(index, course) {
            $('#badge' + idx).append("<span class='videoTitle'>" +
            course.title + "</span>");
          });
          // end badge.courses each

          //close nested divs

    }); // end outer each

}, // end success function
error: function() {
  alert('Error')
}
});
