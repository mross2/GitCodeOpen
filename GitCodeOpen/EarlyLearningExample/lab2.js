/**
 * Created by inet2005 on 10/7/15.
 */
"use strict";

// array to hold the student objects as they are created
var students = [];

function showTooltip() {
    var text = '{"Students":' + JSON.stringify(students) + '}',
        myJSON = JSON.parse(text),
        myElement = document.getElementById("tooltip");
        myElement.innerHTML = text;
    myElement.style.visibility = "visible";
}

function clearTooltip() {
    document.getElementById("tooltip").style.visibility = "hidden";
}

function resetInputBoxes() {
    var inputFields = document.getElementsByTagName("input"),
        i = 0;
    for (i; i < inputFields.length; i++) {
        inputFields[i].value = "";
    }
}

function outputToList() {
    var myList = document.getElementById("displayStudents"),
        newItem = document.createElement("li"),
        student = students[students.length - 1],
        studentText = document.createTextNode(student.printStudent());
    myList.appendChild(newItem);
    newItem.appendChild(studentText);
}

function Student(id, fName, lName) {
    this.id = id;
    this.fName = fName;
    this.lName = lName;
}

Student.prototype.printStudent = function () {
    return this.id + ", " + this.fName + " " + this.lName;
};

// add new student object to the students array
function newStudent(id, fname, lname) {
    var studentToAdd = new Student(id, fname, lname);
    students.push(studentToAdd);
    resetInputBoxes();
    outputToList();
}

// check for conflicts with pre-existing IDs
function doesStudentExist(id) {
    for (var i=0; i < students.length; i++) {
        if (id === students[i].id) {
            return true;
        }
    }
    return false;
}

// validate the user input before adding the new student
function validateInput() {
    var id = document.getElementById("studentID").value,
        fName = document.getElementById("firstName").value,
        lName = document.getElementById("lastName").value;
    if (!doesStudentExist(id)) {
        newStudent(id, fName, lName);
    } else {
        document.getElementById("errorField").innerHTML = "ID already in use";
        resetInputBoxes();
    }
}

// submit button on click listener
document.getElementById("submitStudent").addEventListener("click", function () {
    validateInput();
});

document.getElementById("studentList").addEventListener("mouseover", function () {
    showTooltip();
});

document.getElementById("tooltip").addEventListener("click", function () {
    clearTooltip();
});
