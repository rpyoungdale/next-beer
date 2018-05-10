class BeerSerializer < ActiveModel::Serializer
  has_many :restaurants
  has_many :comments
  attributes :id, :image, :name, :beer_type, :abv, :ibu, :like_count, :dislike_count, :restaurants, :comments
end
