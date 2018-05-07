class Api::V1::BeerSerializer < ActiveModel::Serializer
  attributes :id, :image, :name, :beer_type, :abv, :ibu, :like_count, :dislike_count
end
