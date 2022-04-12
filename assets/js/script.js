//creates a new object with today's date
var today = new Date();
var curMonth = (today.getMonth() + 1);
var curDay = today.getDate();
var curYear = today.getFullYear();
console.log(curMonth + "/" + curDay + "/" + curYear);
var textEl;

// function for dynamically creating a button for recent searches on clicking the search button
function loadW() {

    // dynamically creates a button for recent searches. checks if the textbox contains value.
    if (textEl) {
        // request geolocation using geocoding api from open weather api
        var requestGeoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + textEl + "&appid=0838a1f6c730425e60b39b77d73f4aad";
        var lat = "";
        var lon = "";

        // fetches data from the geolocation api
        fetch(requestGeoUrl)
            // turns url into a json string    
            .then(function (res) {
                return res.json();
            })
            //uses json string to inplement dynamic functions
            .then(function (data) {
                console.log("Geo Data: ", data);

                // limits total recent searches up to 5
                if (data.length !== 0) {
                    if ($("#recentSearches").children().length < 5) {
                        $("#recentSearches").prepend('<li class="list-group-item"><button type="button" class="btn btn-primary btn-block w-100" onclick="test1(event)">' + textEl + '</button></li>');
                    }
                    // if there is more than 5 searches, it will delete 
                    else if ($("#recentSearches").children().length === 5) {
                        $("#recentSearches").children().last().remove();
                        $("#recentSearches").prepend('<li class="list-group-item"><button type="button" class="btn btn-primary btn-block w-100" onclick="test1(event)">' + textEl + '</button></li>');
                    }
                }
                // logs out error if location does not exist
                else {
                    console.log("error");
                    return;
                }

                // records location name
                var lName = data[0].name;
                console.log(lName);

                // records latitude
                lat = data[0].lat;
                console.log(lat);

                // records longitude
                lon = data[0].lon;
                console.log(lon);

                // pulls latitude and longitude from geocoding api
                var requestWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=0838a1f6c730425e60b39b77d73f4aad";


                // fetches data from weather api using geolocation api data
                fetch(requestWeatherUrl)
                    // turns url into a json string    
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (data) {
                        console.log(data);

                        var temp = data.daily[0].temp.day;
                        console.log(temp);

                        var humidity = data.daily[0].humidity;
                        console.log(humidity);

                        var wSpeed = data.daily[0].wind_speed;
                        console.log(wSpeed);

                        var uvi = data.daily[0].uvi;
                        console.log(uvi);

                        var icon = data.daily[0].weather[0].icon;
                        console.log(icon);

                        // targets todayW container
                        // adds today date to the container with the id todayW
                        $("#todayW").find('[data-type="wHead"]').text(lName + " " + curMonth + "/" + curDay + "/" + curYear);
                        // adds weather icon
                        $("#todayW").find('[data-type="weatherLogo"]').attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
                        // adds temperature value
                        $("#todayW").find('[data-type="temperature"]').text("Temperature: " + temp + "\u00B0F");
                        // adds humidity
                        $("#todayW").find('[data-type="humidity"]').text("Humidity: " + humidity + "%");
                        // adds wind speed
                        $("#todayW").find('[data-type="wSpeed"]').text("Wind Speed: " + wSpeed + "mph");
                        // add uv index
                        $("#todayW").find('[data-type="uvIndex"]').text("UV Index: " + uvi);

                        // targets five day weather containers and adds information
                        for (var i = 0; i < 5; i++) {

                            temp = data.daily[i + 1].temp.day;
                            humidity = data.daily[i + 1].humidity;
                            icon = data.daily[i + 1].weather[0].icon;

                            $("#fiveDayW").find('[data-type="wHead"]').eq(i).text(curMonth + "/" + (curDay + i) + "/" + curYear);
                            $("#fiveDayW").find('[data-type="weatherLogo"]').eq(i).attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
                            $("#fiveDayW").find('[data-type="temperature"]').eq(i).text("Temp: " + temp + "\u00B0F");
                            $("#fiveDayW").find('[data-type="humidity"]').eq(i).text("Humidity: " + humidity + "%");
                        }
                    });
            })
    }

    // clears textbox after clicking the search button
    $("#searchBox").val("");
};

// executes the function to get the weather information when clicking the search button
$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // stores value in search text box as a variable
    textEl = $("#searchBox").val();
    loadW();
});

// executes the function to get the weather information when pressing one of the recent searches button
function test1(event) {
    event.preventDefault();
    textEl = event.target.innerText;
    console.log(textEl);
    loadW();
}
