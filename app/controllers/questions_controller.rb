class QuestionsController < ApplicationController
  before_filter :current_user_permissions, :only => [ :edit, :update, :destroy ]
  
  # GET /questions
  def index
    @questions = Question.all
  end

  # GET /questions/1
  def show
    @question = Question.find(params[:id])
  end

  # GET /questions/new
  def new
    @question = Question.new
  end

  # GET /questions/1/edit
  def edit
  end

  # POST /questions
  def create
    @question = Question.new(params[:question])
    @question.user = current_user
    
    if @question.save
      redirect_to(@question, :notice => 'Question was successfully created.')
    else
      render :action => "new"     
    end
  end

  # PUT /questions/1
  def update
    if @question.update_attributes(params[:question])
      redirect_to(@question, :notice => 'Question was successfully updated.')
    else
      render :action => "edit"
    end
  end

  # DELETE /questions/1
  def destroy
    @question.destroy

    redirect_to(questions_url)
  end
  
  protected
  def current_user_permissions
    @question = Question.find(params[:id])
    super(@question)
  end
end
