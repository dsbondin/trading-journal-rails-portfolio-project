class InstrumentsController < ApplicationController

  def index
    if id = params[:trader_id]
      @instruments = Trader.find_by(id: id).instruments
    else
      @instruments = Instrument.order(symbol: :asc)
    end
  end

  def show
    @instrument = Instrument.find_by(id: params[:id])
  end

end
