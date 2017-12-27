class CreateTrades < ActiveRecord::Migration[5.1]
  def change
    create_table :trades do |t|
      t.string :direction
      t.float :entry
      t.float :exit
      t.integer :quantity
      t.text :notes
      t.integer :trader_id
      t.integer :instrument_id

      t.timestamps
    end
  end
end
