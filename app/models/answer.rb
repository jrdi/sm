class Answer < ActiveRecord::Base
  ORDERS = {
    'votes_count' => 'votes_count DESC',
    'oldest' => 'created_at ASC',
    'active' => 'created_at DESC'
  }

  # Relations
  belongs_to :user
  belongs_to :question, :counter_cache => true
  has_many :votes, :as => :votable, :dependent => :destroy
  # Validations
  validates_presence_of :content
  validates_presence_of :user_id, :on => :create

  after_create :answer_notification
  
  attr_accessible :content

  def self.ordered(order=nil)
    return ORDERS[order] if ORDERS.keys.include? order
    'votes_count DESC'
  end
  
  def as_json(options={})
    json = { :include => { 
                          :user => {:only => [:id, :name]}
                         }
           }
    json.merge! :methods => options[:methods] if options[:methods].present?
    json.merge! :include => options[:include] if options[:include].present?
    
    super(json)
  end
  
  def update_votes_count
    update_column(:votes_count, votes.sum(:value))
  end

  protected
  def answer_notification
    ApplicationMailer.answer_notification(self, self.question, self.question.user).deliver
  end
end
