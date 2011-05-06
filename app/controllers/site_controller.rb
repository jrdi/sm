class SiteController < ApplicationController
  skip_before_filter :authenticate_user!
  def home
    if user_signed_in?
      @question = Question.new
      # @vote = Vote.new
    end
    
    page            = params[:page].present? ? (params[:page].to_i-1)*10 : 0
    @question_pages = params[:question_pages].present? ? params[:question_pages].to_i : nil
    
    case params[:scoped_questions]
    when 'without_answers'
      @questions        = Question.without_answers(:limit => "#{page}, 10")
      @question_pages ||= (Question.without_answers_count/10.0).floor+1
    when 'populars'
      @questions        = Question.populars(:limit => "#{page}, 10")
      @question_pages ||= (Question.populars_count/10.0).floor+1
    else
      @questions        = Question.all(:order => 'created_at DESC', :include => :user, :limit => "#{page}, 10")
      @question_pages ||= (Question.count/10.0).floor+1
    end
    
    respond_to do |format|
      format.html
      format.json { render :json => [@questions, @question_pages] }
    end
  end
  
  def about
    
  end
  
  def contact
    
  end
  
  def legal
    
  end
end