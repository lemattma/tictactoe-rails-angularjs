function T3Ctrl($scope) {
 
  $scope.move = function(ev) {
    $btn = $(ev.target);
    $cell = $btn.parent('.cell');
    $btn.remove();
    $cell.append($('<span class="xsign">X</span>'));
  };
 
}
T3Ctrl.$inject = ['$scope', '$http'];

$(document).ready(function(){  
  $('.cell').mouseenter(function(e){
    $el = $(e.currentTarget)
    $('.btn', $el).show()
  });
  $('.cell').mouseleave(function(e){
    $el = $(e.currentTarget)
    $('.btn', $el).hide()
  });

});