//Grabbing Data From Keys.js

// PACKAGE GRABBER =======================

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

// =======================================


//Get data from keys.js
var jsGrab = require('./keys.js');


//STEAL YO' STUFF BRO ====================

var tweetyKeys = jsGrab.twitterKeys;

var spotzKeys = jsGrab.spotifyKeys;

//========================================


//FOR PICKING YO' COMMAND=================
var commands = process.argv[2];
var input = process.argv[3];
//========================================

//Get Tweets

function getTweets() {
    
    var params = {screen_name: 'hotDogProvider', count: 20};
    
    var client = new Twitter(tweetyKeys);
    
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        
      if(!error){
          
          
          for(var i=0; i < tweets.length;i++){
              
              console.log("");
              console.log(tweets[i].text);
              console.log(tweets[i].created_at);
              console.log("");
              console.log("¬¬¬¬¬¬¬¬¬¬¬¬¬");
          }

          
      } else {
          
          console.log("Beep Bop: " + error);
          
      } 
          
    });
    
    
};
 
//Get Spotify Songs

function getSongs () {
     
    var spotify = new Spotify(spotzKeys);
 
    spotify.search({ type: 'track', query: input}, function(err, data) {
    if (err) {
        
        return console.log('Beep Bop: ' + err);
    }
 
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name); 
        console.log(data.tracks.items[0].album.name); 
        console.log(data.tracks.items[0].external_urls); 
});
    
}

//Get OMBD movies

function getMovies () {
   
    var nodeArgs = process.argv;


        var movieName = "";

        for (var i = 3; i < nodeArgs.length; i++) {

          if (i > 3 && i < nodeArgs.length) {

            movieName = movieName + "+" + nodeArgs[i];

          }

          else {

            movieName += nodeArgs[i];

          }
        }
    
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=40e9cece";
    

    request(queryURL, function(error, response, body) {

      // If the request is successful
          if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
            console.log("Tomato Meter: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plots: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
          }
        
    });
    
};

//Do-What-It-Says

function doWhatItSays (){
    
    var fs = require('fs');
    
    fs.readFile('random.txt', function(err,data){

        if(err){

            console.log("Beep Boop: " + err);

        }else{

            console.log(data.toString());
            

        }

    });
    
}
//Command For Picking Which Command

if (commands === "my-tweets"){
    
    console.log(getTweets());
    
}else if (commands === "spotify-this-song"){
    
    console.log(getSongs());
    
}else if (commands === "movie-this"){
    
    console.log(getMovies());
    
}else if (commands === "do-what-it-says"){
    
    console.log(doWhatItSays());
}




 
 // Default to Ace Of Base - Spotify
 // Default to Mr. Nobody - OMBD
