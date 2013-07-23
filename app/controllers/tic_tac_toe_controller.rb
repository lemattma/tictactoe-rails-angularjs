class TicTacToeController < ApplicationController
  
  def dashboard
  end
  
  def move
    _next_move = params[:available].split(',').sample
    render :json => { next_move: _next_move }
  end
end
