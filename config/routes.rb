Tictactoe::Application.routes.draw do
  
  match 'move' => 'tic_tac_toe#move'
  root :to => 'tic_tac_toe#dashboard'
  
end
