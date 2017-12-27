class Trader < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :rememberable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook, :github]

  has_many :trades
  has_many :instruments, through: :trades

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |trader|
      trader.provider = auth.provider
      trader.uid = auth.uid
      trader.name = auth.info.name
      trader.email = auth.info.email
      trader.password = Devise.friendly_token[0,20]
    end
  end

  def best_trade
    self.trades.max_by { |trade| trade.profit_loss }
  end

  def worst_trade
    self.trades.min_by { |trade| trade.profit_loss }
  end

  def total_pnl
    self.trades.sum { |trade| trade.profit_loss}
  end

  def self.leader
    all.max_by { |trader| trader.total_pnl }
  end

end
