/**
 * Created by inet2005 on 10/20/15.hi
 */
"use strict";

window.addEventListener("load", function(){
    var editSu = document.getElementsByClassName("edit");
    for(var i=0; i<editSu.length; i++){
        editSu[i].addEventListener("keyup",function(){
            if(validInput(this)) {
                validRule(this);
            }
            setNoneEdit();
        });
    }
});
document.getElementById("reset").addEventListener("click", function(){
    reset();
} );
document.getElementById("solution").addEventListener("click", function(){
    fill();
} );
function validInput(element){
    var num_regEx= /^[1-9]$/;
    var text= element.innerHTML;
    if(!num_regEx.test(text)){
        element.innerHTML = "" ;
        return false;
    }else {
        return true;
    }
}
function reset(){
    var emptySu = document.getElementsByClassName("edit");
    for(var i=0; i<emptySu.length; i++){
        emptySu[i].innerHTML = "";
    }
    setNoneEdit();
}
function validRule(element){
    var errorMsg =document.getElementById("err");
    if(validRow(element)){
        element.style.color = "red";
        errorMsg.innerHTML ="duplicate number in the row";
       }
    else if(validCol(element)) {
        element.style.color = "red";
        errorMsg.innerHTML="duplicate number in the column";
    }
    else if(validBox(element)){
        element.style.color = "red";
        errorMsg.innerHTML="duplicate number in the box";
    }
    else{
        element.style.color = "green";
        errorMsg.innerHTML="";
        if(complete()){
            alert("YAY YOU WIN!")
        }
    }
}
function validRow(element){
    var incorrectRow = 0;
    var regExRow = /row[1-9]/;
    var className = element.className;
    var rowClass = regExRow.exec(className);
    var text= element.innerHTML;
    var checkSu = document.getElementsByClassName(rowClass[0]);
    for(var i = 0; i<checkSu.length; i++) {
        if (checkSu[i].innerHTML == text) {
            incorrectRow ++ ;
        }
        if(incorrectRow== 2){
            return true
        }
    }
}
function validCol(element){
    var incorrectCol = 0;
    var regExCol = /col[1-9]/;
    var className = element.className;
    var colClass = regExCol.exec(className);
    var text= element.innerHTML;
    var checkSu = document.getElementsByClassName(colClass[0]);
    for(var i = 0; i<checkSu.length; i++) {
        if (checkSu[i].innerHTML == text) {
            incorrectCol ++ ;
        }
        if(incorrectCol==2){
            return true
        }
    }
}
function validBox(element) {
    var incorrectBox = 0;
    var regExBox = /box[1-9]/;
    var className = element.className;
    var boxClass = regExBox.exec(className);
    var text = element.innerHTML;
    var checkSu = document.getElementsByClassName(boxClass[0]);
    for (var i = 0; i < checkSu.length; i++) {
        if (checkSu[i].innerHTML == text) {
            incorrectBox ++ ;
        }
        if(incorrectBox==2){
            return true
        }
    }
}
function setNoneEdit(){
    var editSu = document.getElementsByClassName("edit");
    for(var i=0; i<editSu.length; i++){
        if(editSu[i].innerHTML==""){
            editSu[i].style.color = "green"
        }
    }
    var noneEdit= document.getElementsByClassName("noEdit");
    for(var i=0; i<noneEdit.length; i++) {
        noneEdit[i].style.color = "blue"
    }
}
function complete(){
    var doneSu = document.getElementsByClassName("edit");
    for(var i=0;i<doneSu.length; i++){
        if(doneSu[i].innerHTML == ""){
            return false;
        }
        if(doneSu[i].style.color == "red"){
            return false;
        }
    }
    return true;
}
function fill(){
    document.getElementsByClassName("row1 col1 box1 edit")[0].innerHTML= "1";
    document.getElementsByClassName("row1 col2 box1 edit")[0].innerHTML= "2";
    document.getElementsByClassName("row2 col1 box1 edit")[0].innerHTML= "8";
    document.getElementsByClassName("row2 col2 box1 edit")[0].innerHTML= "9";
    document.getElementsByClassName("row2 col3 box1 edit")[0].innerHTML= "6";
    document.getElementsByClassName("row3 col3 box1 edit")[0].innerHTML= "7";
    document.getElementsByClassName("row1 col5 box2 edit")[0].innerHTML= "6";
    document.getElementsByClassName("row2 col4 box2 edit")[0].innerHTML= "2";
    document.getElementsByClassName("row2 col5 box2 edit")[0].innerHTML= "4";
    document.getElementsByClassName("row2 col6 box2 edit")[0].innerHTML= "7";
    document.getElementsByClassName("row3 col4 box2 edit")[0].innerHTML= "1";
    document.getElementsByClassName("row3 col5 box2 edit")[0].innerHTML= "8";
    document.getElementsByClassName("row3 col6 box2 edit")[0].innerHTML= "9";
    document.getElementsByClassName("row1 col7 box3 edit")[0].innerHTML= "8";
    document.getElementsByClassName("row1 col9 box3 edit")[0].innerHTML= "9";
    document.getElementsByClassName("row2 col9 box3 edit")[0].innerHTML= "5";
    document.getElementsByClassName("row3 col8 box3 edit")[0].innerHTML= "4";
    document.getElementsByClassName("row3 col9 box3 edit")[0].innerHTML= "6";
    document.getElementsByClassName("row4 col1 box4 edit")[0].innerHTML= "5";
    document.getElementsByClassName("row4 col2 box4 edit")[0].innerHTML= "1";
    document.getElementsByClassName("row4 col3 box4 edit")[0].innerHTML= "8";
    document.getElementsByClassName("row5 col2 box4 edit")[0].innerHTML= "3";
    document.getElementsByClassName("row4 col4 box5 edit")[0].innerHTML= "4";
    document.getElementsByClassName("row4 col6 box5 edit")[0].innerHTML= "6";
    document.getElementsByClassName("row5 col4 box5 edit")[0].innerHTML= "7";
    document.getElementsByClassName("row5 col5 box5 edit")[0].innerHTML= "1";
    document.getElementsByClassName("row5 col6 box5 edit")[0].innerHTML= "5";
    document.getElementsByClassName("row6 col4 box5 edit")[0].innerHTML= "3";
    document.getElementsByClassName("row6 col6 box5 edit")[0].innerHTML= "8";
    document.getElementsByClassName("row5 col8 box6 edit")[0].innerHTML= "2";
    document.getElementsByClassName("row6 col7 box6 edit")[0].innerHTML= "5";
    document.getElementsByClassName("row6 col8 box6 edit")[0].innerHTML= "6";
    document.getElementsByClassName("row6 col9 box6 edit")[0].innerHTML= "1";
    document.getElementsByClassName("row7 col1 box7 edit")[0].innerHTML= "7";
    document.getElementsByClassName("row7 col2 box7 edit")[0].innerHTML= "8";
    document.getElementsByClassName("row8 col1 box7 edit")[0].innerHTML= "9";
    document.getElementsByClassName("row9 col1 box7 edit")[0].innerHTML= "2";
    document.getElementsByClassName("row9 col3 box7 edit")[0].innerHTML= "3";
    document.getElementsByClassName("row7 col4 box8 edit")[0].innerHTML= "9";
    document.getElementsByClassName("row7 col5 box8 edit")[0].innerHTML= "3";
    document.getElementsByClassName("row7 col6 box8 edit")[0].innerHTML= "4";
    document.getElementsByClassName("row8 col4 box8 edit")[0].innerHTML= "6";
    document.getElementsByClassName("row8 col5 box8 edit")[0].innerHTML= "7";
    document.getElementsByClassName("row8 col6 box8 edit")[0].innerHTML= "2";
    document.getElementsByClassName("row9 col5 box8 edit")[0].innerHTML= "5";
    document.getElementsByClassName("row7 col7 box9 edit")[0].innerHTML= "6";
    document.getElementsByClassName("row8 col7 box9 edit")[0].innerHTML= "1";
    document.getElementsByClassName("row8 col8 box9 edit")[0].innerHTML= "8";
    document.getElementsByClassName("row8 col9 box9 edit")[0].innerHTML= "3";
    document.getElementsByClassName("row9 col8 box9 edit")[0].innerHTML= "9";
    document.getElementsByClassName("row9 col9 box9 edit")[0].innerHTML= "4";
}
