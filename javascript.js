/* TODO:
* Add Support for radio buttons (Add to main selection, match, and sorting function)
* DOCUMENT CODE!!!
*
* Redo UI on sorting page
*  (completey remake generation of sorting page)
*/

function MatchInfo(number) {
    this.match_number__num = number;
    this.auto__title = "Autonomous: "
    this.Scored_In_Switch__bool = false;
    this.Scored_In_Scale__bool = false;
    this.Scored_In_Portal__bool = false;
    this.Crossed_Line__bool = false;
    this.teleop__title = "Teleop: ";
    this.Blocks_In_Alliance_Switch__num = 0;
    this.Blocks_In_Opponent_Scale__num = 0;
    this.Blocks_In_Opponent_Switch__num = 0;
    this.Blocks_In_Portal__num = 0;
    this.endgame__title = "End Game:";
    this.Hung__bool = false;
    this.Raised_Others__bool = false;
    this.other_result__title = "Result: ";
    this.Won__bool = false;
    this.Total_Score__num = 0;
    this.other__title = "Other: ";
    this.Notes = "";
}
function Team(number) {
    this.number = number || 0;
    this.auto__title = "Autonomous: ";
    this.Crosses_Line__bool = false;
    this.Scores_Block_Switch__bool = false;
    this.Scores_Block_Scale__bool = false;
    this.Scores_Block_Portal__bool = false;
    this.teleop__title = "Teleop: ";
    this.Blocks_In_Alliance_Switch__bool = false;
    this.Blocks_In_Scale__bool = false;
    this.Blocks_In_Opponent_Switch__bool = false;
    this.Blocks_In_Portal__bool = false;
    this.endgame__title = "End Game: ";
    this.Hang__bool = false;
    this.Can_Raise_Others__bool = false;
    this.other__title = "Other: ";
    this.Notes = "";
    this.Matches__match = [];
}
//Returns length of array excluding  null values
function arrayLengthWithoutNull(array) {
    var length = 0;
    for (var i=0; i<array.length; i++) {
        if (array[i])
            length++;
    }
    return length;
}
//Runs callback with the object inside array and the index of the object, for each element in array. (Custom for in loop that doesn't break when it hits a  null value)
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
        $("#_"+matchList).append($("<button id='submit_"+matchList+"' class='autoGen matchAutoGen matchCreate'>Create Match</button>"));
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
                var elmt;
                if (key.endsWith("__bool")) {
                    var elmtName = key.replace("__bool", "");
                    elmtName = elmtName.replace(/_/g, " ");
                    elmt = $("<span class='matchLable autoGen matchAutoGen'>"+elmtName+": </span><input id='"+elmtId+"' class='matchField autoGen matchAutoGen' type='checkbox' >");
                } else if (key.endsWith("__num")) {
                    var elmtName = key.replace("__num", "");
                    elmtName = elmtName.replace(/_/g, " ");
                    elmt = $("<span class='matchLable autoGen matchAutoGen numLable'>"+elmtName+": </span><input id='"+elmtId+"' class='matchField autoGen matchAutoGen' type='number' >");
                } else if (key.endsWith("__title")) {
                    elmt = $("<span class='title autoGen matchAutoGen'><h2 class='titleText' id='"+elmtId+"'>"+keyValue+"</h2></span>");
                } else {
                    elmt = $("<span class='matchLable autoGen matchAutoGen textLable'>"+key.replace(/_/g, " ")+": </span><textarea id='"+elmtId+"' class='matchField autoGen matchAutoGen'><textarea>");
                    elmt.keydown(function(){
                        $(this).height(0);
                        $(this).height($(this)[0].scrollHeight);
                    });
                }
                $("#_"+matchList).append(elmt);
                if (!key.endsWith("__title")) {
                    $("#"+elmtId).change(function(){
                        var valId = $(this).prop("id");
                        valId = valId.substring(valId.lastIndexOf("-")+1);
                        setTeamInfo(matchList, parseInt(matchSelected)-1, valId);
                    });
                    }
                
                if (key.endsWith("__num")) {
                    $("#"+elmtId).val(parseInt(keyValue));
                } else if (key.endsWith("__bool")) {
                    $("#"+elmtId).prop("checked", keyValue);
                } else if (key.endsWith("__title")) {
                    //Do nothing
                } else {
                    $("#"+elmtId).val(keyValue);
                    $("#"+elmtId).height(0);
                    $("#"+elmtId).height($("#"+elmtId)[0].scrollHeight);
                }
                
