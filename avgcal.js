
    var should = require('should');

    function calculateRG(positive, negative) {
        var total  = positive + negative;
        var green = Math.round( (positive / total) * 255 );
        var red = Math.round( (negative / total ) * 255 );
        return {
            'positive' : green,
            'negative' : red
        }
    }


    describe('Score calculation tests', function(done) {
        it('Should return the right positive and negative socres' , function() {
             var result = calculateRG(10, 20);
             result.positive.should.equal(85);   
             result.negative.should.equal(170);   
        });
    });
