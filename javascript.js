function Team(number, sct_score, score, test, test1) {
    this.number = number || 0;
    this.sct_score = sct_score || 0;
    this.score = score || 0;
    this.test = test || 0;
    this.test1 = test1 || 0;
}
function setUI(obj) {
    obj = obj || new Team();
    var baseObj = new Team();
    if (obj[Object.keys(obj)[0]] === undefined || obj[Object.keys(obj)[0]] == 0) {
        deleteUI();
    } else {
        for (var key in baseObj) {
            if (key != Object.keys(baseObj)[0] && baseObj.hasOwnProperty(key)) {
                if (!$("#" + key).length) {
                    var id = key;
                    var elmt = $("<span class='lable autoGen'>"+key+": </span><textarea id='"+key+"' class='field autoGen'>");
                    $("form").append(elmt);
                    $("#"+key).change(function(){
                        setTeamInfo($(this).attr("id"));
                    });
                    $("#"+key).keydown(function(){
                        $(this).height(0);
                        $(this).height($(this)[0].scrollHeight);
                    });
                }
                $("#"+key).val(obj[key]);
                $("#"+key).height(0);
                $("#"+key).height($("#"+key)[0].scrollHeight);
            }
        }
    }
}
function getUI(obj) {
        $(".field").each(function(){
        obj[$(this).attr("id")] = $(this).val();
    });
}
function deleteUI() {
    $(".autoGen").remove();
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
        dataToSend.number = teamNumber;
        dataToSend[valChanged] = team[valChanged];
        team = dataToSend;
        setUI(team);
        $.ajax({
            url : 'php/setTeamInfo.php?q=' + teamNumber,
            type : 'POST',
            data : {data : JSON.stringify(dataToSend)}
        }).fail(function(){
            alert("An error has occurred!");
        })
    }).fail(function(){
        var teamNumber = $("#number").val();
        var dataToSend = team;
        dataToSend.number = teamNumber;
        $.ajax({
            url : 'php/setTeamInfo.php?q=' + teamNumber,
            type : 'POST',
            data : {data : JSON.stringify(dataToSend)}
        }).fail(function(){
            alert("An error has occurred!");
        })
    });
}
function setAllTeamInfo() {
    var teamNumber = $("#number").val();
    var dataToSend = team;
    dataToSend.number = teamNumber;
    if (teamNumber != undefined && teamNumber != 0) {
        $.ajax({
            url : 'php/setTeamInfo.php?q=' + teamNumber,
            type : 'POST',
            data : {data : JSON.stringify(dataToSend)}
        }).fail(function(){
            alert("An error has occurred!");
        });
    }
}
function getTeamInfo() {
    var teamNumber = $("#number").val();
    $.ajax({
        url : 'php/getTeamInfo.php?q=' + teamNumber,
        type : 'GET',
        dataType : "json",
    }).done(function(data){
        team = data;
        setUI(team);
    }).fail(function(){
        team = new Team(teamNumber);
        setUI(team);
    });
}
var team = new Team();