//                $("#"+elmtId).val(keyValue);
//                $("#"+elmtId).height(0);
//                $("#"+elmtId).height($("#"+elmtId)[0].scrollHeight);
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
                if (Array.isArray(obj[key]) && key.endsWith("__match")) {
                    if(!dontRebuildArray) {
                        $("#"+key).remove();
                        $("#"+key+"Span").remove();
                        $("#_"+key).remove();
                        $("#inputs").append("<div id='_"+key+"' class='matchDiv'></div>");
                        var elmt = $("<span id='"+key+"Span' class='lable autoGen'>"+key.replace("__match", "").replace(/_/g, " ")+": </span><select id='"+key+"' class='matches autoGen'><option selected value> --- no match selected --- </option><option value='newMatch'>New Match</option></select>");
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
                        var elmt;
                        var elmtType = "";
                        if (key.endsWith("__num")) {
                            var elmtName = key.replace("__num", "");
                            elmtName = elmtName.replace(/_/g, " ");
                            elmt = $("<span class='lable autoGen numLable'>"+elmtName+": </span><input id='"+key+"' class='field autoGen' type='number' >");
                        } else if (key.endsWith("__bool")) {
                            var elmtName = key.replace("__bool", "");
                            elmtName = elmtName.replace(/_/g, " ");
                            elmt = $("<span class='lable autoGen'>"+elmtName+": </span><input id='"+key+"' class='field autoGen' type='checkbox' >");
                        } else if (key.endsWith("__title")) {
                            elmt = $("<span class='title autoGen'><h2 class='titleText' id='"+key+"'>"+obj[key]+"</h2></span>");
                        } else {
                            var elmtName = key.replace(/_/g, " ");
                            var elmt = $("<span class='lable autoGen textLable'>"+elmtName+": </span><textarea id='"+key+"' class='field autoGen' />");
                            elmt.keydown(function(){
                                $(this).height(0);
                                $(this).height($(this)[0].scrollHeight);
                            });
                        }
                        $("#inputs").append(elmt);
                        if (!key.endsWith("__title")) {
                            $("#"+key).change(function(){
                                setTeamInfo($(this).attr("id"));
                            });
                        }
                    }
                    if (key == Object.keys(obj)[0]) {
                        $("#"+key).val(parseInt(obj[key]));
                    } else if (key.endsWith("__num")) {
                        $("#"+key).val(parseInt(obj[key]));
                    } else if (key.endsWith("__bool")) {
                        $("#"+key).prop("checked", obj[key]);
                    } else if (key.endsWith("__title")) {
                        //Do nothing
                    } else {
                        $("#"+key).val(obj[key]);
                        $("#"+key).height(0);
                        $("#"+key).height($("#"+key)[0].scrollHeight);
                    }
                }
            }
        }
    }
}
function getUI(obj) {
    $(".field").each(function(){
        var elmtId = $(this).attr("id");
        if (elmtId == Object.keys(obj)[0]) {
            obj[$(this).attr("id")] = parseInt($(this).val());
        } else if (elmtId.endsWith("__bool")) {
            obj[$(this).attr("id")] = $(this).prop("checked");
        } else if (elmtId.endsWith("__num")) {
            obj[$(this).attr("id")] = parseInt($(this).val());
        } else {
            obj[$(this).attr("id")] = $(this).val();
        }
    });
    $(".matches").each(function(){
        //alert();
        for (var key in obj[$(this).attr("id")]) {
            for (var val in obj[$(this).attr("id")][key]) {
                var matchNumber = parseInt(key) + 1;
                var elmtId = $(this).attr("id") + "-" + matchNumber + "-" + val;
                //alert(elmtId+"\n"+$("#"+elmtId).val());
                if ($("#"+elmtId).val() !== undefined) {
                    if (elmtId.endsWith("__bool")) {
                        obj[$(this).attr("id")][key][val] = $("#"+elmtId).prop("checked");
                    } else if (elmtId.endsWith("__num")) {
                        obj[$(this).attr("id")][key][val] = parseInt($("#"+elmtId).val());
                    } else {
                        obj[$(this).attr("id")][key][val] = $("#"+elmtId).val();
                    }
                }
            }
        }
    });
}
function deleteUI() {
    $(".aGen").remove();
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
        dataToSend.number = parseInt(teamNumber);
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
        setUI(team);
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
    dataToSend.number = parseInt(teamNumber);
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
function getAllTeamInfo(callback) {
    $.ajax({
        url : 'php/getAllTeams.php',
        type : 'GET',
        dataType : "json",
    }).done(function(data){
        callback(data);
    }
    ).fail(function(){
        alert("An error has occurred!");
    });
}
function sortMatches(arr, valPath, valArgs) {
    /*
    To sort matches use an array of the field and match field to sort. Ex: ["matches__match", "match_number__num"]
    Sort options are seperated by a -- you can use avg, sLow, and sHigh. Ex: avg--sLow
    */
    var makeAvg = [];
    var sortHigh = [];
    
    if (valArgs === undefined) {
        valArgs = Array(valPath.length);
    }
    for (key in valPath) {
        if (valArgs[key] === undefined)
            valArgs[key] = "";
    }
    for (key in valArgs) {
        if (Array.isArray(valArgs[key])) {
            sortHigh[key] = valArgs[key][0];
            makeAvg[key] = valArgs[key][1];
        } else {
            makeAvg[key] = false;
            sortHigh[key] = true;
            var args = valArgs[key].split("--");
            for (argKey in args) {
                if (valArgs[key] == "avg") {
                    makeAvg[key] = true;
                } else if (valArgs[key] == "sLow") {
                    sortHigh[key] = false;
                } else if (valArgs[key] == "sHigh") {
                    sortHigh[key] = true;
                }
            }
        }
    }
    arr.sort(function(a, b){
        //DEFINE Vars
        var aVal = 0;
        var bVal = 0;
        var toReturn = 0;
        
        //Loop through matches and save best/avg value
        for (i in valPath) {
            if (Array.isArray(valPath[i])) {
                for (key in a[valPath[i][0]]) {
                    //alert(key);
                    //alert(valPath[i][0]);
                    if (makeAvg[i]) {
                        aVal += a[valPath[i][0]][key][[valPath[i][1]]];
                    } else if (a[valPath[i][0]][key][[valPath[i][1]]] > aVal) {
                        aVal = a[valPath[i][0]][key][[valPath[i][1]]];
                    }
                }
                for (key in b[valPath[i][0]]) {
                    if (makeAvg[i]) {
                        bVal += b[valPath[i][0]][key][[valPath[i][1]]];
                    } else if (b[valPath[i][0]][key][[valPath[i][1]]] > bVal) {
                        bVal = b[valPath[i][0]][key][[valPath[i][1]]];
                    }
                }
                if (makeAvg[i]) {
                    aVal = aVal / (a[valPath[i][0]].length);
                    bVal = bVal / (b[valPath[i][0]].length);
                }
            } else {
                aVal = a[valPath[i]];
                bVal = b[valPath[i]];
            }
            if (typeof a === "booleon") {
                if (aVal == true && bVal == true)
                    toReturn = 0;
                else if (aVal == false && bVal == false)
                    toReturn = 0;
                else if (aVal == true && bVal == false)
                    toReturn = (sortHigh[i]) ? -1 : 1;
                else if (aVal == false && bVal == true)
                    toReturn = (sortHigh[i]) ? 1 : -1;
            } else {
                toReturn = (sortHigh[i]) ? bVal - aVal : aVal - bVal;
            }
            if (toReturn != 0)
                break;
        }
        //DEFAULT SORT CASE (if all sorts are tied OR no sort options were passed in)
        if (toReturn == 0) {
            aVal = a["number"];
            bVal = b["number"];
            toReturn = (aVal - bVal);
        }
        //alert(toReturn);
        return toReturn;
    });
    return(arr);
}
function createNewSortArgs() {
    $("#sortingPaths").append($("<div style='display: inline-block; padding-right: 20px;' id='sortSpan"+sortingPaths.length+"' style='padding: 5px;'></div>"));
    $("#sortSpan"+sortingPaths.length).append($("<div><span style='padding-right: 30px; padding-left: 8px;' >Low: <input type=checkbox id='sortLow"+sortingPaths.length+"'></span><span>Average: <input type=checkbox id='sortAvg"+sortingPaths.length+"'></spam></div>"));
    $("#sortLow"+sortingPaths.length).change(function(){
        var tmpId = $(this).attr("id").replace("sortLow", "");
        sortingArgs[tmpId][0] = !$(this).prop("checked");
        //alert(sortingArgs[tmpId]);
    });
    $("#sortAvg"+sortingPaths.length).change(function(){
        var tmpId = $(this).attr("id").replace("sortAvg", "");
        sortingArgs[tmpId][1] = $(this).prop("checked");
        //alert(sortingArgs[tmpId]);
    });
    sortingArgs[sortingPaths.length] = [true, true];
    //alert(JSON.stringify(sortingArgs));
    
    $("#sortSpan"+sortingPaths.length).append($("<div><select class='sortDropdown' id='sortOpt"+sortingPaths.length+"' ><option selected> --- select option to sort --- </option></select></div>"));
    for (key in team) {
        if (!key.endsWith("__title")) {
            var displayName = key;
            if (displayName.includes("__"))
                displayName = displayName.replace(displayName.substring(displayName.indexOf("__")), "");
            displayName = displayName.replace(/_/g, " ");
            $("#sortOpt"+sortingPaths.length).append($("<option value='"+key+"'>"+displayName+"</option>"));
        }
    };
    $("#sortOpt"+sortingPaths.length).change(function(){
        var tmpId = $(this).attr("id").replace("sortOpt", "");
        var oldValue = sortingPaths[tmpId] || "";
        var newValue = $(this).val();
        sortingPaths[tmpId] = newValue;

        if (Array.isArray(oldValue)) {
            //alert();
            $("#matchVal"+tmpId).remove();
        }
        if (Array.isArray(team[newValue])) {
            $("#sortSpan"+tmpId).append($("<div style='display: table'><select class='sortDropdown' id='matchVal"+tmpId+"' ></select></div>"));
            for (key in new MatchInfo()) {
                var displayName = key;
                if (displayName.includes("__"))
                    displayName = displayName.replace(displayName.substring(displayName.indexOf("__")), "");
                    displayName = displayName.replace(/_/g, " ");
                if (!key.endsWith("__title"))
                    $("#matchVal"+tmpId).append($("<option value='"+key+"'>"+displayName+"</option>"));
            }
            $("#matchVal"+tmpId).change(function(){
                var tempId = $(this).attr("id").replace("matchVal", "");
                var outer = $("#sortOpt"+tempId).val();
                sortingPaths[tempId] = [outer, $(this).val()];
            });
            sortingPaths[tmpId] = [newValue, $("#matchVal"+tmpId).val()];
        }
        
        if (oldValue === "" && parseInt(tmpId)+1 === sortingPaths.length) {
            createNewSortArgs();
        } else if (newValue === "" && parseInt(tmpId)+1 === sortingPaths.length) {
            $("#sortOpt"+sortingPaths.length).remove();
            $("#sortSpan"+sortingPaths.length).remove();
            sortingPaths = sortingPaths.slice(0, -1);
        }
        //sortingArgs[sortingArgs.length] = "";
        //alert(JSON.stringify(sortingArgs));
    });
}
function sortData(arr1, arr2) {
    
    deleteUI();
    getAllTeamInfo(function(data){
        var dataSorted = sortMatches(data, arr1, arr2);
        globalSortedData = dataSorted;
        for (key in dataSorted) {
            //Create new team div
            $("#sortedTeams").append($("<div id='div_"+key+"' class='aGen sortedTeam' />")); 
            for (objKey in dataSorted[key]) {
                var displayName = objKey;
                if (displayName.includes("__"))
                    displayName = displayName.replace(displayName.substring(displayName.indexOf("__")), "");
                displayName = displayName.replace(/_/g, " ");
                
                //Creates the match view section
                if (Array.isArray(dataSorted[key][objKey])) {
                    $("#div_"+key).append($("<div id='sorted_"+key+objKey+"' class='sortedMatchList'><span class='sortedMatchNumber'>"+displayName+": </span><select class='displayMatchDropdown' id='matchSelect_"+key+"---"+objKey+"' ></select></div>"));
                    
                    //Creates the match drop down list
                    $("#matchSelect_"+key+"---"+objKey).append($("<option value='__null__' selected>--- Select Match ---</option>"));
                    for (mKey in dataSorted[key][objKey]) {
                        matchNumber = JSON.stringify(dataSorted[key][objKey][mKey][Object.keys(new MatchInfo())[0]]);
                        $("#matchSelect_"+key+"---"+objKey).append($("<option value='"+(matchNumber-1)+"'>Match: "+matchNumber+"</option>"));
                    }
                    
                    //When match is selected open display match
                    $("#matchSelect_"+key+"---"+objKey).change(function(){
                        var keyAndObjKey = $(this).attr("id").replace("matchSelect_", "").split("---");
                        var key = keyAndObjKey[0];
                        var objKey = keyAndObjKey[1];
                        var mKey = $(this).val();
                        var dataSorted = globalSortedData;
                        
                        //alert(mKey);
                        
                        //$("#sorted_"+key+objKey+mKey).remove();
                        $(".sorted_"+key+objKey).remove();
                        
                        if (mKey != "__null__")
                            $("#sorted_"+key+objKey).append($("<div class='sorted_"+key+objKey+" aGen sortedMatch' id='sorted_"+key+objKey+mKey+"'></div>"));
                        
                        for (nKey in dataSorted[key][objKey][mKey]) {
                            disName = nKey;
                            if (disName.includes("__")) {
                                disName = disName.replace(disName.substring(disName.indexOf("__")), "");
                            }
                            if (nKey.endsWith("__title")) {
                                $("#sorted_"+key+objKey+mKey).append($("<div class='aGen sortedTitle'><h2>"+dataSorted[key][objKey][mKey][nKey]+"</h2></div>"));
                            } else if (nKey == Object.keys(new MatchInfo)[0]) {
                                //$("#sorted_"+key+objKey+mKey).append($("<div class='sortedMatchTitle'><h2>Match "+JSON.stringify(dataSorted[key][objKey][mKey][nKey])+"</h2></div>"));
                            } else {    
                                disName = disName.replace(/_/g, " ");
                                $("#sorted_"+key+objKey+mKey).append($("<div style='display: flex'><span class='sortedLable'>"+disName+": </span><span class='sortedField'>"+JSON.stringify(dataSorted[key][objKey][mKey][nKey])+"</span></div>"));
                            }
                        }
                        
                    });
                    
                    
                    /*
                    for (mKey in dataSorted[key][objKey]) {
                        $("#sorted_"+key+objKey).append($("<div id='sorted_"+key+objKey+mKey+"' class='aGen sortedMatch'></div>"));
                        for (nKey in dataSorted[key][objKey][mKey]) {
                            disName = nKey;
                            if (disName.includes("__")) {
                                disName = disName.replace(disName.substring(disName.indexOf("__")), "");
                            }
                            if (nKey.endsWith("__title")) {
                                $("#sorted_"+key+objKey+mKey).append($("<div class='aGen sortedTitle'><h2>"+dataSorted[key][objKey][mKey][nKey]+"</h2></div>"));
                            } else if (nKey == Object.keys(new MatchInfo)[0]) {
                                $("#sorted_"+key+objKey+mKey).append($("<div class='sortedMatchTitle'><h2>Match "+JSON.stringify(dataSorted[key][objKey][mKey][nKey])+"</h2></div>"));
                            } else {    
                                disName = disName.replace(/_/g, " ");
                                $("#sorted_"+key+objKey+mKey).append($("<div style='display: flex'><span class='sortedLable'>"+disName+": </span><span class='sortedField'>"+JSON.stringify(dataSorted[key][objKey][mKey][nKey])+"</span></div>"));
                            }
                        }
                    }
                    */
                    
                    
                    
                } else {
                    if (objKey.endsWith("__title")) {
                        $("#div_"+key).append($("<h2 class='sortedTitle'>"+(dataSorted[key][objKey])+"</h2>"));  
                    } else if (objKey == Object.keys(team)[0]) {
                         $("#div_"+key).append($("<div class='sortedTeamNumber'><h1>Team "+JSON.stringify(dataSorted[key][objKey])+"</h1></div>")); 
                    } else {
                        $("#div_"+key).append($("<div style='display: flex'><span class='sortedLable'>"+displayName+": </span><span class='sortedField'>"+JSON.stringify(dataSorted[key][objKey])+"</span></div>")); 
                    }
                }
            }
        }
    });
}
var team = new Team();
var sortingPaths = [];
var sortingArgs = [];
var globalSortedData = [];

function onLoad() {
    createNewSortArgs();
    //sortData([["matches__match","number_test__num"]], ["sHigh"]);
}