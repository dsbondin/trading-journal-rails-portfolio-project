class AddUidToTraders < ActiveRecord::Migration[5.1]
  def change
    add_column :traders, :provider, :string
    add_index :traders, :provider
    add_column :traders, :uid, :string
    add_index :traders, :uid
  end
end
