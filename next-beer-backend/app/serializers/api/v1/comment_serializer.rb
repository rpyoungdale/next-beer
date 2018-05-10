class Api::V1::CommentSerializer < ActiveModel::Serializer
  belongs_to :beer
  attributes :content, :beer_id
end
