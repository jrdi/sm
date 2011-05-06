class Question < ActiveRecord::Base
  # Relations
  belongs_to :user
  has_many :answers, :dependent => :destroy
  #has_many :votes, :as => :votable, :dependent => :destroy
  # Validations
  validates_presence_of :title
  validates_presence_of :user_id, :on => :create
  validates_uniqueness_of :title
  
  scope :without_answer, where('answers_count = 0')
  scope :populars, where('answers_count > 0').order('answers_count DESC')
  
  def as_json(options={})
    super(:include => {:user => {:only => [:name]}})
  end
  
end
