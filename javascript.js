function Team(number, sct_score, score, test) {
    this.number = number || 0;
    this.sct_score = sct_score || 0;
    this.score = score || 0;
    this.test = test || 0;
}
function setUI(obj) {
    obj = obj || new Team();
    for (var key in obj) {
        if (key != Object.keys(obj)[0]) {
            if (obj.hasOwnProperty(key)) {
                if (!$("#" + key).length) {
                    var id = key;
                    var elmt = $("<span class='lable'>"+key+": </span><input id='"+key+"'  class='field'><br/>");
                    $("form").append(elmt);
                    $("#"+key).change(function(){
                        setTeamInfo($(this).attr("id"));
                    });
                }
                $("#"+key).val(obj[key]);
            }
        }
    }
}
function getUI(obj) {
    $(".field").each(function(){
        obj[$(this).attr("id")] = $(this).val();
    });
}
function setTeamInfo(valChanged) {
    var teamNumber = $("#number").val();
    getUI(team);
    $.ajax({
        url : 'php/getTeamInfo.php?q=' + teamNumber,
        type : 'GET',
        dataType : "json",
    }).done(function(data){
        var teamNumber = $("#number").val();
        var dataToSend = data;
        dataToSend[valChanged] = team[valChanged];
        team = dataToSend;
        setUI(team);
        $.ajax({
            url : 'php/setTeamInfo.php?q=' + teamNumber,
            type : 'POST',
            data : {data : JSON.stringify(dataToSend)}
        }).fail(function(){
            alert("An error has occurred!");
        }).done({
            
        });
    });
}
function setAllTeamInfo() {
    var teamNumber = $("#number").val();
    $.ajax({
        url : 'php/setTeamInfo.php?q=' + teamNumber,
        type : 'POST',
        data : {data : JSON.stringify(team)}
    }).fail(function(){
        alert("An error has occurred!");
    })
}
function getTeamInfo() {
    var teamNumber = $("#number").val();
    $.ajax({
        url : 'php/getTeamInfo.php?q=' + teamNumber,
        type : 'GET',
        dataType : "json",
    }).done(function(data){
        if (data.number === undefined) {
            alert("An error has occurred!");
        } else {
            team = data;
            setUI(team);
        }
    });
}
var team = new Team();