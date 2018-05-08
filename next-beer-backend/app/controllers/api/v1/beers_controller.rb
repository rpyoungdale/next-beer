class Api::V1::BeersController < ApplicationController
  before_action :find_beer, only: [:update]

  def index
    @beers = Beer.all
    render json: @beers
  end

  def create
    @beer = Beer.create(beer_params)
    render json: @beer, status: :accepted
  end

  def update
    @beer.update(beer_params)
    if @beer.save
      render json: @beer, status: :accepted
    else
      render json: { errors: @beer.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def beer_params
    params.permit(:name, :beer_type, :image, :abv, :ibu, :brewery_id, :like_count, :dislike_count)
  end

  def find_beer
    @beer = Beer.find(params[:id])
  end
end
