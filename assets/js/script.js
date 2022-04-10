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
                $("#todayW").find('[data-type="wHead"]').text("City: " + curMonth + "/" + curDay + "/" + curYear);
                // adds icon
                $("#todayW").find('[data-type="weatherLogo"]').text("Icon: ")
                // adds temperature value
                $("#todayW").find('[data-type="temperature"]').text("Temperature: ");
                // adds humidity
                $("#todayW").find('[data-type="humidity"]').text("Humidity: ");
                // adds wind speed
                $("#todayW").find('[data-type="wSpeed"]').text("Wind Speed: ");
                // add uv index
                $("#todayW").find('[data-type="uvIndex"]').text("UV Index: ");

                // targets five day weather containers and adds information
                for (var i = 0; i < 5; i++) {
                    $("#fiveDayW").find('[data-type="wHead"]').eq(i).text("Date: ");
                    $("#fiveDayW").find('[data-type="weatherLogo"]').eq(i).text("Icon: ");
                    $("#fiveDayW").find('[data-type="temperature"]').eq(i).text("Temp: ");
                    $("#fiveDayW").find('[data-type="humidity"]').eq(i).text("Humidity: ");
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

