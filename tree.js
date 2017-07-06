
$.ajax({
url:"https://teamtreehouse.com/keithostertag.json",
success: function(teamtree) {
  console.log(teamtree);
  console.log(teamtree.name);

// iterate and place into document one line at a time
// create div, place badge then badge info

// first, setup for month short names
var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// append users name in intro div
  $('#userName').append(teamtree.name);

// now iterate through object to get badges
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

// format then add date
          var date = new Date(badge.earned_date);
          var dateWanted = monthShortNames[(date.getMonth())] + " " + date.getDate() + "," + date.getFullYear();

// place badge info where it belongs at bottom of badgeDisplayArea
          $('#badge' + idx ).append("<span class='badgeNumber'> Badge ID " +
          badge.id +
          ": " +
          badge.name + "<i class='date' > (" + dateWanted + ")</i>" +
          "</span>");

    }); // end outer each

}, // end success function
error: function() {
  alert('Error')
}
});
