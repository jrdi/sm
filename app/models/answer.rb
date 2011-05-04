class Answer < ActiveRecord::Base
  # Relations
  belongs_to :user
  belongs_to :question, :counter_cache => true
  has_many :votes, :as => :votable, :dependent => :destroy
  # Validations
  validates_presence_of :content
  validates_presence_of :user_id, :on => :create
end
