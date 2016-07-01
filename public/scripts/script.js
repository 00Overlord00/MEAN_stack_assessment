console.log( 'SCRIPT: GO' );

var myApp = angular.module( 'myApp', [] );

myApp.controller( 'assembleController', [ '$scope', '$http', function( $scope, $http ) {
  $scope.saveHero = function() {
  var heroToSave = {
    heroName: $scope.heroName,
    first: $scope.nameFirst,  //Bundle input into into an object.
    last: $scope.nameLast,
    city: $scope.city,
    superPower: $scope.abilities
  };  //end object
  console.log( 'Sending ' + $scope.heroName + ' to database...');  //Tell me what you've got, before you send it.

  $http({
    method: 'POST',  //Send to server.
    url: '/postRoute',
    data:heroToSave
  }).then( function(){
    $scope.assemble();  //Then run assemble function.
  });  //end http call.
};  //end saveHero

$scope.assemble = function() {
  $http({
    method: 'GET',
    url: '/getRoute'
  }).then( function( response ) {
    $scope.heroes = response.data;
  });  //end http.
 };  //end $scope.assemble.

 $scope.assemble();

}]);  //end avengersAssemble controller.
