class TicTacToeController < ApplicationController
  def dashboard
  end

  def move
    next_move = params[:available].split(',').sample
    render json: { next_move: next_move }
  end
end
