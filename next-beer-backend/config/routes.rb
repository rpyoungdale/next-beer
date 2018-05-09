Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :beers, only: [:index, :create, :update]
      resources :comments, only: [:index, :create, :update]
      resources :restaurants, only: [:index]
    end
  end
  # resources :beers, only: [:index, :create, :update]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
