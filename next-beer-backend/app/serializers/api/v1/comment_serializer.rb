class Api::V1::CommentSerializer < ActiveModel::Serializer
  attributes :content, :beer_id
end
