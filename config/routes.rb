Tictactoe::Application.routes.draw do
  
  # we're not using resources since is just 1 action. No persistance for now.
  match 'move' => 'tic_tac_toe#move'
  
  # home to dahsboard
  root :to => 'tic_tac_toe#dashboard'
    
end
