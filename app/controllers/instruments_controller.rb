class InstrumentsController < ApplicationController

  def index
    if id = params[:trader_id]
      @trader = Trader.find_by(id: id) # Adding @trader instance to the trader_instruments index page
      @instruments = @trader.instruments
    else
      @instruments = Instrument.order(symbol: :asc)
    end
  end

  def show
    # Add @trader to the show page
    @trader = Trader.find_by(id: params[:trader_id]) if params[:trader_id]
    @instrument = Instrument.find_by(id: params[:id])
  end

end
