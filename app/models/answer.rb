class Answer < ActiveRecord::Base
  ORDERS = [
      'votes_count', 'created_at'
    ]
  # Relations
  belongs_to :user
  belongs_to :question, :counter_cache => true
  has_many :votes, :as => :votable, :dependent => :destroy,
    :after_add => :add_votes_count,
    :after_remove => :remove_votes_count
  # Validations
  validates_presence_of :content
  validates_presence_of :user_id, :on => :create
  
  def self.ordered(order=nil)
    return order if ORDERS.include? order
    return 'votes_count'
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
    update_attribute(:votes_count, votes.sum(:value))
  end
  
  private
  def add_votes_count(vote = nil)
    update_attribute(:votes_count, votes_count + vote.value) unless vote.value.blank?
  end
  
  def remove_votes_count(vote = nil)
    update_attribute(:votes_count, votes_count - vote.value) unless vote.value.blank?
  end
end
