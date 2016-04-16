Tictactoe::Application.routes.draw do
  # we're not using resources since is just 1 action.
  # No persistance for now.
  get :move, to: 'tic_tac_toe#move'
  root to: 'tic_tac_toe#dashboard'
end
