  
/**    
 * Module dependencies.
 */

  var express = require('express');
  var app = express();
  var server = require('http').createServer(app)
  var io = require('socket.io').listen(server);
  var stylus = require('stylus');
  var sentiment = require('sentiment');  


  server.listen(3000);

  var TwitterEventStreamer = require('./twitter/twittereventstreamer');
  var Geocoder = require('./geocoder/geocoder');


  var winston = require('winston');
  var logger = new (winston.Logger)({
      transports: [new (winston.transports.Console)({ level: 'debug' })]
  })

  var tes = new TwitterEventStreamer();
  var geocoder = new Geocoder();

  tes.stream('Obama');
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
  
  var failedLookUps = 0;
  
  var positive = 0;
  var negative = 0;

  tes.on('tweet', function(tweet) {
        ++tweetcounter;
        logger.debug('Tweet [' + tweetcounter +  '] received from ' + tweet.user.name + ',' + 
                                   tweet.user.location); 

        sentiment(tweet.text, function(err, results) {
            console.log('Score is ' + results.score);
            if(results.score > 0 ) {
                positive++;
            } else {
                negative++;
            }

            score = calculateRG(positive, negative);
            console.log('Positive - ' + score.positive + ' Negative ' + score.negative);

            geocoder.geocode(tweet.user.location, function(err, geodata) {
                if(!err) {
                    logger.debug('Tweet [' + tweetcounter +  '] received from ' + tweet.user.name + ',' + 
                                     tweet.user.location +  
                                     ' Lat :' + geodata.lat + 
                                     ' Lon :' + geodata.lon);
                    if(websocket !== null) {
                        websocket.emit('tweet', { user : tweet.user.name , text: tweet.text, lat: geodata.lat ,
                                                profileImage : tweet.user.profile_image_url,
                                                lon: geodata.lon , count : tweetcounter, 
                                                failedLookUps: failedLookUps,
						                        positive: score.positive,
						                        negative: score.negative
                                            });
                    }   
                } else {
                    logger.debug('Could not resolve location for ' + tweet.user.location 
                                               + ' error was this %j', err);
                    failedLookUps++;
                    }
           });
      });
  });
  
           
  function calculateRG(positive, negative) {
    var total  = positive + negative;
    var green = Math.round( (positive / total) * 255 );
    var red = Math.round( (negative / total ) * 255 );
    return {
        'positive' : green,
        'negative' : red
    }
  }
