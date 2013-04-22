

    TwitterCredentials = function(){
            
            var secret = { 
                consumer_key : 'msSPQN41ry6Bmz1DWEQ',
                consumer_secret: 'XJgvlLNq0HZZ9T3g1a0MdoXnYqEg0hnArfUIgScbB0',
                access_token_key: '700581722-t3azV65w0ee8qlV7XCfP2ZY9FYTqHR6b0a9x24UV',
                access_token_secret: 'kwQESpfOa3gYqe8ZFaidYG2sKTcD5HAVyDY35J8'
            };

             function getConsumerKry() {
                 return secret.consumer_key; 
             }

             function getConsumerSecret() {
                 return secret.consumer_secret;
             }

             function getAccessTokenKey() {
                 return secret.access_token_key;
             }

             function getAccessTokenSecret() {
                return access_token_secret;
             }

             function _getSecrets() {
                 return secret;
             }

             return {
                getSecrets: _getSecrets
             }
    };

    module.exports = TwitterCredentials;
