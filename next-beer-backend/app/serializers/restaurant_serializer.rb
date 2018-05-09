class RestaurantSerializer < ActiveModel::Serializer
  has_many :beers
  attributes :id, :name, :beers, :address, :logo
end
