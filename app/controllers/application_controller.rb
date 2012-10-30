class ApplicationController < ActionController::Base
  protect_from_forgery

  #before_filter :authenticate_user!, :featured_tags
  before_filter :featured_tags
  
  def featured_tags
    @featured_tags = Tag.order('random()').limit(10)
  end
end
