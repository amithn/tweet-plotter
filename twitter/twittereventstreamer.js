
    sys = require('sys');
    events = require('events');
    
    var twitter = require('ntwitter');
    
    function TwitterEventStreamer() {
        events.EventEmitter.call(this);
    }

    sys.inherits(TwitterEventStreamer, events.EventEmitter);

    TwitterEventStreamer.prototype.stream = function(keyword) {
        var self = this;
        
        var twit = new twitter({
            consumer_key: 'msSPQN41ry6Bmz1DWEQ',
            consumer_secret: 'XJgvlLNq0HZZ9T3g1a0MdoXnYqEg0hnArfUIgScbB0',
            access_token_key: '700581722-t3azV65w0ee8qlV7XCfP2ZY9FYTqHR6b0a9x24UV',
            access_token_secret: 'kwQESpfOa3gYqe8ZFaidYG2sKTcD5HAVyDY35J8'
        });
        
        counter = 0;
             
        twit.stream('statuses/filter',{track: keyword }, function(stream) {
                  stream.on('data', function(tweet) {
  //                      console.log('The [ ' + ++counter + ' ] tweet from ' + tweet.user.name + ' , '
    //                                            + tweet.user.location);
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
    
