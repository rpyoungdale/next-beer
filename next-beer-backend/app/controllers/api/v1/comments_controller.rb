class Api::V1::CommentsController < ApplicationController
  before_action :find_comment, only: [:update]

  def index
    @comments = Comment.all
    render json: @comments
  end

  def create
    @comment = Comment.create(comment_params)
    render json: @comment, status: :accepted
  end

  # def update
  #   @comment.update(beer_params)
  #   if @comment.save
  #     render json: @comment, status: :accepted
  #   else
  #     render json: { errors: @comment.errors.full_messages }, status: :unprocessible_entity
  #   end
  # end

  private

  def comment_params
    params.permit(:content, :beer_id)
  end

  def find_comment
    @comment = Comment.find(params[:id])
  end


end
