class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :authenticate_user!
  
  protected
  
  def current_user_permissions(resource)
    unless resource.user == current_user
      redirect_to( root_path, :alert => 'No tienes permisos sobre este recurso.')
    end
  end
end
