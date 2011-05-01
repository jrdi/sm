class SiteController < ApplicationController
  skip_before_filter :authenticate_user!, :only => [:home]
  def home
    @questions = Question.all(:order => 'created_at DESC')
  end
end