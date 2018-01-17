class TradeSerializer < ActiveModel::Serializer
  attributes :id, :direction, :entry, :exit, :quantity, :notes, :created_at
  belongs_to :trader
  belongs_to :instrument
end
