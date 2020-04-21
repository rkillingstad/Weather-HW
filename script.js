// import java.time.LocalDate;

// LocalDate localDate = LocalDate.now();
// console.log(localDate);
const cities = [];
var city = $("#cityName").val().trim();
const cityLocal = JSON.parse(localStorage.getItem("cities")) || cities;
const apiKey = "a7ed34201083eaf008a58e7a04b5d1ec";

const now = new Date();
console.log(now);
var year = now.getFullYear();
var month = now.getMonth() + 1;
var date = now.getDate();

//initial search
function currentWeather () {
    fiveDay(city);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
        city + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        var icon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        $(".icon").append(icon);
        $(".city").html("<h1>" + response.name);
        $(".wind").text("Wind Speed: " + response.wind.speed + "m/s");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".temp").text("Temperature: " + response.main.temp + "°F");
        $(".date").text("(" + month + "/" + date + "/" + year + ")");

        var uvLat = res.coord.lat;
        var uvLon = res.coord.lon;
        getUV(uvLat, uvLon);
        
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
        console.log(response.weather);
        console.log(response.timezone);

    });
    //.catch(e => alert("Error! Try another city!"));
};

function getUV(uvLat, uvLon){
    var queryURLuv = "https://api.openweathermap.org/data/2.5/uvi?appid=" +
    apiKey + "&lat=" + uvLat + "&lon=" + uvLon;
    
    $.ajax({
        url: queryURLUV,
        method: "GET"
      }).then(function(res) {
        var uvFull = res.value;
        console.log(uvFull);

        var iconUV = $("<div>").text(res.value);
        $(".UV").text("UV Index: ");
        $(".UV").append(iconUV);
        if (response.value < 3.0) {
            iconUV.attr("class", "green-uv");
        } else if (res.value >= 3.0 && res.value < 6.0) {
            iconUV.attr("class", "yellow-uv");
        } else if (res.value >= 6.0 && res.value < 8.0) {
            iconUV.attr("class", "orange-uv");
        } else if (res.value >= 8.0 && res.value < 11.0) {
            iconUV.attr("class", "red-uv");
        } else if (res.value >= 11.0) {
            iconUV.attr("class", "purple-uv");
        }
    });
}

