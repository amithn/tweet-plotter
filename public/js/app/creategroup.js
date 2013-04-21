
function createGroupData(tableId) {
    $('#' + tableId +  ' tr.member').each(function(item, elem){
        var tds = $(elem).find('td'); 
        console.log(tds);
    });
}




$(document).ready(function(){
    $('#creategroupbtn').click(function() {
        var groupData = createGroupData('memberstbl');
        //sendData(groupData);    
    });

    $('#myTab a:first').tab('show');
});


