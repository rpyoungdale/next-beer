class CreateRestaurantBeers < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurant_beers do |t|
      t.integer :restaurant_id
      t.integer :beer_id

      t.timestamps
    end
  end
end
