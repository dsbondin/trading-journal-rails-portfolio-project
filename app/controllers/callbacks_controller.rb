class CallbacksController < Devise::OmniauthCallbacksController
  before_action :sign_in_trader

  def facebook
  end

  def github
  end

  private
    def sign_in_trader
      @trader = Trader.from_omniauth(request.env["omniauth.auth"])
      sign_in_and_redirect @trader
    end

end
