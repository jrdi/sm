class QuestionsController < ApplicationController
  before_filter :current_user_permissions, :only => [ :edit, :update, :destroy ]
  skip_before_filter :authenticate_user!, :only => :show
  # GET /questions
  def index
    @questions = Question.all
  end

  # GET /questions/1
  def show
    @question = Question.find(params[:id], :include => :answers, :order => "answers.#{Answer.ordered(params[:order])} DESC")
    
    respond_to do |format|
      format.html
      format.json { render :json => @question.to_json(:include => {:answers => {:include => {:user => {:only => [:name, :id]}}}}) }
    end
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
      @question.tags = params[:question_tags]
      redirect_to(@question, :notice => 'La pregunta ha sido guardada correctamente.')
    else
      render :action => "new"     
    end
  end

  # PUT /questions/1
  def update
    if @question.update_attributes(params[:question])
      redirect_to(@question, :notice => 'La pregunta ha sido actualizada correctamente.')
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
