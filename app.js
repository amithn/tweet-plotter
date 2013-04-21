  
/**    
 * Module dependencies.
 */

  var express = require('express');
  var app = express();
  var server = require('http').createServer(app)
  var io = require('socket.io').listen(server);
  var stylus = require('stylus');

  server.listen(3000);

  var TwitterEventStreamer = require('./twitter/twittereventstreamer');
  var Geocoder = require('./geocoder/geocoder');


  var winston = require('winston');
  var logger = new (winston.Logger)({
      transports: [new (winston.transports.Console)({ level: 'debug' })]
  })

  var tes = new TwitterEventStreamer();
  var geocoder = new Geocoder();

  tes.stream('love');
  var tweetcounter = 0;


  /* Stylus compile */
  function compile(str, path) {
     return stylus(str)
    .set('filename', path)
    .use(nib())
  }
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'sea-animal'}));
  app.use(express.static(__dirname + '/public'))
  app.use(stylus.middleware(
    { src: __dirname + '/public'
      , compile: compile
    }
  ))
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')


  app.get('/tweets', function(req , res){
	  var user = req.session.user || {};
	  res.render('tweets', {title: 'Tweets'});
  }); 
 
  var websocket = null;
  io.sockets.on('connection', function (socket) {
        websocket = socket;
  });
  
  tes.on('tweet', function(tweet) {
        console.log('Tweet [' + ++tweetcounter +  '] received from ' + tweet.user.name + ',' + 
                                   tweet.user.location); 
        console.log('Tweet looks like : %j',tweet);

        geocoder.geocode(tweet.user.location, function(err, geodata) {
            if(!err) {
                console.log('Tweet [' + ++tweetcounter +  '] received from ' + tweet.user.name + ',' + 
                                     tweet.user.location +  
                                     ' Lat :' + geodata.lat + 
                                     ' Lon :' + geodata.lon);
                ++tweetcounter;
                if(websocket !== null) {
                    websocket.emit('tweet', { user : tweet.user.name , text: tweet.text, lat: geodata.lat ,
                                                lon: geodata.lon , count : tweetcounter });
                }   
            } else {
                console.log('Could not resolve location for ' + tweet.user.location 
                                               + ' error was this %j', err);
            }
        });
  });         
