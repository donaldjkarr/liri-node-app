var spotify = require('spotify');

var request = require("request");

var keys = require('./keys.js');

var Twitter = require('twitter');

var fs = require('fs');

var client = new Twitter(keys.twitterKeys);

var operator = process.argv[2];

var args = process.argv[3];

//OMDB Stuff
if (operator === "movie-this") {
    //run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + args + "&y=&plot=short&r=json", function (error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("\nReleased: " + JSON.parse(body).Year);
            console.log("\nIMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("\nCountry Produced: " + JSON.parse(body).Country);
            console.log("\nLanguage: " + JSON.parse(body).Language);
            console.log("\nPlot: " + JSON.parse(body).Plot);
            console.log("\nActors: " + JSON.parse(body).Actors);
            console.log("\nTomatometer: " + JSON.parse(body).Ratings[1].Value);
            console.log("\nRT URL: " + JSON.parse(body).Website);
        }
    });
}

//Spotify Stuff
if (operator === "spotify-this-song") {
    spotify.search({ type: 'track', query: args }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Preview: " + data.tracks.items[0].preview_url);
    });
}

//My Tweets yo
if (operator === "my-tweets") {
    var params = { screen_name: 'ireallycantcare', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (i = 0; i < tweets.length; i++) {
                console.log("Tweet # " + (i + 1) + " of 20");
                console.log("Tweet created at: " + tweets[i].created_at);
                console.log("Tweet: " + tweets[i].text);
                console.log("-------------------------");
            }
        }
    });
}

if (operator === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, text) {
        if (err) {
            return console.log(err);
        }
        // console.log(text);
        spotify.search({ type: 'track', query: text }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            // console.log(data);
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview: " + data.tracks.items[0].preview_url);
        });
    });
}



