//creates a new object with today's date
var today = new Date();
console.log((today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear());

// function for dynamically creating a button for recent searches on clicking the search button
$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // stores value in search text box as a variable
    var textEl = $("#searchBox").val();
    // dynamically creates a button for recent searches. checks if the textbox contains value.
    if (textEl) {
        // request geolocation using geolocation api from open weather api
        var requestWeatherUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + textEl + "&appid=0838a1f6c730425e60b39b77d73f4aad";
        // clears textbox after clicking the search button
        fetch(requestWeatherUrl)
            // turns url into a json string    
            .then(function (res) {
                return res.json();
            })
            //uses json string to inplement dynamic functions
            .then(function (data) {
                console.log(data);
                // limits total recent searches up to 5
                if (data.length !== 0 && $("#recentSearches").children().length < 5) {
                    $("#recentSearches").append('<li class="list-group-item"><button type="button" class="btn btn-primary btn-block searches w-100">' + textEl + '</button></li>');
                    return data;
                }
                // if there is more than 5 searches, it will delete 
                else if ($("#recentSearches").children().length === 5) {
                    $("#recentSearches").children().last().remove();

                    $("#recentSearches").prepend('<li class="list-group-item"><button type="button" class="btn btn-primary btn-block searches w-100">' + textEl + '</button></li>');
                    return data;
                }
                // logs out error if location does not exist
                else {
                    console.log("error");
                    return;
                }
            })
    }

    $("#searchBox").val("");
});



// $(".searches").on("click", function (event) {
//     event.preventDefault();

//     var btnTextEl = ($(this)).val();
//     console.log(btnTextEl);
// });

