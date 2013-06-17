

    var sentiment = require('sentiment');


    sentiment('what is it that you are looking for is not good', function(err, result) {
        console.log('Result is %j', result);
    });
