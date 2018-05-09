class Beer < ApplicationRecord
  has_many :comments
  has_many :restaurant_beers
  has_many :restaurants, through: :restaurant_beers
end
