class Trade < ApplicationRecord
  belongs_to :trader
  belongs_to :instrument
  has_many :comments
  # accepts_nested_attributes_for :instrument

  validates :entry, numericality: {greater_than: 0}
  validates :exit, numericality: {greater_than: 0}
  validates :quantity, numericality: {greater_than: 0}

  def name
    "#{direction.capitalize} #{instrument.symbol}"
  end

  def instrument_attributes=(attr)
    self.instrument = Instrument.find_or_create_by(attr) unless attr[:symbol] == ""
  end

  def profit_loss
    (direction == "long" ? ((exit - entry) * quantity) : ((entry - exit) * quantity)).round(2)
  end

  # def formatted_profit_loss
  #   profit_loss >= 0 ? "$#{profit_loss}" : "-$#{-profit_loss}"
  # end

  def self.most_profitable
    all.max_by { |trade| trade.profit_loss }
  end

  def self.least_profitable
    all.min_by { |trade| trade.profit_loss }
  end

end
