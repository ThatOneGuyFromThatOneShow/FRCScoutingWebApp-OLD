function Team(number, sct_score, score, test) {
    this.number = number;
    this.sct_score = sct_score;
    this.score = score;
    this.test = test;
}
function setUI(obj) {
    if (obj == undefined) {
        obj = new Team();
    }
    for (var key in obj) {
        if (key != Object.keys(obj)[0]) {
            if (team.hasOwnProperty(key)) {
                if (!$("#" + key).length) {
                    //CREATE NEW UI
                    var elmt = $("<span class='lable'>"+key+": </span><input id='"+key+"'  class='field' type='number'><br/>");
                    $("#teamInfoForm").append(elmt);
                }
                //REFRESH UI
                $("#"+key).val(team[key]);
            }
        }
    }
}
function setTeamInfo () {
    var teamNumber = $("#number").val();
    $.ajax({
        url : 'php/setTeamInfo.php?q=' + teamNumber,
        type : 'POST',
        data : {data : JSON.stringify(team)}
    }).fail(function(){
        alert("error");
    }).done(function(){
        alert("completed");
    });
}
function getTeamInfo () {
    var teamNumber = $("#number").val();
    $.ajax({
        url : 'php/getTeamInfo.php?q=' + teamNumber,
        type : 'GET',
        dataType : "json",
    }).done(function(data){
        if (data.number == undefined) {
            alert("Team does not exist");
        } else {
            team = data;
            setUI(team);
        }
    });
}

var team = new Team(4931);
alert(JSON.stringify(team));

function setHeader() {
    document.getElementById("header").innerHTML = "Hello World";
}