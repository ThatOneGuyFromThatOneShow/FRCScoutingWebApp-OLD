function Team(number, sct_score) {
    this.number = number;
    this.sct_score = sct_score || 5;
}
function setUI(teamObj) {
    //CREATE UI
}
function setTeamInfo () {
    var foo = $("#teamNumber").val();
    $.ajax({
        url : 'php/setTeamInfo.php?q=' + foo,
        type : 'POST',
        data : {data : JSON.stringify(team)}
    }).fail(function(){
        alert("error");
    }).done(function(){
        alert("completed");
    });
}
function getTeamInfo () {
    var foo = $("#teamNumber").val();
    $.ajax({
        url : 'php/getTeamInfo.php?q=' + foo,
        type : 'GET',
        dataType : "json",
    }).done(function(data){
        alert(JSON.stringify(data) + "\n" + status);
        document.getElementById("header").innerHTML = JSON.stringify(data);
        //$("#teamNumber").val(data.number);  
    });
}
//alert(JSON.stringify(dataStore));
var team = new Team(4931, 10);

function setHeader() {
    document.getElementById("header").innerHTML = "Hello World";
};