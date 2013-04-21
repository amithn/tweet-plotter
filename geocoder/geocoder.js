
    var geocoder = require('geocoder');

    function GeoCoder() {

    }

    GeoCoder.prototype.geocode = function(address, callback) {
        geocoder.geocode(address, function(err, geodata) {
            if(!err) {
                if( geodata.results.length >= 1 ) {
                    var latlang = {};
                    latlang.lat = geodata.results[0].geometry.location.lat;
                    latlang.lon = geodata.results[0].geometry.location.lng;
                    callback(null, latlang);
                } else {
                    return; // controversial?
                }
            } else {
                  callback(err,null);           
            }   
        });
    }

    module.exports = GeoCoder;
