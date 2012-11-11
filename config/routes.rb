Sm::Application.routes.draw do
  ActiveAdmin.routes(self)

  root :to => "pages#home"
  get '(/questions/:scope)(/page/:page)' => 'pages#home', as: :scoped_home, defaults: { page: 1 }, scope: /without_answers|populars/
  
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks", registrations: "users/registrations" } do
    match '/users/sign_up/email' => 'users/omniauth_callbacks#email'
    match '/user/:id' => 'profiles#show', as: :user
  end
  
  resources :questions, only: [:show, :create, :edit, :update, :destroy] do
    resources :answers, only: [:create, :edit, :update, :destroy]
  end

  resources :answers, only: {} do
    resources :votes, only: :create
  end
  
  resources :tags, only: :show

  {get: [:about, :legal, :contact], post: [:contact]}.each do |method, actions|
    actions.each do |action|
      match action, controller: 'pages', via: method
    end
  end 
end
