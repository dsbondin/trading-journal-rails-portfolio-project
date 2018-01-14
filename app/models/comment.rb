class Comment < ApplicationRecord
  belongs_to :trade
  belongs_to :trader
end
