class ProfilesController < ApplicationController
  def show
    @user = User.where(id: params[:id]).includes(:questions => [:answers, :tags, :user], :answers => :votes).first
  end
end