    
    sys = require('sys');
    events = require('events');
    
    require('./credentials');

    var twitter = require('ntwitter');
    
    function TwitterEventStreamer() {
        events.EventEmitter.call(this);
    }

    sys.inherits(TwitterEventStreamer, events.EventEmitter);

    TwitterEventStreamer.prototype.stream = function(keyword) {
        var self = this;
        
        var twitterCredentials = new TwitterCredentials(); 
        var twit = new twitter(twitterCredentials.getSecrets());

        counter = 0;
             
        twit.stream('statuses/filter',{track: keyword }, function(stream) {
                  stream.on('data', function(tweet) {
                        self.emit('tweet', tweet);
                  });
                  
                  stream.on('error', function(error,statusCode) {
                        console.log('Error was this %j', error);
                        console.log('Error was this ' + statusCode);
                        self.emit('error','Error occured on Twitter maybe?');
                  });
            }
        );
    }
    module.exports = TwitterEventStreamer;
    
