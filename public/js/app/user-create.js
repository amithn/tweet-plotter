

$(document).ready(function() {
    $('#myTab a:first').tab('show');
    $('#single-user-submit').click(function() {
          $('#single-add-status-message').empty();
          post('/create/user', $('#single-user-create').serialize(),onResponse);  
          return false;
    });
});

function post(url, data, onResponse) {
    $.post(url, data)
    .done(function(data) {
        onResponse(data);
    })
    .fail(function(data) {
        onResponse(data);
    });
}

function onResponse(data) {
    $('#single-add-status-message').removeClass();

    if(data.result === 'Success') {
        $('#single-add-status-message').html('<p>' + data.message  + '</p>');
        $('#single-add-status-message').addClass('alert alert-success');
    } else {
        $('#single-add-status-message').html('<p>' + data.message +  '</p>');
        $('#single-add-status-message').addClass('alert alert-error');
    }
}
