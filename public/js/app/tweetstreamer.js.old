    
    
     var map;
     function initialize() {
            var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
            var mapOptions = {
              center: new google.maps.LatLng(-34.397, 150.644),
              zoom: 2,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
     }
    
    $(document).ready(function() {
        var socket = io.connect('http://localhost:3000');
        socket.on('tweet', function (tweet) {
             console.log(tweet);
             //var row = '<tr><td>' + tweet.user + '</td><td>' + tweet.text + '</td></th>';
             
             /*if( $('#tweets tr').size() > 8) {
                $('#tweets tr:last').fadeOut(500,function(row) {
                    $('#tweets tr:last').remove();    
                    $('#tweets tr:first').after(row);             
                    $('#tweetcount').html(tweet.count);             
                 });
               } else {
                    $('#tweets tr:first').after(row);             
                    $('#tweetcount').html(tweet.count);             
              } */

            var tweetLatLon = new google.maps.LatLng(tweet.lat, tweet.lon);     
            
            var infoWindowText = '<div id="content">' + 
                                 '<div id="bodyContent">' + 
                                 '<img src=' +  tweet.profileImage + ' /></br>' + 
                                 tweet.text +    
                                 '</div>' + 
                                 '</div>';
            
            var infowindow = new google.maps.InfoWindow({
                     content: infoWindowText,
                     maxWidth: 200
            });


            var marker = new google.maps.Marker({
                            position: tweetLatLon,
                            map: map,
                            title: '@' + tweet.user,
                            animation: google.maps.Animation.DROP
            });
            
            google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map,marker);
            });
            $('#tweetcount').html(tweet.count);             
            $('#failed-lookups').html(tweet.failedLookUps);             
        });
            google.maps.event.addDomListener(window, 'load', initialize);
   });    
        
