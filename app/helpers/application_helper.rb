module ApplicationHelper

  def to_currency(value)
    value >= 0 ? "$#{value}" : "-$#{-value}"
  end

end
