function MatchInfo(number) {
    this.match_number = number;
    this.name = "0";
    this.test1 = "0";
}
function Team(number, sct_score, score, test, test1, test2) {
    this.number = number || 0;
    this.sct_score = sct_score || 0;
    this.score = score || 0;
    this.test = test || 0;
    this.test1 = test1 || 0;
    this.test2 = test2 || 0;
    this.matches = [new MatchInfo(1), new MatchInfo(2)];
}
function setMatchList(matchList, obj) {
    obj = obj || new Team();
    baseObj = new Team();
    var matchSleceted = $("#"+matchList).val();
    $("#_"+matchList+" .matchAutoGen").remove();
    if (matchSleceted === "") {
        
    } else if (matchSleceted === "newMatch") {
        //OPEN CREATE NEW MATCH UI
        var elmtId = matchList + "_" + matchSleceted.toString() + "_" + "newMatchNumber";
        var elmt = $("<span class='matchLable autoGen matchAutoGen'>Match Number: </span><input id='"+elmtId+"' class='number matchField autoGen matchAutoGen' type='number'>");
        var sugMatchNumber = (parseInt(obj[matchList].length)+1);
        $("#_"+matchList).append(elmt);
        $("#"+elmtId).val(sugMatchNumber);
        $("#_"+matchList).append($("<input type='button' id='submit_"+matchList+"' class='autoGen matchAutoGen matchSubmit' value='Create Match'>"));
        $("#submit_"+matchList).click(function(){
            var matchNumber = parseInt($("#"+elmtId).val());
            var newMatch = new MatchInfo(matchNumber);
            obj[matchList][(matchNumber-1)] = newMatch;
            setTeamInfo(matchList, String(matchNumber-1));
        });
    } else {
        //OPEN SET MATCH UI
        for (var key in obj[matchList][(matchSleceted-1)]) {
            if (key != Object.keys(obj[matchList][(matchSleceted-1)])[0]) {
                var keyValue = obj[matchList][matchSleceted-1][key];
                var elmtId = matchList + "_" + matchSleceted.toString() + "_" + key;
                var elmt = $("<span class='matchLable autoGen matchAutoGen'>"+key.replace("_", " ")+": </span><textarea id='"+elmtId+"' class='matchField autoGen matchAutoGen'><textarea>");
                $("#_"+matchList).append(elmt);
                $("#"+elmtId).change(function(){
                    //setTeamInfo($(matchList).attr("id"));
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
        $("#_"+matchList).append($("<input type='button' id='submit_"+matchList+"' class='autoGen matchAutoGen matchSubmit' value='Submit Match'>"));
        $("#submit_"+matchList).click(function(){
            setTeamInfo(matchList, String(matchSleceted-1));
        });
        if(obj[matchList][(matchSleceted-1)][Object.keys(obj[matchList][(matchSleceted-1)])[0]] === obj[matchList].length) {
            $("#_"+matchList).append($("<input type='button' id='delete_"+matchList+"' class='autoGen matchAutoGen matchDelete' value='Delete Match'>"));
            $("#delete_"+matchList).click(function(){
                obj[matchList].splice((matchSleceted-1), 1);
                $("#"+matchList+" option[value='"+matchSleceted+"']").remove();
                $("#"+matchList).val("");
                setMatchList(matchList, matchSleceted);
                //setTeamInfo(matchList, matchSleceted);
            });
        }
    }
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
function setUI(obj) {
    obj = obj || new Team();
    var baseObj = new Team();
    if (obj[Object.keys(obj)[0]] === undefined || obj[Object.keys(obj)[0]] == 0) {
        deleteUI();
    } else {
        for (var key in obj) {
            if (key != Object.keys(obj)[0] && obj.hasOwnProperty(key)) {
                if (Array.isArray(obj[key])) {
                    $("#"+key).remove();
                    $("#"+key+"Span").remove();
                    $("#_"+key).remove();
                    $("#inputs").append("<div id='_"+key+"' class='matchDiv'></div>");
                    var elmt = $("<span id='"+key+"Span' class='lable autoGen'>"+key.replace("_", " ")+": </span><select id='"+key+"' class='matches autoGen'><option selected value> --- no match selected --- </option><option value='newMatch'>New Match</option></select>");
                    $("#_"+key).append(elmt);
                    var inArray = undefined;
                    forEachObject(obj[key], function(obj, i) {
                        var inKey = obj[Object.keys(obj)[0]];
                        var newOption = $("<option value='"+inKey+"'>Match: "+inKey+"</option>");
                        $("#"+key).append(newOption);
                    })
/*
                    for (inArray in obj[key]) {
                        var inKey = obj[key][inArray][Object.keys(obj[key][inArray])[0]];
                        var newOption = $("<option value='"+inKey+"'>Match: "+inKey+"</option>");
                        $("#"+key).append(newOption);
                    }
*/
                    $("#"+key).change(function(){
                        setMatchList($(this).attr("id"), obj);
                    });
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
                var elmtId = $(this).attr("id") + "_" + matchNumber + "_" + val;
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
function setTeamInfo(valChanged, valChangedInArray) {
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
        if (valChangedInArray !== undefined) {
            dataToSend[valChanged][valChangedInArray] = team[valChanged][valChangedInArray];
        } else {
            dataToSend[valChanged] = team[valChanged];
        }
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