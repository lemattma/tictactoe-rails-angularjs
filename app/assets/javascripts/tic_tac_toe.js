angular.module('tictactoe', ['ngResource'])

// Loads the templates for the views
.run(['$window', '$templateCache', function($window, $templateCache) {
  var templates = $window.JST,
      fileName,
      fileContent;
 
  for (fileName in templates) {
    fileContent = templates[fileName];
    $templateCache.put(fileName, fileContent);
  }
    
}])

// routes
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      controller: 'Dashboard',
      templateUrl: 'dashboard'
    });
    
  $locationProvider.html5Mode(true);
}])

// Resource for server requests
.factory('T3Resource', ['$resource', function ($resource) {
  return $resource('/move.json', {}, {
    query: {method:'GET', params:{}, isArray:false}
  });
}])

// Controllers
.controller('Dashboard', ['$scope', '$resource', 'T3Resource', '$route', function ($scope, $resource, T3Resource, $route) {
  
  $scope.available_cells = [1,2,3,4,5,6,7,8,9];
  
  $scope.move = function(event) {
    
    // Get the clicked button, 
    // remove it from parent .cell and add X
    $btn = $(event.target);
    $cell = $btn.parent('.cell');
    $btn.remove();
    $cell.append($('<span class="xsign">X</span>'));
    
    $scope.removeFromAvailableCells( $cell.attr('id') );
    
    // Did I win?
    winner = $scope.win();
    console.log(winner);
    
    if(winner) {
      $scope.winner = 'YOU won! =D';
    }else{
      // If not server moves
      T3Resource.query({ available: $scope.available_cells }, function(res) {
        $scope.removeFromAvailableCells( res.next_move );
        $cell = $('#'+res.next_move);
        $cell.find('.btn').remove();
        $cell.append($('<span class="osign">O</span>'));
        
        // Did server win?
        winner = $scope.win();
        console.log(winner);
        if(winner){
          $scope.winner = winner + ' has won.. TT';
        }

      });
    }
    
  };

  // remove from $scope.available_cells the last position
  $scope.removeFromAvailableCells = function(id){
    id = parseInt(id);
    var clicked_index = $scope.available_cells.indexOf(id);
    $scope.available_cells.splice(clicked_index, 1);
  }
  
  $scope.win = function(){
    winner = false;
    
    // check winner for x and o
    $.each(['xsign','osign'], function(i,v) {
      
      name = (v == 'xsign') ? 'X' : 'O';
      winning_formulas = [
        // horizontal
        '#1, #2, #3', 
        '#4, #5, #6', 
        '#7, #8, #9', 
        // vertical
        '#1, #4, #7', 
        '#2, #5, #8',
        '#3, #6, #9', 
        // diagonal
        '#1, #5, #9', 
        '#3, #5, #7' 
      ];
      
      // check each winning row possible for x and o
      $.each(winning_formulas, function(id,vl) {
        if ($(vl).find('.'+v).length==3) { 
          winner = name; 
          return false; 
        }
      });
      
    });
    
    return winner;
  }
  
  $scope.show = function(event){
    if ($scope.winner) return false; // If winner, why continue?
    
    $(event.target).find('.btn').fadeIn(100);
  };
  
  $scope.hide = function(event){
    if ($scope.winner) return false; // If winner, why continue?
    
    $(event.target).find('.btn').fadeOut(200);
  };
  
  $scope.playAgain = function(){
    //Reload the view
    $route.reload();
  }

  
}]);
