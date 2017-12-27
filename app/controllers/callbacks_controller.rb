class CallbacksController < Devise::OmniauthCallbacksController

  def facebook
    sign_in_trader
  end

  def github
    sign_in_trader
  end

  private
    def sign_in_trader
      @trader = Trader.from_omniauth(request.env["omniauth.auth"])
      sign_in_and_redirect @trader
    end

end
