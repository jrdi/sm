class Question < ActiveRecord::Base
  # Relations
  belongs_to :user
  has_many :answers, :dependent => :destroy
  # Validations
  validates_presence_of :title
  validates_presence_of :user_id, :on => :create
  validates_uniqueness_of :title
  
  scope :without_answer, where('answers_count = 0')
  scope :populars, order('answers_count DESC')
end
