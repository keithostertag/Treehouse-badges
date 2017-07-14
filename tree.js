
$('#goButton').click(function() {
  // when goButton is clicked use ajax to get json file for entered profileName

  // make certain appropriate divs are empty to start
  // $("#heading").empty();
  $("#userName").empty();
  $("#main_container").empty();
  $("#innerContainer").empty();
  $("#badgePoints").empty();

$.ajax({
url:"https://teamtreehouse.com/" +
$('#intro input[name=profileName]').val()  + ".json",
success: function(teamtree) {
  console.log(teamtree);

  // sort the object by earned_date using compareValues function
  var sortOrder = $( "input:checked" ).val();
      teamtree.badges.sort(compareValues('earned_date', sortOrder));

// get the filterStrig if it was entered, default in html is ""
  var filterString = $('input[name=filterString]').val().toLowerCase();
    console.log("filterString is: " + filterString);

      // Prevent form submission if form is used(!)
$( "form" ).submit(function( event ) {
    event.preventDefault();
});

// setup for month short names for later use with dates
const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

var filterStringCount = 0;  // for later use when search string is used

// iterate through object and place into document a line at a time
// create div, place badge then badge info

// append user name into div
  $('#userName').append(teamtree.badges.length + " Treehouse Video Badges earned by " + teamtree.name);

// now iterate through object to get badges
    $.each(teamtree.badges, function( idx, badge) {

// create a stringified temp var so we can use indexOf
// to check for occurances of filterString anywhere in object
      var myJSON= JSON.stringify(this).toLowerCase();
      console.log("filterString2 is: " + filterString);

// check to see if user has entered a filter string
// default is filterString = "" in index.html- so append them all unless filterString false
  if (myJSON.indexOf(filterString) != -1) {
      if (filterString > "") filterStringCount++; // how many badges filtered?
      $('#main_container').append("<div class='badgeDisplayArea' id=badge" + idx +
      "><div class='innerContainer'><img src=" +
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
          var dateWanted = monthShortNames[(date.getMonth())] + " " + date.getDate() + ", " + date.getFullYear();

// place badge info where it belongs at bottom of badgeDisplayArea
          $('#badge' + idx ).append("<span class='badgeNumber'> Badge ID " +
          badge.id +
          ": " +
          badge.name + "<i class='date' > (" + dateWanted + ")</i>" +
          "</span>");
} // end for if myJSON statment

    }); // end outer each

//  subheading with count for when a search string was used
    if (filterString != "" && filterStringCount > 0) {
      console.log("filterStringCount is " + filterStringCount);
      $('#userName').append(" <h5>" + filterStringCount +
      " badges when filtered by \"" + filterString + "\": </h5>");
    } else if (filterString != "" && filterStringCount == 0) {
      $("#userName").empty();
      $('#userName').append("<br>Sorry, there are no badges for " +
      teamtree.name + " when filtered by \"" + filterString + "\"");
    }

// create and fill points earned section through iteration
// first add the heading

// we don't want the points appended if a subset of badges was created by a filterString
if (filterString == 0 ) {

    $('#badgePoints').append("<p id='pointsHeader'>Total Points Earned by Category");

// create array of arrays from teamtree.points object
    var sortedArray = [];
    for (var pts in teamtree.points)  {
      sortedArray.push([pts, teamtree.points[pts]]);
    }

// sort the array of arrays
    sortedArray.sort(function(a, b) {
      return a[1] - b[1];  // sort on points
    });

console.log(sortedArray);
// only display the points for categories that have points > 0
    for (i=0;i<sortedArray.length;i++) {
        if (sortedArray[i][1] !== 0) {
              console.log(sortedArray[i][0] + ": " + sortedArray[i][1]);
              var temp = "<p class='points'>" + sortedArray[i][0] + ": " + sortedArray[i][1] + "</p>";
              document.getElementById('badgePoints').innerHTML += temp;
        } ;  // end if
    } ;// end for i

} // end if filterString == 0

}, // end of success function

error: function() {
  alert('Error... Can\'t find Treehouse profile name: ' +
  $('#intro input[name=profileName]').val());
}

});  // end of ajax
}); // end of button click function


    // function from https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
    // use: sorted by key, in ascending order by default
    //    object.sort(compareValues('key'));
    // use: sorted by key in descending order
    //    object.sort(compareValues('key', 'desc'));
    // use: sorted by key in ascending order
    //    object.sort(compareValues('key'));

    function compareValues(key, order='asc') {
      return function(a, b) {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
          a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
          b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return (
          (order == 'desc') ? (comparison * -1) : comparison
        );
      };
    } // end of function compareValues
