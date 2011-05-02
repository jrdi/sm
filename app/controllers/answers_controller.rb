class AnswersController < ApplicationController
  before_filter :current_user_permissions, :only => [ :edit, :update, :destroy ]
  before_filter :load_question
  # GET /questions/1/answers
  def index
    @answers = @question.answers
    @answer = @question.answers.build
  end

  # GET /questions/1/answers/1
  def show
    @answer = Answer.find(params[:id])
  end

  # GET /questions/1/answers/new
  def new
    @answer = @question.answers.build
  end

  # GET /questions/1/answers/1/edit
  def edit
  end

  # POST /questions/1/answers
  def create
    @answer = @question.answers.build(params[:answer])
    @answer.user = current_user
    
    if @answer.save
      redirect_to(@question, :notice => 'La respuesta ha sido guardada correctamente.')
    else
      render :action => "new"     
    end
  end

  # PUT /questions/1/answers/1
  def update
    if @answer.update_attributes(params[:answer])
      redirect_to(@question, :notice => 'La respuesta ha sido editada correctamente.')
    else
      render :action => "edit"
    end
  end

  # DELETE /questions/1/answers/1
  def destroy
    @answer.destroy

    redirect_to(question_answers_url)
  end
  
  protected
  def current_user_permissions
    @answer = Answer.find(params[:id])
    super(@answer)
  end
  
  def load_question
    @question = Question.find(params[:question_id])
  end
end
