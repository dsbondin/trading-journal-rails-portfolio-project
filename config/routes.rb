Rails.application.routes.draw do

  root 'static#home'

  devise_for :traders, :controllers => { :omniauth_callbacks => "callbacks" }

  resources :traders, only: [:index, :show] do
    resources :trades, only: [:show, :index, :new]
    resources :instruments, only: [:index, :show]
  end

  resources :instruments, only: [:index, :show] do
    resources :trades, only: [:show, :index]
  end

  get '/trades/best' => 'trades#best'
  get '/trades/worst' => 'trades#worst'

  resources :trades



end
