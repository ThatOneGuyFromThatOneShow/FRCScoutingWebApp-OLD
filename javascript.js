function Team(number, sct_score, score, test, test1, test2) {
    this.number = number || 0;
    this.sct_score = sct_score || 0;
    this.score = score || 0;
    this.test = test || 0;
    this.test1 = test1 || 0;
    this.test2 = test2 || 0;
    this.matches = [
        {
            id: "1",
            name: "Match info 1"
        },
        {
            id: "2",
            name: "Match info 2"
        }
    ];
}
function matchInfo() {
    
}
function setMatchList(matchList) {
    var matchSleceted = $("#"+matchList).val();
    if(matchSleceted == "newMatch") {
        //OPEN CREATE NEW MATCH UI
        alert("");
    } else {
        //OPEN SET MATCH UI
        alert("");
    }
}
function setUI(obj) {
    obj = obj || new Team();
    var baseObj = new Team();
    obj.matches = baseObj.matches;
    if (obj[Object.keys(obj)[0]] === undefined || obj[Object.keys(obj)[0]] == 0) {
        deleteUI();
    } else {
        for (var key in baseObj) {
            if (key != Object.keys(baseObj)[0] && baseObj.hasOwnProperty(key)) {
                if (Array.isArray(baseObj[key])) {
                    if (!$("#" + key).length) {
                        var id = key;
                        var elmt = $("<span class='lable autoGen'>"+key.replace("_", " ")+": </span><select id='"+key+"' class='matches autoGen'><option disabled selected value> -- select an option -- </option><option value='newMatch'>New Match</option></select>");
                        $("#inputs").append(elmt);
                        for (var inArray in obj[key]) {
                            var inKey = obj[key][inArray][Object.keys(obj[key][inArray])[0]];
                            alert(inKey);
                            var newOption = $("<option value='"+inKey+"'>Match: "+inKey+"</option>");
                            $("#"+key).append(newOption);
                        }
                        $("#"+key).change(function(){
                            setMatchList($(this).attr("id"));
                        });
                    }
                } else {
                    if (!$("#" + key).length) {
                        var id = key;
                        var elmt = $("<span class='lable autoGen'>"+key.replace("_", " ")+": </span><textarea id='"+key+"' class='field autoGen' />");
                        $("#inputs").append(elmt);
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