class TagsController < ApplicationController
  skip_before_filter :authenticate_user!
  
  def show
    @tag = Tag.find(params[:id])
  end
end