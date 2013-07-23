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
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      controller: 'Dashboard',
      templateUrl: 'dashboard'
    });
})

// Resource for server requests
.factory('T3Resource', function ($resource) {
  return $resource('/move.json', {}, {
    query: {method:'GET', params:{}, isArray:false}
  });
})

// Controllers
.controller('Dashboard', function ($scope, $resource, T3Resource) {
  
  $scope.available_cells = [1,2,3,4,5,6,7,8,9];
  
  $scope.move = function(event) {
    
    // Get the clicked button, 
    // remove it from parent .cell and add X
    $btn = $(event.target);
    $cell = $btn.parent('.cell');
    $btn.remove();
    $cell.append($('<span class="sign xsign">X</span>'));
    
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
        $cell.append($('<span class="sign osign">O</span>'));
        
        // Did server win?
        winner = $scope.win();
        if(winner){
          $scope.winner = winner + ' has won.. TT';
        }

      });
    }
    
  };

  $scope.removeFromAvailableCells = function(id){
    id = parseInt(id);
    var clicked_index = $scope.available_cells.indexOf(id);
    $scope.available_cells.splice(clicked_index, 1);
  }
  
  $scope.win = function(){
    winner = false;
    
    $.each(['xsign','osign'], function(i,v) {
      
      name = (v == 'xsign') ? 'X' : 'O';
      winning_formulas = ['#1, #2, #3','#4, #5, #6','#7, #8, #9','#3, #6, #9','#1, #4, #7','#1, #5, #9','#3, #5, #7'];
      
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
    if ($scope.winner) return false;
    
    $(event.target).find('.btn').fadeIn(100);
  };
  
  $scope.hide = function(event){
    if ($scope.winner) return false;
    
    $(event.target).find('.btn').fadeOut(200);
  };

  
});
