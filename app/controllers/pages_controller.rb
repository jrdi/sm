class PagesController < ApplicationController
  skip_before_filter :authenticate_user!
  
  def home
    if user_signed_in?
      @question = Question.new
    end
    
    offset          = params[:page].present? ? (params[:page].to_i-1)*10 : 0
    @question_pages = params[:question_pages].present? ? params[:question_pages].to_i : nil
    @questions      = Question.includes(:user, :answers, :tags).limit(10).offset(offset)
    
    case params[:scoped_questions]
    when 'without_answers'
      @questions        = @questions.without_answers
      @question_pages ||= (Question.without_answers.count/10.0).ceil
    when 'populars'
      @questions        = @questions.populars
      @question_pages ||= (Question.populars.count/10.0).ceil
    else
      @questions        = @questions.order('created_at DESC')
      @question_pages ||= (Question.count/10.0).ceil
    end
  end
  
  def about
    
  end
  
  def contact
    if request.post?
      @email = Email.new(params[:contact])
      if @email.valid?
        ApplicationMailer.contact(@email).deliver
        flash[:notice] = "Email enviado correctamente"
      else
        render :action => 'contact'
      end
    end
  end
  
  def legal
    
  end
end