
$.ajax({
url:"https://teamtreehouse.com/keithostertag.json",
success: function(teamtree) {
  console.log(teamtree);

// iterate and place into document one line at a time
// create div, place badge then badge info
    $.each(teamtree.badges, function( idx, badge) {
      $('#main_container').append("<div class='badgeDisplayArea' id=badge" + idx + "><div class='innerContainer'><img src=" +
      badge.icon_url +
      "><div class='spanS'>");

// iterate inside each badge to get its assoc titles
          $.each(badge.courses, function(index, course) {
            $('#badge' + idx + ' .innerContainer .spanS').
            append("<span class='videoTitle'><i class='fa fa-caret-right'></i>" +
            course.title + "</span>");
          });
          // end badge.courses each

          $('#badge' + idx ).append("<span class='badgeNumber'> Badge ID " +
          badge.id +
          ": " +
          badge.name +
          "</span>");

    }); // end outer each

}, // end success function
error: function() {
  alert('Error')
}
});
