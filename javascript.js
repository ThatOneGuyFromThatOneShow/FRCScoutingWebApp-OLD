function Team(number, sct_score, score, test) {
    this.number = number || 0;
    this.sct_score = sct_score || 0;
    this.score = score || 0;
    this.test = test || 0;
}
function setUI(obj) {
    obj = obj || new Team();
    
    //Creates UI elements inside a form
    for (var key in obj) {
        if (key != Object.keys(obj)[0]) {//Ignores the first value of obj
            if (obj.hasOwnProperty(key)) {
                if (!$("#" + key).length) {
                    //Create UI element
                    var elmt = $("<span class='lable'>"+key+": </span><input id='"+key+"'  class='field'><br/>");
                    $("form").append(elmt);
                }
                //Refresh UI element
                $("#"+key).val(obj[key]);
            }
        }
    }
}
function getUI(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            obj[key] = $("#"+key).val();
        }
    }
}
function setTeamInfo () {
    var teamNumber = $("#number").val();
    getUI(team);
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

var team = new Team();
//alert(JSON.stringify(team));

function setHeader() {
    document.getElementById("header").innerHTML = "Hello World";
}