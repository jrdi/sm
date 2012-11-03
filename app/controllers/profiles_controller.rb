class ProfilesController < ApplicationController
  def show
    @user       = User.find(params[:id])
    @questions  = @user.questions.includes(:answers, :tags, :user)
    @answers    = @user.answers.includes(:question, :votes, :user)
  end
end