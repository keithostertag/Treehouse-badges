window.onload = function() {

// $('#myForm input[name=submit]').click(function() {
$('#myForm button').click(function() {
$.ajax({
  url:"https://teamtreehouse.com/mitchellstarkey.json",
// url:"https://teamtreehouse.com/" +
// $('#myForm input[name=profileName]').val()  + ".json",
// $('#myForm input[name=profileName]').val()  + ".json",
success: function(teamtree) {
  console.log(teamtree);

  // sort the object using compareValues function
  // var sortOrder = $('#myForm input[name=sortOrder]:checked', '#myForm').val();
      teamtree.badges.sort(compareValues('key', 'desc'));

// iterate and place into document one line at a time
// create div, place badge then badge info

// setup for month short names
const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// append users name in intro div
  $('#userName').append("Treehouse Video Badges earned by " + teamtree.name);
  // document.getElementById('userName').append(teamtree.name);

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
          var dateWanted = monthShortNames[(date.getMonth())] + " " + date.getDate() + ", " + date.getFullYear();

// place badge info where it belongs at bottom of badgeDisplayArea
          $('#badge' + idx ).append("<span class='badgeNumber'> Badge ID " +
          badge.id +
          ": " +
          badge.name + "<i class='date' > (" + dateWanted + ")</i>" +
          "</span>");

    }); // end outer each

// create and fill points earned section through iteration
// first add the heading
    $('#badgePoints').append("<p id='pointsHeader'>Points Earned by Category");

// create array of arrays from teamtree.points
    var sortedArray = [];
    for (var pts in teamtree.points)  {
      sortedArray.push([pts, teamtree.points[pts]]);
    }

// sort the array
    sortedArray.sort(function(a, b) {
      return a[1] - b[1];  // sort on points
      // return a.y - b.y;
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


}, // end success function
error: function() {
  alert('Error')
}
});
}); // intro button click function
} // window.onload function
