class Instrument < ApplicationRecord
  has_many :trades
  has_many :traders, through: :trades

  validates_presence_of :symbol
end
