/**
 * Created by Mathew Ross on 2015-10-22.
 */
angular.module('todoApp',[])
    .controller('todoController', function($scope){

        $scope.todos = [
            {text: "Fix Car", done:true},
            {text: "walk on the moon", done:false},
            {text: "debug javascript", done:true}
        ];//end of tods
        $scope.addNewTodo = function(){
            $scope.todos.push({text:$scope.newItem,done:false});
            $scope.newItem = "";
        };//end of newtodo
        $scope.archiveTodos = function(){
            var tempArray = $scope.todos;
            $scope.todos = [];

            angular.forEach(tempArray,function(todo){
                if(!todo.done){
                    $scope.todos.push(todo);
                }
            });


        };//end of archivetodo

    });