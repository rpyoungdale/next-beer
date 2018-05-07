class CreateBeers < ActiveRecord::Migration[5.1]
  def change
    create_table :beers do |t|
      t.string :image
      t.string :name
      t.string :beer_type
      t.string :abv
      t.string :ibu
      t.integer :brewery_id
      t.integer :like_count
      t.integer :dislike_count

      t.timestamps
    end
  end
end
