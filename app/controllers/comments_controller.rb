class CommentsController < ApplicationController

  def index
    trade = Trade.find_by(id: params[:trade_id])
    @comments = trade.comments
    render json: @comments.to_json(include: :trader)
  end

  def new
    @trade = Trade.find_by(id: params[:trade_id])
    @comment = @trade.comments.build
    render layout: false
  end

  def create
    # raise params.inspect
    trade = Trade.find_by(id: params[:trade_id])
    @comment = trade.comments.build(comment_params)
    @comment.trader = current_trader
    @comment.save
    render json: @comment.to_json
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private
    def comment_params
      params.require(:comment).permit(:body)
    end

end
