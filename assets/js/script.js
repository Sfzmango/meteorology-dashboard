// function for dynamically creating a button for recent searches on clicking the search button
$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // stores value in search text box as a variable
    var textEl = $("#searchBox").val();

    // dynamically creates a button for recent searches
    $("#recentSearches").append('<li class="list-group-item"><button type="button" class="btn btn-primary btn-block w-100">' + textEl + '</button></li>');

    // clears textbox after clicking the search button
    $("#searchBox").val("");
});