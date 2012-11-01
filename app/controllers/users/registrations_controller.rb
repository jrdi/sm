class Users::RegistrationsController < Devise::RegistrationsController
  def update
    # Devise use update_with_password instead of update_attributes.
    # This is the only change we make.
    if (params[:user][:password].blank? && resource.update_without_password(params[:user])) ||
        (params[:user][:password].present? && resource.update_with_password(params[:user]))
      # Sign in the user by passing validation in case his password changed
      sign_in resource_name, resource, :bypass => true
      respond_with resource, :location => after_update_path_for(resource)
    else
      clean_up_passwords resource
      respond_with resource
    end
  end
end