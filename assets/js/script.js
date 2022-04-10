//creates a new object with today's date
var today = new Date();
var curMonth = (today.getMonth() + 1);
var curDay = today.getDate();
var curYear = today.getFullYear();
console.log(curMonth + "/" + curDay + "/" + curYear);

// function for dynamically creating a button for recent searches on clicking the search button
$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // stores value in search text box as a variable
    var textEl = $("#searchBox").val();
    // dynamically creates a button for recent searches. checks if the textbox contains value.
    if (textEl) {
        // request geolocation using geolocation api from open weather api
        var requestGeoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + textEl + "&appid=0838a1f6c730425e60b39b77d73f4aad";
        var lat = "";
        var lon = "";
        var requestWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=0838a1f6c730425e60b39b77d73f4aad";

        // clears textbox after clicking the search button
        fetch(requestGeoUrl)
            // turns url into a json string    
            .then(function (res) {
                return res.json();
            })
            //uses json string to inplement dynamic functions
            .then(function (data) {
                console.log(data);
                // limits total recent searches up to 5
                if (data.length !== 0) {
                    if ($("#recentSearches").children().length < 5) {
                        $("#recentSearches").append('<li class="list-group-item"><button type="button" class="btn btn-primary btn-block searches w-100">' + textEl + '</button></li>');
                    }
                    // if there is more than 5 searches, it will delete 
                    else if ($("#recentSearches").children().length === 5) {
                        $("#recentSearches").children().last().remove();
                        $("#recentSearches").prepend('<li class="list-group-item"><button type="button" class="btn btn-primary btn-block searches w-100">' + textEl + '</button></li>');
                    }
                }
                // logs out error if location does not exist
                else {
                    console.log("error");
                    return;
                }

                // targets todayW container
                // adds today date to the container with the id todayW
                $("#todayW").children().children().children("h5").text("City: " + curMonth + "/" + curDay + "/" + curYear + " Icon");
                // adds icon
                $("#todayW").children().children().children("h6").text("icon: ")
                // adds temperature value
                $("#todayW").children().children().children("p:nth-of-type(1)").text("Temperature: ");
                // adds humidity
                $("#todayW").children().children().children("p:nth-of-type(2)").text("Humidity: ");
                // adds wind speed
                $("#todayW").children().children().children("p:nth-of-type(3)").text("Wind Speed: ");
                // add uv index
                $("#todayW").children().children().children("p:nth-of-type(4)").text("UV Index: ");


            })
    }

    $("#searchBox").val("");
});



// $(".searches").on("click", function (event) {
//     event.preventDefault();

//     var btnTextEl = ($(this)).val();
//     console.log(btnTextEl);
// });

