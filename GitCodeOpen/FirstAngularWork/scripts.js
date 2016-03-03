/**
 * Created by inet2005 on 11/3/15.
 */
angular.module('StudentAddApp',[]).controller('StudentController', function($scope){
    function Student(id, fName, lName) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
    };

    $scope.students=[];//students Array

    $scope.addNewStudent = function(){
        this.newStudent = new Student($scope.newStudentId, $scope.newStudentFirstName, $scope.newStudentLastName)
        if(!$scope.studentExist($scope.newStudentId)) {
            $scope.students.push({
                id: this.newStudent.id,
                firstName: this.newStudent.fName,
                lastName: this.newStudent.lName
            });
            $scope.newStudentId = "";
            $scope.newStudentFirstName = "";
            $scope.newStudentLastName = "";
        }else{
            alert("Student Id Alredy exists");
        }

    };
    //$scope.showTool = function(){
    //    $scope.showDiv = true;
    //};
    //$scope.hideTool = function(){
    //    $scope.showDiv = false;
    //};
    $scope.studentExist = function (id) {
        for (var i=0; i < $scope.students.length; i++) {
            if (id === $scope.students[i].id) {
                return true;
            }
        }
        return false;
    }



});