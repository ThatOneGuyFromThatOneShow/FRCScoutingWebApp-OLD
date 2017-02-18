function MatchInfo(number) {
    this.match_number = number;
    this.points = "";
    this.notes = "";
}
function Team(number, ball_shooting, ball_dumping, gear_colection, notes) {
    this.number = number || 0;
    this.ball_shooting = ball_shooting || "";
    this.ball_dumping = ball_dumping || "";
    this.gear_colection = gear_colection || "";
    this.notes = notes || "";
    this.matches = [];
}
function arrayLengthWithoutNull(array) {
    var length = 0;
    for (var i=0; i<array.length; i++) {
        if (array[i])
            length++;
    }
    return length;
}
function forEachObject(array, callback) {
    if (!array || !callback)
        return;
    for(var i=0; i<array.length; i++) {
        var obj = array[i];
        if (obj)
            callback(obj, i);
    }
}
function setMatchList(matchList, obj) {
    obj = obj || new Team();
    baseObj = new Team();
    var matchSelected = $("#"+matchList).val();
    $("#_"+matchList+" .matchAutoGen").remove();
    if (matchSelected === "") {
        
    } else if (matchSelected === "newMatch") {
        //OPEN CREATE NEW MATCH UI
        var elmtId = matchList + "-" + matchSelected.toString() + "-" + "newMatchNumber";
        var elmt = $("<span class='matchLable autoGen matchAutoGen'>Match Number: </span><input id='"+elmtId+"' class='number matchField autoGen matchAutoGen' type='number'>");
        var sugMatchNumber = (arrayLengthWithoutNull(obj[matchList])+1);
        $("#_"+matchList).append(elmt);
        $("#"+elmtId).val(sugMatchNumber);
        $("#_"+matchList).append($("<input type='button' id='submit_"+matchList+"' class='autoGen matchAutoGen matchCreate' value='Create Match'>"));
        $("#submit_"+matchList).click(function(){
            var matchNumber = parseInt($("#"+elmtId).val());
            //alert(obj[matchList][matchNumber-1]);
            if (obj[matchList][matchNumber-1] === null || obj[matchList][matchNumber-1] === undefined) {
                var newMatch = new MatchInfo(matchNumber);
                obj[matchList][(matchNumber-1)] = newMatch;
                setTeamInfo(matchList, (matchNumber-1));
            } else {
                alert("Match already exists!");
            }
        });
    } else {
        //OPEN SET MATCH UI
        for (var key in obj[matchList][(matchSelected-1)]) {
            if (key != Object.keys(obj[matchList][(matchSelected-1)])[0]) {
                var thisKey = key;
                var keyValue = obj[matchList][matchSelected-1][key];
                var elmtId = matchList + "-" + matchSelected.toString() + "-" + key;
                var elmt = $("<span class='matchLable autoGen matchAutoGen'>"+key.replace("_", " ")+": </span><textarea id='"+elmtId+"' class='matchField autoGen matchAutoGen'><textarea>");
                $("#_"+matchList).append(elmt);
                $("#"+elmtId).change(function(){
                    var valId = $(this).prop("id");
                    valId = valId.substring(valId.lastIndexOf("-")+1);
                    setTeamInfo(matchList, parseInt(matchSelected)-1, valId);
                });
                $("#"+elmtId).keydown(function(){
                    $(this).height(0);
                    $(this).height($(this)[0].scrollHeight);
                });
                $("#"+elmtId).val(keyValue);
                $("#"+elmtId).height(0);
                $("#"+elmtId).height($("#"+elmtId)[0].scrollHeight);
            }
        }
        $("#_"+matchList).append($("<button id='delete_"+matchList+"' class='autoGen matchAutoGen matchDelete'>Delete Match</button>"));
        $("#delete_"+matchList).click(function(){
            if(confirm("You are about to delete all the data for match: "+matchSelected+".\nAre you sure you would like to continue?")){
                delete obj[matchList][matchSelected-1];
                $("#"+matchList+" option[value='"+matchSelected+"']").remove();
                $("#"+matchList).val("");
                setMatchList(matchList, matchSelected);
                setTeamInfo(matchList, (matchSelected-1));
            }
        });
        $("#_"+matchList).append($("<button id='submit_"+matchList+"' class='autoGen matchAutoGen matchSubmit'>Submit Match</button>"));
        $("#submit_"+matchList).click(function(){
            setTeamInfo(matchList, String(matchSelected-1));
        });
    }
}
function setUI(obj, dontRebuildArray) {
    obj = obj || new Team();
    var baseObj = new Team();
    if (obj[Object.keys(obj)[0]] === undefined || obj[Object.keys(obj)[0]] == 0) {
        deleteUI();
    } else {
        for (var key in obj) {
            if (key != Object.keys(obj)[0] && obj.hasOwnProperty(key)) {
                if (Array.isArray(obj[key])) {
                    if(!dontRebuildArray) {
                        $("#"+key).remove();
                        $("#"+key+"Span").remove();
                        $("#_"+key).remove();
                        $("#inputs").append("<div id='_"+key+"' class='matchDiv'></div>");
                        var elmt = $("<span id='"+key+"Span' class='lable autoGen'>"+key.replace("_", " ")+": </span><select id='"+key+"' class='matches autoGen'><option selected value> --- no match selected --- </option><option value='newMatch'>New Match</option></select>");
                        $("#_"+key).append(elmt);
                        forEachObject(obj[key], function(obj, i) {
                            var inKey = obj[Object.keys(obj)[0]];
                            var newOption = $("<option value='"+inKey+"'>Match: "+inKey+"</option>");
                            $("#"+key).append(newOption);
                        });
                        $("#"+key).change(function(){
                            setMatchList($(this).attr("id"), obj);
                        });
                    } else {
                        var matchList = key;
                        var matchSelected = $("#"+key).val();
                        for (var inObj in obj[matchList][matchSelected-1]) {
                            var elmtId = matchList + "-" + matchSelected + "-" + inObj;
                            var keyValue = obj[matchList][matchSelected-1][inObj];
                            $("#"+elmtId).val(keyValue);
                        }
                    }
                } else {
                    if (!$("#" + key).length) {
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
    $(".matches").each(function(){
        for (var key in obj[$(this).attr("id")]) {
            for (var val in obj[$(this).attr("id")][key]) {
                var matchNumber = parseInt(key) + 1;
                var elmtId = $(this).attr("id") + "-" + matchNumber + "-" + val;
                //alert(elmtId+"\n"+$("#"+elmtId).val());
                if ($("#"+elmtId).val() !== undefined) {
                    obj[$(this).attr("id")][key][val] = $("#"+elmtId).val();
                }
            }
        }
    });
}
function deleteUI() {
    $(".autoGen").remove();
    $(".matchDiv").remove();
}
function setTeamInfo(valChanged, valChangedInArray, matchValChanged) {
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
        if (matchValChanged !== undefined) {
            dataToSend[valChanged][valChangedInArray][matchValChanged] = team[valChanged][valChangedInArray][matchValChanged];
            team = dataToSend;
            setUI(team, true);
        } else if (valChangedInArray !== undefined) {
            dataToSend[valChanged][valChangedInArray] = team[valChanged][valChangedInArray];
            team = dataToSend;
            setUI(team);
        } else {
            dataToSend[valChanged] = team[valChanged];
            team = dataToSend;
            setUI(team);
        }
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