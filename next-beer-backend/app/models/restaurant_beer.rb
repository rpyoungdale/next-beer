class RestaurantBeer < ApplicationRecord
  belongs_to :restaurant
  belongs_to :beer
end
