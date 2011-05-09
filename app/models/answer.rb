class Answer < ActiveRecord::Base
  ORDERS = [
      'votes_count', 'created_at'
    ]
  # Relations
  belongs_to :user
  belongs_to :question, :counter_cache => true
  has_many :votes, :as => :votable, :dependent => :destroy
  # Validations
  validates_presence_of :content
  validates_presence_of :user_id, :on => :create
  
  def self.ordered(order=nil)
    return order if ORDERS.include? order
    return 'votes_count'
  end
end
