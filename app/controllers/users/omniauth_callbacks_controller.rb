class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  before_filter :twitter_data_present, only: :email
  
  def facebook
    # You need to implement the method below in your model
    @user = User.find_for_facebook_oauth(request.env["omniauth.auth"], current_user)

    if @user.persisted?
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Facebook"
      sign_in_and_redirect @user, :event => :authentication
    else
      session["devise.facebook_data"] = env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end
  
  def twitter
    @user = User.find_for_twitter_oauth(request.env["omniauth.auth"], current_user)
    
    if @user.persisted?
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Twitter"
      sign_in_and_redirect @user, :event => :authentication
    else
      session["devise.twitter_data"] = env["omniauth.auth"].except("extra")
      redirect_to users_sign_up_email_url
    end
    
  end

  def email
    if request.post?
      user = User.where(email: params[:email]).first
      if user.present?
        redirect_to new_user_session_url, notice: 'El email seleccionado ya existe.'
      else
        if (@user = User.create_with_oauth!(params[:email], session["devise.twitter_data"])) && @user.persisted?
          flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Twitter"
          sign_in_and_redirect @user, :event => :authentication
        else
          flash[:alert] = 'Algo ha ido mal.'
        end
      end
    end
  end

  protected
  def twitter_data_present
    if session["devise.twitter_data"].blank?
      redirect_to root_path, alert: I18n.t("devise.omniauth_callbacks.failure", 
        kind: "Twitter", reason: 'no hemos podido recoger tus datos') and return
    end
  end
end