class Restaurant < ApplicationRecord
  has_many :restaurant_beers
  has_many :beers, through: :restaurant_beers
end