//five day
function fiveDay (city){
    var queryURL5 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

    var temps = [];
    var humidity = [];
    
    $.ajax({
        url: queryURL5,
        method: "GET"
      }).then(function(response5) {
        console.log(response5);
        var date1 = moment()
			.add(1, 'days')
			.format('MM/DD/YYYY');
		console.log('date1: ' + date1);
        $("#date1").text(date1);

        var icon1 = $("<img>").attr("src", 'http://openweathermap.org/img/wn/' + response5.list[4].weather[0].icon + ".png");
		console.log('icon ' + icon1);
		// var icon1URL = 'http://openweathermap.org/img/wn/' + icon1 + '@2x.png';
		console.log(icon1);
		$('#icon1').append(icon1);
        
        for( i =0; i<=5; i++){
            var temp = response5.list[i].main.temp;
            temps.push(parseInt(temp));
            var humid = response5.list[i].main.humidity;
            humidity.push(parseInt(humid));
        }
            console.log("Temps and humidity: " + temps, humidity);
            console.log("list" + response5.list[i]);

        var tempAverage1 = 
            (temps[1] + temps[2] + temps[3] + temps[4] + temps[5])/5;
        var humidityAverage1 =
            (humidity[0]+humidity[1]+humidity[2]+humidity[3]+humidity[4])/5; 
        console.log("averages" + tempAverage1, humidityAverage1);

        //display these averages
        $("#temp1").text(tempAverage1 + "°F");
        $("#humidity1").text("Humidity: " + humidityAverage1 + "%");

        //card 2
        var date2 = moment()
			.add(2, 'days')
			.format('MM/DD/YYYY');
		console.log('date2: ' + date2);
        $('#date2').text(date2);

        var icon2 = $("<img>").attr("src", 'http://openweathermap.org/img/wn/' + response5.list[12].weather[0].icon + ".png");
		console.log('icon ' + icon2);
		$('#icon2').append(icon2);
        
        var temps2 = [];
        var humidity2=[];
        for (i = 6; i <= 13; i++) {
			var temp2 = response5.list[i].main.temp;
            temps2.push(parseInt(temp2));
            var humids2 = response5.list[i].main.temp;
            humidity2.push(parseInt(humids2));
        }
        console.log("temp/humidity2: " + temps2, humidity2);

        var tempAverage2 = 
            (temps2[1] + temps2[2] + temps2[3] + temps2[4] + temps2[5])/5;
        var humidityAverage2 =
            (humidity2[1]+humidity2[2]+humidity2[3]+humidity2[4]+humidity2[5])/5; 
        console.log("averages2: " + tempAverage2, humidityAverage2);

        $("#temp2").text(tempAverage2 + "°F");
        $("#humidity2").text("Humidity: " + humidityAverage2 + "%");

        //card 3
        var date3 = moment()
			.add(3, 'days')
			.format('MM/DD/YYYY');
		console.log('date3: ' + date3);
        $("#date3").text(date3);

       var icon3 = $("<img>").attr("src", 'http://openweathermap.org/img/wn/' + response5.list[18].weather[0].icon + ".png");
		    console.log('icon ' + icon3);
		    $('#icon3').append(icon3);

        var temps3 = [];
        var humidity3=[];
        for (i = 14; i <= 21; i++) {
			var temp3 = response5.list[i].main.temp;
            temps3.push(parseInt(temp3));
            var humids3 = response5.list[i].main.temp;
            humidity3.push(parseInt(humids3));
            
        }
        console.log("temp/humidity3: " + temps3, humidity3);

        
        var tempAverage3 = 
            (temps3[1] + temps3[2] + temps3[3] + temps3[4] + temps3[5])/5;
        var humidityAverage3 =
            (humidity3[1]+humidity3[2]+humidity3[3]+humidity3[4]+humidity3[5])/5; 
        console.log("averages3: " + tempAverage3, humidityAverage3);

        $("#temp3").text(tempAverage3 + "°F");
        $("#humidity3").text("Humidity: " + humidityAverage3 + "%");

        //card 4
        var date4 = moment()
			.add(4, 'days')
			.format('MM/DD/YYYY');
		console.log('date3: ' + date4);
        $("#date4").text(date4);

        var icon4 = $("<img>").attr("src", 'http://openweathermap.org/img/wn/' + response5.list[27].weather[0].icon + ".png");
		    console.log('icon ' + icon4);
		    $('#icon4').append(icon4);

        var temps4 = [];
        var humidity4=[];
        for (i = 22; i <= 29; i++) {
			var temp4 = response5.list[i].main.temp;
            temps4.push(parseInt(temp4));
            var humids4 = response5.list[i].main.temp;
            humidity4.push(parseInt(humids4));
        }
        console.log("temp/humidity4: " + temps4, humidity4);

        var tempAverage4 = 
            (temps4[1] + temps4[2] + temps4[3] + temps4[4] + temps4[5])/5;
        var humidityAverage4 =
            (humidity4[1]+humidity4[2]+humidity4[3]+humidity4[4]+humidity4[5])/5; 
        console.log("averages4: " + tempAverage4, humidityAverage4);

        $("#temp4").text(tempAverage4 + "°F");
        $("#humidity4").text("Humidity: " + humidityAverage4 + "%");

        //card 5
        var date5 = moment()
			.add(5, 'days')
			.format('MM/DD/YYYY');
		console.log('date5: ' + date5);
        $("#date5").text(date5);

        var icon5 = $("<img>").attr("src", 'http://openweathermap.org/img/wn/' + response5.list[34].weather[0].icon + ".png");
		    console.log('icon ' + icon5);
		    $('#icon5').append(icon5);

        var temps5 = [];
        var humidity5=[];
        for (i = 30; i <= 37; i++) {
			var temp5 = response5.list[i].main.temp;
            temps5.push(parseInt(temp5));
            var humids5 = response5.list[i].main.temp;
            humidity5.push(parseInt(humids5));
        }
        console.log("temp/humidity5: " + temps5, humidity5);

        var tempAverage5 = 
            (temps5[1] + temps5[2] + temps5[3] + temps5[4] + temps5[5])/5;
        var humidityAverage5 =
            (humidity5[1]+humidity5[2]+humidity5[3]+humidity5[4]+humidity5[5])/5; 
        console.log("averages5: " + tempAverage5, humidityAverage5);

        $("#temp5").text(tempAverage5 + "°F");
        $("#humidity5").text("Humidity: " + humidityAverage5 + "%");

           console.log("5 day html set");
      });
}

function buttonRender(){
    $("#cityButtons").empty();
    
    for (var i = 0; i < cityLocal.length; i++) {
        console.log("localStorage key is: " + localStorage.key(i));
        var b = $("<button>");
        b.addClass("btn city big-btn");
        b.attr("data-name", cityLocal[i]);
        b.text(cityLocal[i]);
        $("#cityButtons").append(b);
    };
    console.log("city buttons added");
}


$("#submitButton").on("click", function(event){
    event.preventDefault();
    buttonRender();

    var cityInput = $("#cityName").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityInput + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(res) {
            // $("#current").text("");
            // $(".forecast").text("");
            cityLocal.push(cityInput);
            //Add data to local storage
            localStorage.setItem("cities", JSON.stringify(cityLocal));
            buttonRender();
            city = cityInput;

            $("#cityName, textarea").val("");
            currentWeather();
        })
        .catch(e => alert("Try another city!"));
});


$(document).on("click", "#cityButtons", function() {
    city = $(this).attr("data-name");
    currentWeather();
  });

// buttonRender();