class CreateInstruments < ActiveRecord::Migration[5.1]
  def change
    create_table :instruments do |t|
      t.string :symbol
      t.text :description

      t.timestamps
    end
  end
end
