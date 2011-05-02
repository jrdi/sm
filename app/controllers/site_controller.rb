class SiteController < ApplicationController
  skip_before_filter :authenticate_user!
  def home
    @question = Question.new
    @questions = Question.all(:order => 'created_at DESC')
    @questions_without_answer = Question.without_answer
    @questions_populars = Question.populars
  end
  
  def about
    
  end
  
  def contact
    
  end
  
  def legal
    
  end
end